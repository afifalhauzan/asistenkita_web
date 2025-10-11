export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  testimonial: string;
  bgColor: string;
}

export interface MitraData {
  id: number | string;
  name: string;
  specialization: string;
  rating: number;
  city: string;
  description: string;
  image?: string;
  avatar_id?: string;
  isVerified: boolean;
  reviewCount?: number;
  experience?: number;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
    unit?: string;
  };
  isAvailable?: boolean;
}

// Component Props Interfaces
export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface MitraCardProps {
  data: MitraData;
}

// Navigation related types
export interface NavbarProps {
  className?: string;
}

// Logo component props
export interface LogoFullProps {
  className?: string;
  width?: number;
  height?: number;
}

// Carousel related types (for EmblaCarousel integration)
export interface CarouselOptions {
  align?: 'start' | 'center' | 'end';
  containScroll?: 'trimSnaps' | 'keepSnaps' | false;
  dragFree?: boolean;
  loop?: boolean;
  skipSnaps?: boolean;
  startIndex?: number;
}

export interface EmblaCarouselProps {
  slides: React.ReactNode[];
  options?: CarouselOptions;
  className?: string;
}

export interface EmblaCarouselArrowButtonsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
}

// Common UI types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

// Generic component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}