import { useEffect, useRef } from 'react';
import { airlines } from '@/data/flights';

export default function AirlinePartners() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Double the airlines array for seamless loop
  const doubledAirlines = [...airlines, ...airlines];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div 
        ref={sectionRef}
        className="container-custom opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Our Partners</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Trusted <span className="text-primary">Airline Partners</span>
          </h2>
        </div>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative mb-6 group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {doubledAirlines.map((airline, index) => (
            <div
              key={`row1-${airline.name}-${index}`}
              className="flex-shrink-0 mx-6 px-8 py-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-card transition-all duration-300 group/card"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={airline.logo}
                    alt={airline.name}
                    className="w-8 h-8 object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${airline.name}&background=${airline.color.replace('#', '')}&color=fff`;
                    }}
                  />
                </div>
                <span className="font-medium text-gray-600 group-hover/card:text-dark transition-colors whitespace-nowrap">
                  {airline.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...doubledAirlines].reverse().map((airline, index) => (
            <div
              key={`row2-${airline.name}-${index}`}
              className="flex-shrink-0 mx-6 px-8 py-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-card transition-all duration-300 group/card"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={airline.logo}
                    alt={airline.name}
                    className="w-8 h-8 object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${airline.name}&background=${airline.color.replace('#', '')}&color=fff`;
                    }}
                  />
                </div>
                <span className="font-medium text-gray-600 group-hover/card:text-dark transition-colors whitespace-nowrap">
                  {airline.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
