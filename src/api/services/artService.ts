/**
 * ART Service
 * API service for ART (Asisten Rumah Tangga) operations
 */

import { Query } from 'appwrite';
import { apiClient } from '../core';
import { DATABASE_CONFIG, PAGINATION_CONFIG } from '../config';
import type { 
  ARTProfile, 
  ARTListItem, 
  ARTSearchParams, 
  CreateARTProfileData, 
  UpdateARTProfileData,
  ARTReview,
  ARTStatistics,
  ARTCardData 
} from '@/types/art';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  CreateData, 
  UpdateData 
} from '@/types/api';

class ARTService {
  private readonly collectionId = DATABASE_CONFIG.collections.arts;
  private readonly databaseId = DATABASE_CONFIG.databaseId;

  /**
   * Get all ARTs with pagination and filtering
   */
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
        if (filters.specializations?.length) {
          queries.push(Query.contains('specializations', filters.specializations));
        }
        
        if (filters.location?.cities?.length) {
          queries.push(Query.contains('location.city', filters.location.cities));
        }
        
        if (filters.verification?.isVerified !== undefined) {
          queries.push(Query.equal('verification.isVerified', filters.verification.isVerified));
        }
        
        if (filters.availability?.isAvailable !== undefined) {
          queries.push(Query.equal('availability.isAvailable', filters.availability.isAvailable));
        }
        
        if (filters.rating?.min) {
          queries.push(Query.greaterThanEqual('rating.average', filters.rating.min));
        }
        
        if (filters.experienceLevel?.length) {
          queries.push(Query.contains('experience.level', filters.experienceLevel));
        }
        
        if (filters.workTypes?.length) {
          queries.push(Query.contains('workTypes', filters.workTypes));
        }
      }

      // Add sorting
      if (sort) {
        const orderType = sort.direction === 'desc' ? Query.orderDesc : Query.orderAsc;
        queries.push(orderType(sort.field));
      } else {
        // Default sort by rating
        queries.push(Query.orderDesc('rating.average'));
      }

      // Execute query using Appwrite SDK directly
      const response = await apiClient.appwriteDatabase.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      // Transform to ARTListItem format
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

  /**
   * Get single ART by ID
   */
  async getART(id: string): Promise<ARTProfile> {
    try {
      const response = await apiClient.appwriteDatabase.getDocument(
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

  /**
   * Create new ART profile
   */
  async createART(data: CreateARTProfileData): Promise<ARTProfile> {
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

      const response = await apiClient.appwriteDatabase.createDocument(
        this.databaseId,
        this.collectionId,
        'unique()',
        artData
      );

      return this.transformToProfile(response);
    } catch (error) {
      console.error('Error creating ART:', error);
      throw error;
    }
  }

  /**
   * Update ART profile
   */
  async updateART(id: string, data: UpdateARTProfileData): Promise<ARTProfile> {
    try {
      // Get current profile to calculate new completeness
      const currentProfile = await this.getART(id);
      const updatedData = {
        ...data,
        profileCompleteness: this.calculateCompleteness({ ...currentProfile, ...data }),
      };

      const response = await apiClient.appwriteDatabase.updateDocument(
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

  /**
   * Delete ART profile
   */
  async deleteART(id: string): Promise<void> {
    try {
      await apiClient.appwriteDatabase.deleteDocument(
        this.databaseId,
        this.collectionId,
        id
      );
    } catch (error) {
      console.error('Error deleting ART:', error);
      throw error;
    }
  }

  /**
   * Search ARTs with advanced filters
   */
  async searchARTs(params: ARTSearchParams): Promise<PaginatedResponse<ARTListItem>> {
    return this.getARTs(params);
  }

  /**
   * Get featured/recommended ARTs
   */
  async getFeaturedARTs(limit: number = 6): Promise<ARTListItem[]> {
    try {
      const queries = [
        Query.equal('verification.isVerified', true),
        Query.equal('availability.isAvailable', true),
        Query.greaterThan('rating.average', 4.0),
        Query.orderDesc('rating.average'),
        Query.limit(limit),
      ];

      const response = await apiClient.appwriteDatabase.listDocuments(
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

  /**
   * Get ART statistics
   */
  async getStatistics(): Promise<ARTStatistics> {
    try {
      // This would typically be a separate endpoint or aggregation
      // For now, we'll fetch basic stats
      const totalResponse = await apiClient.appwriteDatabase.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.limit(1)]
      );

      const verifiedResponse = await apiClient.appwriteDatabase.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('verification.isVerified', true), Query.limit(1)]
      );

      const activeResponse = await apiClient.appwriteDatabase.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('status', 'active'), Query.limit(1)]
      );

      return {
        totalARTs: totalResponse.total,
        verifiedARTs: verifiedResponse.total,
        activeARTs: activeResponse.total,
        averageRating: 4.2, // This would come from aggregation
        totalReviews: 0, // This would come from reviews collection
        specializations: {}, // This would come from aggregation
        cities: {}, // This would come from aggregation
        experienceLevels: {}, // This would come from aggregation
      } as ARTStatistics;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

  /**
   * Transform Appwrite document to ARTProfile
   */
  private transformToProfile(doc: any): ARTProfile {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      ...doc,
    } as ARTProfile;
  }

  /**
   * Transform Appwrite document to ARTListItem
   */
  private transformToListItem(doc: any): ARTListItem {
    return {
      $id: doc.$id,
      name: doc.name,
      avatar: doc.avatar,
      specializations: doc.specializations || [],
      experience: doc.experience || { years: 0, level: 'beginner' },
      location: doc.location || { city: '' },
      rating: doc.rating || { average: 0, count: 0 },
      priceRange: doc.priceRange || { min: 0, max: 0, currency: 'IDR' },
      verification: doc.verification || { isVerified: false },
      availability: doc.availability || { isAvailable: false },
      status: doc.status || 'pending',
    } as ARTListItem;
  }

  /**
   * Transform ARTListItem to ARTCardData (for components)
   */
  static transformToCardData(art: ARTListItem): ARTCardData {
    return {
      id: art.$id,
      name: art.name,
      avatar: art.avatar,
      specialization: art.specializations[0] || 'Asisten Rumah Tangga',
      city: art.location.city,
      rating: art.rating.average,
      reviewCount: art.rating.count,
      experience: art.experience.years,
      priceRange: art.priceRange,
      isVerified: art.verification.isVerified,
      isAvailable: art.availability.isAvailable,
      description: `${art.experience.level} dengan ${art.experience.years} tahun pengalaman`,
    };
  }

  /**
   * Calculate profile completeness percentage
   */
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

// Export singleton instance
export const artService = new ARTService();

// Export the class for testing
export { ARTService };