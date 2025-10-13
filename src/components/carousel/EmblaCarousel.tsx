import React, { useCallback, useState, useEffect } from 'react';
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import { TestimonialCard } from '../TestimonialCard';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { testimonialsData } from '@/components/data/testimonialsData';
import '@/app/embla.css';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import type { Testimonial } from '@/types/components';

interface EmblaCarouselProps {
  testimonials?: Testimonial[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
    const { testimonials = testimonialsData, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    // Return early if no testimonials
    if (!testimonials || testimonials.length === 0) {
        return <div className="embla__loading">No testimonials available</div>;
    }

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop;

        resetOrStop();
    }, []);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick);

    return (
        <section className="embla">
            <div className="embla__viewport py-10" ref={emblaRef}>
                <div className="embla__container">
                    {testimonials.map((testimonial: Testimonial, index: number) => {
                        // Check if this slide is the center one
                        const isCenterSlide = index === selectedIndex;
                        return (
                            <div
                                className={`embla__slide transition-scale duration-300 ${
                                    isCenterSlide ? 'scale-100 z-10' : 'scale-80'
                                }`}
                                key={testimonial.id}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;