import { useEffect, useRef } from 'react';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { deals } from '@/data/destinations';
import { parseISO, differenceInDays } from 'date-fns';

export default function Deals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const getDaysLeft = (validUntil: string) => {
    const days = differenceInDays(parseISO(validUntil), new Date());
    return days > 0 ? days : 0;
  };

  return (
    <section ref={sectionRef} className="section-padding bg-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Special Offers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Exciting <span className="text-primary">Deals & Offers</span>
          </h2>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Deal */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="group relative md:row-span-2 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
          >
            <div className="absolute inset-0">
              <img
                src={deals[0].image}
                alt={deals[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            </div>

            <div className="relative h-full min-h-[400px] md:min-h-full flex flex-col justify-end p-6 md:p-8">
              {/* Discount Badge */}
              <div className="absolute top-6 left-6 w-16 h-16 bg-secondary rounded-full flex flex-col items-center justify-center text-white animate-pulse">
                <span className="text-xl font-bold">{deals[0].discount}%</span>
                <span className="text-xs">OFF</span>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                  <Tag className="w-4 h-4" />
                  <span>Use code: <span className="font-mono font-bold text-secondary">{deals[0].code}</span></span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{deals[0].title}</h3>
                <p className="text-white/80 mb-4 max-w-md">{deals[0].description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{getDaysLeft(deals[0].validUntil)} days left</span>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors group/btn">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Other Deals */}
          {deals.slice(1).map((deal, index) => (
            <div
              key={deal.id}
              ref={(el) => { cardsRef.current[index + 1] = el; }}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="absolute inset-0">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent" />
              </div>

              <div className="relative h-full min-h-[200px] flex items-center p-6">
                <div className="flex-1">
                  {/* Discount Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-white text-sm font-bold rounded-full mb-3">
                    <span>{deal.discount}% OFF</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{deal.title}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{deal.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{getDaysLeft(deal.validUntil)} days left</span>
                    </div>
                    <span className="text-white/40 text-xs">Code: <span className="font-mono text-secondary">{deal.code}</span></span>
                  </div>
                </div>

                <button className="ml-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors flex-shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
