import type { Review, ReviewSummary, ReviewsData } from '@/types/review';

export const mockReviews: Review[] = [
  {
    id: "1",
    reviewerId: "user-1",
    reviewerName: "Merin Wisna",
    reviewerAvatar: "/avatars/merin.jpg",
    rating: 5,
    comment: "Ibu nya came through for a last minute request, was timely, and kept my daughter entertained. I couldn't ask for more",
    createdAt: "2024-01-15",
    isVerified: true
  },
  {
    id: "2",
    reviewerId: "user-2",
    reviewerName: "Sari Indah",
    reviewerAvatar: "/avatars/sari.jpg",
    rating: 4,
    comment: "Pelayanan sangat baik, anak-anak sangat senang. Datang tepat waktu dan sangat profesional dalam bekerja.",
    createdAt: "2024-01-10",
    isVerified: true
  },
  {
    id: "3",
    reviewerId: "user-3",
    reviewerName: "Ahmad Rizki",
    reviewerAvatar: "/avatars/ahmad.jpg",
    rating: 5,
    comment: "Sangat merekomendasikan! Pengasuh yang sangat sabar dan teliti. Rumah selalu bersih dan rapi setelah Ibu Siti bekerja.",
    createdAt: "2024-01-05",
    isVerified: false
  },
  {
    id: "4",
    reviewerId: "user-4",
    reviewerName: "Lisa Permata",
    reviewerAvatar: "/avatars/lisa.jpg",
    rating: 5,
    comment: "Excellent service! Very professional and caring with children. Highly recommended for busy families.",
    createdAt: "2023-12-28",
    isVerified: true
  }
];

export const mockReviewSummary: ReviewSummary = {
  averageRating: 5.0,
  totalReviews: 120,
  ratingDistribution: {
    1: 2,
    2: 3,
    3: 8,
    4: 25,
    5: 82
  }
};

export const mockReviewsData: ReviewsData = {
  summary: mockReviewSummary,
  reviews: mockReviews
};

// Education data
export const mockEducation = [
  {
    level: "Bachelor's degree",
    institution: "Korea Advanced Institute of Science and Technology",
    field: "Computer Science and Business Technology Management (Double Major)",
    certification: "Certification in Artificial Intelligence",
    year: "2019-2023"
  },
  {
    level: "Bachelor's degree", 
    institution: "Korea Advanced Institute of Science and Technology",
    field: "Computer Science and Business Technology Management (Double Major)",
    certification: "Certification in Artificial Intelligence",
    year: "2015-2019"
  }
];

// Services/Layanan data
export const mockServices = [
  { icon: "👶", name: "Pengasuh anak", available: true },
  { icon: "🏠", name: "Asisten Rumah Tangga", available: true },
  { icon: "👶", name: "Pengasuh anak", available: false },
  { icon: "🏠", name: "Asisten Rumah Tangga", available: false }
];

// Skills data
export const mockSkills = [
  "Mengasuh anak",
  "Laundry", 
  "Mengemudi motor",
  "Memasak",
  "House cleaning",
  "Komunikasi",
  "Mengemudi mobil",
  "Manajemen waktu"
];

// Tarif data
export const mockTarif = {
  startingPrice: "Mulai dari Rp 1.000.000,00/bulan",
  description: "Tarif dapat bervariasi tergantung jenis layanan dan durasi kontrak"
};