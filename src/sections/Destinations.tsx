import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { destinations } from '@/data/destinations';

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 4);
  const maxIndex = destinations.length - 4;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-light to-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={contentRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700"
        >
          <div>
            <p className="text-primary font-medium mb-2">Popular Destinations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Prepare yourself and let's explore<br />
              <span className="text-primary">the beauty of the world</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-dark hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-dark hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {destination.country}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{destination.city}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs">Starting from</p>
                    <p className="text-primary font-bold text-lg">
                      Rs {destination.startingPrice.toLocaleString()}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-primary transition-colors">
                    Explore
                  </button>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                Popular
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
