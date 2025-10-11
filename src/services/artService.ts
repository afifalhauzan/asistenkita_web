import { databases } from '@/lib/appwrite';
import { Query, ID } from 'appwrite';
import { DATABASE_CONFIG, PAGINATION_CONFIG } from '@/lib/appwrite';
import type { 
  ARTProfile, 
  ARTListItem, 
  ARTSearchParams, 
  CreateARTRequest, 
  UpdateARTRequest,
  ARTStatistics
} from '@/types/art';
import type { 
  PaginatedResponse, 
  CreateData, 
  UpdateData 
} from '@/types/services';

class ARTService {
  private readonly collectionId = DATABASE_CONFIG.collections.arts;
  private readonly databaseId = DATABASE_CONFIG.databaseId;

  async getARTs(params: ARTSearchParams = {}): Promise<PaginatedResponse<ARTListItem>> {
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

      // Add search query
      if (q) {
        queries.push(Query.search('name', q));
      }

      // Add filters
      if (filters) {
        if (filters.skills?.length) {
          queries.push(Query.contains('skills', filters.skills));
        }
        
        if (filters.job_types?.length) {
          queries.push(Query.contains('job_types', filters.job_types));
        }
        
        if (filters.work_arrangement?.length) {
          queries.push(Query.contains('work_arrangement', filters.work_arrangement));
        }
        
        if (filters.gender?.length) {
          queries.push(Query.contains('gender', filters.gender));
        }
        
        if (filters.location?.cities?.length) {
          queries.push(Query.contains('domicile_city', filters.location.cities));
        }
        
        if (filters.location?.districts?.length) {
          queries.push(Query.contains('domicile_district', filters.location.districts));
        }
        
        if (filters.verification?.is_verified !== undefined) {
          queries.push(Query.equal('is_verified', filters.verification.is_verified));
        }
        
        if (filters.rating?.min) {
          queries.push(Query.greaterThanEqual('rating_average', filters.rating.min));
        }
        
        if (filters.rating?.min_count) {
          queries.push(Query.greaterThanEqual('rating_count', filters.rating.min_count));
        }
        
        if (filters.age_range?.min) {
          queries.push(Query.greaterThanEqual('age', filters.age_range.min));
        }
        
        if (filters.age_range?.max) {
          queries.push(Query.lessThanEqual('age', filters.age_range.max));
        }
        
        if (filters.salary_range?.min) {
          queries.push(Query.greaterThanEqual('salary_min', filters.salary_range.min));
        }
        
        if (filters.salary_range?.max) {
          queries.push(Query.lessThanEqual('salary_max', filters.salary_range.max));
        }
      }

      if (sort) {
        const orderType = sort.direction === 'desc' ? Query.orderDesc : Query.orderAsc;
        queries.push(orderType(sort.field));
      } else {
        // Default sort by rating
        queries.push(Query.orderDesc('rating_average'));
      }

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      const arts = response.documents.map(this.transformToListItem);

      return {
        data: arts,
        pagination: {
          total: response.total,
          limit,
          offset,
          page: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(response.total / limit),
          hasNextPage: offset + limit < response.total,
          hasPrevPage: offset > 0,
        },
      };
    } catch (error) {
      console.error('Error fetching ARTs:', error);
      throw error;
    }
  }

  async getART(id: string): Promise<ARTProfile> {
    try {
      const response = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );

      return this.transformToProfile(response);
    } catch (error) {
      console.error('Error fetching ART:', error);
      throw error;
    }
  }

  async createART(data: CreateARTRequest): Promise<ARTProfile> {
    try {
      const artData = {
        ...data,
        status: 'pending' as const,
        verification: {
          isVerified: false,
          verificationLevel: 'basic' as const,
          documents: {
            identity: false,
            background: false,
            skills: false,
            references: false,
          },
        },
        rating: {
          average: 0,
          count: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        },
        availability: {
          isAvailable: true,
        },
        profileCompleteness: this.calculateCompleteness(data),
        joinedAt: new Date().toISOString(),
      };

      const response = await databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        artData
      );

      return this.transformToProfile(response);
    } catch (error) {
      console.error('Error creating ART:', error);
      throw error;
    }
  }

  async updateART(id: string, data: UpdateARTRequest): Promise<ARTProfile> {
    try {
      // Get current profile to calculate new completeness
      const currentProfile = await this.getART(id);
      const updatedData = {
        ...data,
        profileCompleteness: this.calculateCompleteness({ ...currentProfile, ...data }),
      };

      const response = await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        updatedData
      );

      return this.transformToProfile(response);
    } catch (error) {
      console.error('Error updating ART:', error);
      throw error;
    }
  }

  async deleteART(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        id
      );
    } catch (error) {
      console.error('Error deleting ART:', error);
      throw error;
    }
  }


  async searchARTs(params: ARTSearchParams): Promise<PaginatedResponse<ARTListItem>> {
    return this.getARTs(params);
  }

  async getFeaturedARTs(limit: number = 4): Promise<ARTListItem[]> {
    try {
      const queries = [
        Query.equal('verification.isVerified', true),
        Query.equal('availability.isAvailable', true),
        Query.greaterThan('rating.average', 4.0),
        Query.orderDesc('rating.average'),
        Query.limit(limit),
      ];

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      return response.documents.map(this.transformToListItem);
    } catch (error) {
      console.error('Error fetching featured ARTs:', error);
      throw error;
    }
  }


  async getStatistics(): Promise<ARTStatistics> {
    try {
      // This would typically be a separate endpoint or aggregation
      // For now, we'll fetch basic stats
      const totalResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.limit(1)]
      );

      const verifiedResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('verification.isVerified', true), Query.limit(1)]
      );

      const activeResponse = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('status', 'active'), Query.limit(1)]
      );

      return {
        total: totalResponse.total,
        verified: verifiedResponse.total,
        unverified: totalResponse.total - verifiedResponse.total,
        averageRating: 4.2, // This would come from aggregation
        topSkills: [], // This would come from aggregation
        locationDistribution: [], // This would come from aggregation
        workArrangementDistribution: [], // This would come from aggregation
      } as ARTStatistics;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

  private transformToProfile(doc: any): ARTProfile {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      ...doc,
    } as ARTProfile;
  }


  private transformToListItem(doc: any): ARTListItem {
    return {
      $id: doc.$id,
      name: doc.name,
      avatar_id: doc.avatar_id,
      bio: doc.bio,
      age: doc.age,
      gender: doc.gender,
      education: doc.education,
      skills: doc.skills || [],
      job_types: doc.job_types || [],
      work_arrangement: doc.work_arrangement,
      work_experience: doc.work_experience,
      domicile_city: doc.domicile_city,
      domicile_district: doc.domicile_district,
      salary_min: doc.salary_min,
      salary_max: doc.salary_max,
      salary_unit: doc.salary_unit,
      is_verified: doc.is_verified || false,
      ektp_file_id: doc.ektp_file_id,
      rating_average: doc.rating_average || 0,
      rating_count: doc.rating_count || 0,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    } as ARTListItem;
  }


  private calculateCompleteness(data: any): number {
    const requiredFields = [
      'name', 'email', 'phone', 'specializations', 'bio', 
      'description', 'experience', 'location', 'priceRange'
    ];
    
    const optionalFields = [
      'avatar', 'skills', 'languages', 'certifications', 'education'
    ];

    let score = 0;
    
    // Required fields (70% weight)
    const requiredScore = requiredFields.reduce((acc, field) => {
      return acc + (data[field] ? 1 : 0);
    }, 0);
    score += (requiredScore / requiredFields.length) * 70;

    // Optional fields (30% weight)
    const optionalScore = optionalFields.reduce((acc, field) => {
      return acc + (data[field] ? 1 : 0);
    }, 0);
    score += (optionalScore / optionalFields.length) * 30;

    return Math.round(score);
  }
}

export const artService = new ARTService();
export { ARTService };