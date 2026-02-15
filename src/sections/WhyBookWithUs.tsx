import { useEffect, useRef } from 'react';
import { Calendar, BadgePercent, Tag, Headphones } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'We offer easy and convenient flight bookings with attractive offers. Book your tickets in just a few clicks.',
    color: 'from-primary to-primary-dark',
    bgColor: 'bg-primary/10',
  },
  {
    icon: BadgePercent,
    title: 'Lowest Price',
    description: 'We ensure low rates on hotel reservation, holiday packages and on flight tickets. Best price guaranteed.',
    color: 'from-secondary to-secondary-dark',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: Tag,
    title: 'Exciting Deals',
    description: 'Enjoy exciting deals on flights, hotels, buses, car rental and tour packages. Save more on every booking.',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get assistance 24/7 on any kind of travel related query. We are happy to assist you anytime, anywhere.',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export default function WhyBookWithUs() {
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
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Why Book With <span className="text-primary">Us?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best travel booking experience with unbeatable prices and exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 rounded-full`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500K+', label: 'Happy Travelers' },
            { value: '100+', label: 'Airline Partners' },
            { value: '50+', label: 'Destinations' },
            { value: '24/7', label: 'Customer Support' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
