import { databases } from '@/lib/appwrite';
import { Query, ID } from 'appwrite';
import { DATABASE_CONFIG, PAGINATION_CONFIG } from '@/lib/appwrite';
import { artService } from './artService';
import type { 
  Application, 
  ApplicationListItem, 
  ApplicationWithARTProfile,
  ApplicationSearchParams, 
  CreateApplicationRequest, 
  UpdateApplicationRequest,
  ApplicationStatistics
} from '@/types/application';
import type { 
  PaginatedResponse, 
  CreateData, 
  UpdateData 
} from '@/types/services';

class ApplicationService {
  private readonly collectionId = DATABASE_CONFIG.collections.applications;
  private readonly databaseId = DATABASE_CONFIG.databaseId;

  async getApplications(params: ApplicationSearchParams = {}): Promise<PaginatedResponse<ApplicationListItem>> {
    try {
      const {
        limit = PAGINATION_CONFIG.defaultLimit,
        offset = PAGINATION_CONFIG.defaultOffset,
        filters,
        sort
      } = params;

      // Build Appwrite queries
      const queries: string[] = [
        Query.limit(limit),
        Query.offset(offset),
      ];

      // Add filters
      if (filters) {
        if (filters.art_user_id) {
          queries.push(Query.equal('art_user_id', filters.art_user_id));
        }
        
        if (filters.lowongan_id) {
          queries.push(Query.equal('lowongan_id', filters.lowongan_id));
        }
        
        if (filters.status?.length) {
          queries.push(Query.equal('status', filters.status));
        }
      }

      // Add sorting
      if (sort) {
        const { field, direction } = sort;
        if (direction === 'desc') {
          queries.push(Query.orderDesc(field));
        } else {
          queries.push(Query.orderAsc(field));
        }
      } else {
        // Default sort by application date (newest first)
        queries.push(Query.orderDesc('applied_at'));
      }

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      return {
        data: response.documents.map(this.transformToListItem),
        pagination: {
          total: response.total,
          limit,
          offset,
          page: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(response.total / limit),
          hasNextPage: offset + limit < response.total,
          hasPrevPage: offset > 0
        }
      };
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  async getApplication(id: string): Promise<Application> {
    try {
      const response = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );

      return this.transformToApplication(response);
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }

  async createApplication(data: CreateApplicationRequest): Promise<Application> {
    try {
      console.log('ApplicationService: Creating application with data:', data);
      
      // Check if user already applied to this job
      const existingApplication = await this.checkExistingApplication(
        data.lowongan_id, 
        data.art_user_id
      );
      
      if (existingApplication) {
        throw new Error('You have already applied to this job position');
      }

      const applicationData = {
        ...data,
        status: 'pending' as const,
        applied_at: new Date().toISOString(),
      };

      console.log('ApplicationService: Final application data to create:', applicationData);

      const response = await databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        applicationData
      );

      console.log('ApplicationService: Application created successfully:', response);
      
      // Increment applications count in lowongan
      await this.incrementLowonganApplications(data.lowongan_id);
      
      return this.transformToApplication(response);
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  }

  async updateApplication(id: string, data: UpdateApplicationRequest): Promise<Application> {
    try {
      const response = await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        data
      );

      return this.transformToApplication(response);
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        id
      );
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }

  async withdrawApplication(id: string): Promise<Application> {
    return this.updateApplication(id, {
      status: 'withdrawn'
    });
  }

  async checkExistingApplication(lowonganId: string, artUserId: string): Promise<Application | null> {
    try {
      const queries = [
        Query.equal('lowongan_id', lowonganId),
        Query.equal('art_user_id', artUserId),
        Query.limit(1)
      ];

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      return response.documents.length > 0 ? this.transformToApplication(response.documents[0]) : null;
    } catch (error) {
      console.error('Error checking existing application:', error);
      return null;
    }
  }

  async getUserApplications(userId: string, params: ApplicationSearchParams = {}): Promise<PaginatedResponse<ApplicationListItem>> {
    const paramsWithUser = {
      ...params,
      filters: {
        ...params.filters,
        art_user_id: userId
      }
    };

    return this.getApplications(paramsWithUser);
  }

  async getLowonganApplications(lowonganId: string, params: ApplicationSearchParams = {}): Promise<PaginatedResponse<ApplicationListItem>> {
    const paramsWithLowongan = {
      ...params,
      filters: {
        ...params.filters,
        lowongan_id: lowonganId
      }
    };

    return this.getApplications(paramsWithLowongan);
  }

  async getLowonganApplicantsWithProfiles(lowonganId: string, params: ApplicationSearchParams = {}): Promise<PaginatedResponse<ApplicationWithARTProfile>> {
    try {
      // First, get applications for this lowongan
      const applicationsResponse = await this.getLowonganApplications(lowonganId, params);
      
      // Then fetch ART profiles for each application
      const applicationsWithProfiles = await Promise.all(
        applicationsResponse.data.map(async (application) => {
          try {
            const artProfile = await artService.getART(application.art_user_id);
            return {
              ...application,
              art_profile: artProfile
            } as ApplicationWithARTProfile;
          } catch (error) {
            console.error(`Error fetching ART profile for user ${application.art_user_id}:`, error);
            return {
              ...application,
              art_profile: undefined
            } as ApplicationWithARTProfile;
          }
        })
      );

      return {
        data: applicationsWithProfiles,
        pagination: applicationsResponse.pagination
      };
    } catch (error) {
      console.error('Error fetching lowongan applicants with profiles:', error);
      throw error;
    }
  }

  async acceptApplication(id: string): Promise<Application> {
    return this.updateApplication(id, {
      status: 'accepted'
    });
  }

  async rejectApplication(id: string): Promise<Application> {
    return this.updateApplication(id, {
      status: 'rejected'
    });
  }

  private async incrementLowonganApplications(lowonganId: string): Promise<void> {
    try {
      // Get current application count from lowongan
      const current = await databases.getDocument(
        this.databaseId,
        DATABASE_CONFIG.collections.lowongan,
        lowonganId
      );

      // Increment applications count
      await databases.updateDocument(
        this.databaseId,
        DATABASE_CONFIG.collections.lowongan,
        lowonganId,
        { applications_count: (current.applications_count || 0) + 1 }
      );
    } catch (error) {
      console.error('Error incrementing lowongan applications:', error);
      // Don't throw error for application count failures
    }
  }

  async getStatistics(): Promise<ApplicationStatistics> {
    try {
      const [totalResponse, pendingResponse, acceptedResponse, rejectedResponse, withdrawnResponse] = await Promise.all([
        databases.listDocuments(this.databaseId, this.collectionId, [Query.limit(1)]),
        databases.listDocuments(this.databaseId, this.collectionId, [Query.equal('status', 'pending'), Query.limit(1)]),
        databases.listDocuments(this.databaseId, this.collectionId, [Query.equal('status', 'accepted'), Query.limit(1)]),
        databases.listDocuments(this.databaseId, this.collectionId, [Query.equal('status', 'rejected'), Query.limit(1)]),
        databases.listDocuments(this.databaseId, this.collectionId, [Query.equal('status', 'withdrawn'), Query.limit(1)])
      ]);

      return {
        total: totalResponse.total,
        pending: pendingResponse.total,
        accepted: acceptedResponse.total,
        rejected: rejectedResponse.total,
        withdrawn: withdrawnResponse.total,
      };
    } catch (error) {
      console.error('Error fetching application statistics:', error);
      throw error;
    }
  }

  private transformToApplication(doc: any): Application {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions || [],
      lowongan_id: doc.lowongan_id || '',
      art_user_id: doc.art_user_id || '',
      status: doc.status || 'pending',
      applied_at: doc.applied_at || doc.$createdAt,
      message: doc.message || undefined,
    };
  }

  private transformToListItem = (doc: any): ApplicationListItem => {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      lowongan_id: doc.lowongan_id || '',
      art_user_id: doc.art_user_id || '',
      status: doc.status || 'pending',
      applied_at: doc.applied_at || doc.$createdAt,
      message: doc.message || undefined,
      // Note: lowongan data would be populated separately if needed
    };
  };
}

export const applicationService = new ApplicationService();
export { ApplicationService };