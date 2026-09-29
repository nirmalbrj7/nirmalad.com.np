import { useState, useEffect, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization?: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export const TestimonialCarousel: FC<TestimonialCarouselProps> = ({
  testimonials,
  className = '',
  autoPlay = true,
  interval = 6000,
}) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className={`relative ${className}`}>
      {/* Quote icon decoration */}
      <div className="absolute -top-6 left-8 md:left-12">
        <Quote size={48} className="text-teal-200" />
      </div>

      {/* Main content */}
      <div className="relative overflow-hidden min-h-[300px] md:min-h-[250px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <blockquote className="text-lg md:text-xl lg:text-2xl text-charcoal-700 leading-relaxed font-light italic mb-8">
              "{testimonials[current].quote}"
            </blockquote>
            
            <div className="flex items-center gap-4">
              {testimonials[current].avatar ? (
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-coral-400 flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-charcoal-900">{testimonials[current].author}</p>
                <p className="text-sm text-charcoal-500">
                  {testimonials[current].role}
                  {testimonials[current].organization && `, ${testimonials[current].organization}`}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-teal-500'
                  : 'bg-charcoal-200 hover:bg-charcoal-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-charcoal-200 text-charcoal-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full border border-charcoal-200 text-charcoal-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
