import { databases } from '@/lib/appwrite';
import { Query, ID } from 'appwrite';
import { DATABASE_CONFIG, PAGINATION_CONFIG } from '@/lib/appwrite';
import type { 
  Lowongan, 
  LowonganListItem, 
  LowonganSearchParams, 
  CreateLowonganRequest, 
  UpdateLowonganRequest,
  LowonganStatistics
} from '@/types/lowongan';
import type { 
  PaginatedResponse, 
  CreateData, 
  UpdateData 
} from '@/types/services';

class LowonganService {
  private readonly collectionId = DATABASE_CONFIG.collections.lowongan;
  private readonly databaseId = DATABASE_CONFIG.databaseId;

  async getLowongans(params: LowonganSearchParams = {}): Promise<PaginatedResponse<LowonganListItem>> {
    try {
      const {
        limit = PAGINATION_CONFIG.defaultLimit,
        offset = PAGINATION_CONFIG.defaultOffset,
        q,
        filters,
        sort
      } = params;

      // Build Appwrite queries
      const queries: string[] = [
        Query.limit(limit),
        Query.offset(offset),
      ];

      // Add search query for title and description
      if (q) {
        queries.push(Query.search('title', q));
      }

      // Add filters
      if (filters) {
        if (filters.job_types?.length) {
          queries.push(Query.contains('job_types', filters.job_types));
        }
        
        if (filters.skills?.length) {
          queries.push(Query.contains('skills', filters.skills));
        }
        
        if (filters.work_arrangement?.length) {
          queries.push(Query.contains('work_arrangement', filters.work_arrangement));
        }
        
        if (filters.gender?.length) {
          queries.push(Query.equal('gender', filters.gender));
        }

        if (filters.domicile_city?.length) {
          queries.push(Query.equal('domicile_city', filters.domicile_city));
        }

        if (filters.education?.length) {
          queries.push(Query.equal('education', filters.education));
        }

        if (filters.salary_min !== undefined) {
          queries.push(Query.greaterThanEqual('salary_min', filters.salary_min));
        }

        if (filters.salary_max !== undefined) {
          queries.push(Query.lessThanEqual('salary_max', filters.salary_max));
        }

        if (filters.is_active !== undefined) {
          queries.push(Query.equal('is_active', filters.is_active));
        }

        if (filters.user_id) {
          queries.push(Query.equal('user_id', filters.user_id));
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
        // Default sort by creation date (newest first)
        queries.push(Query.orderDesc('$createdAt'));
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
      console.error('Error fetching lowongans:', error);
      throw error;
    }
  }

  async getLowongan(id: string): Promise<Lowongan> {
    try {
      const response = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );

      // Increment view count
      await this.incrementViews(id);

      return this.transformToLowongan(response);
    } catch (error) {
      console.error('Error fetching lowongan:', error);
      throw error;
    }
  }

  async createLowongan(data: CreateLowonganRequest, userId: string): Promise<Lowongan> {
    try {
      const lowonganData = {
        ...data,
        user_id: userId,
        status: 'draft' as const,
        is_active: false,
        applications_count: 0,
        views_count: 0,
        // Set expiry to 30 days from now if not provided
        expires_at: data.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const response = await databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        lowonganData
      );

      return this.transformToLowongan(response);
    } catch (error) {
      console.error('Error creating lowongan:', error);
      throw error;
    }
  }

  async updateLowongan(id: string, data: UpdateLowonganRequest): Promise<Lowongan> {
    try {
      const response = await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        data
      );

      return this.transformToLowongan(response);
    } catch (error) {
      console.error('Error updating lowongan:', error);
      throw error;
    }
  }

  async deleteLowongan(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        id
      );
    } catch (error) {
      console.error('Error deleting lowongan:', error);
      throw error;
    }
  }

  async publishLowongan(id: string): Promise<Lowongan> {
    return this.updateLowongan(id, {
      status: 'published',
      is_active: true
    });
  }

  async closeLowongan(id: string): Promise<Lowongan> {
    return this.updateLowongan(id, {
      status: 'closed',
      is_active: false
    });
  }

  async incrementViews(id: string): Promise<void> {
    try {
      // Get current view count
      const current = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );

      // Increment views
      await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        { views_count: (current.views_count || 0) + 1 }
      );
    } catch (error) {
      console.error('Error incrementing views:', error);
      // Don't throw error for view count failures
    }
  }

  async incrementApplications(id: string): Promise<void> {
    try {
      // Get current application count
      const current = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );

      // Increment applications
      await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        { applications_count: (current.applications_count || 0) + 1 }
      );
    } catch (error) {
      console.error('Error incrementing applications:', error);
      throw error;
    }
  }

  async searchLowongans(params: LowonganSearchParams): Promise<PaginatedResponse<LowonganListItem>> {
    return this.getLowongans(params);
  }

  async getFeaturedLowongans(limit: number = 4): Promise<LowonganListItem[]> {
    try {
      const queries = [
        Query.equal('status', 'published'),
        Query.equal('is_active', true),
        Query.orderDesc('views_count'),
        Query.limit(limit),
      ];

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      return response.documents.map(this.transformToListItem);
    } catch (error) {
      console.error('Error fetching featured lowongans:', error);
      throw error;
    }
  }

  async getUserLowongans(userId: string, params: LowonganSearchParams = {}): Promise<PaginatedResponse<LowonganListItem>> {
    const paramsWithUser = {
      ...params,
      filters: {
        ...params.filters,
        user_id: userId
      }
    };

    return this.getLowongans(paramsWithUser);
  }

  async getStatistics(): Promise<LowonganStatistics> {
    try {
      // This would typically be a separate endpoint or aggregation
      // For now, we'll fetch basic stats
      const totalResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.limit(1)]
      );

      const publishedResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('status', 'published'), Query.limit(1)]
      );

      const activeResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('is_active', true), Query.limit(1)]
      );

      return {
        total: totalResponse.total,
        published: publishedResponse.total,
        draft: 0, // Would need separate query
        closed: 0, // Would need separate query
        expired: 0, // Would need separate query
        active: activeResponse.total,
        totalApplications: 0, // Would need aggregation
        averageSalary: {
          min: 0,
          max: 0
        }, // Would need aggregation
        topJobTypes: [], // Would need aggregation
        topSkills: [], // Would need aggregation
        cityDistribution: [], // Would need aggregation
        workArrangementDistribution: [], // Would need aggregation
      };
    } catch (error) {
      console.error('Error fetching lowongan statistics:', error);
      throw error;
    }
  }

  private transformToLowongan(doc: any): Lowongan {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions || [],
      title: doc.title || '',
      description: doc.description || '',
      domicile_city: doc.domicile_city || '',
      education: doc.education || null,
      gender: doc.gender || null,
      job_types: doc.job_types || [],
      skills: doc.skills || [],
      work_arrangement: doc.work_arrangement || [],
      salary_min: doc.salary_min || null,
      salary_max: doc.salary_max || null,
      user_id: doc.user_id || null,
      is_active: doc.is_active || false,
      applications_count: doc.applications_count || 0,
      views_count: doc.views_count || 0,
      expires_at: doc.expires_at || null,
    };
  }

  private transformToListItem = (doc: any): LowonganListItem => {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      title: doc.title || '',
      description: doc.description || '',
      domicile_city: doc.domicile_city || '',
      education: doc.education || null,
      gender: doc.gender || null,
      job_types: doc.job_types || [],
      skills: doc.skills || [],
      work_arrangement: doc.work_arrangement || [],
      salary_min: doc.salary_min || null,
      salary_max: doc.salary_max || null,
      user_id: doc.user_id || null,
      status: doc.status || 'draft',
      is_active: doc.is_active || false,
      applications_count: doc.applications_count || 0,
      views_count: doc.views_count || 0,
      expires_at: doc.expires_at || null,
    };
  };
}

export const lowonganService = new LowonganService();
export { LowonganService };