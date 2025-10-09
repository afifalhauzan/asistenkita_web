"use client";

import EmblaCarousel from './carousel/EmblaCarousel'
import '/src/app/embla.css'

const OPTIONS = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const TestimonialCarousel = ({ testimonials }) => {

    return (
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    );
};