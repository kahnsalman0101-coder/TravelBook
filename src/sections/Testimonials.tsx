import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/destinations';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-light">
      <div className="container-custom">
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              What Our <span className="text-primary">Travelers Say</span>
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-card p-8 md:p-12">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                {/* Avatar Section */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/20"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-secondary text-white text-sm font-bold rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      {currentTestimonial.rating}
                    </div>
                  </div>
                  <h4 className="mt-4 font-bold text-dark">{currentTestimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                </div>

                {/* Review Content */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating
                            ? 'text-secondary fill-secondary'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "{currentTestimonial.review}"
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-primary'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
