"use client";

import EmblaCarousel from './carousel/EmblaCarousel'
import '/src/app/embla.css'
import type { Testimonial } from '@/types/components'

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

const OPTIONS = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ 
  testimonials 
}) => {
  return (
    <div>
      <EmblaCarousel testimonials={testimonials} options={OPTIONS} />
    </div>
  );
};