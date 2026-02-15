import { useState } from 'react';
import { Copy, Check, Clock, Tag, Percent, ArrowRight, Plane, Hotel, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deals } from '@/data/destinations';
import { parseISO, differenceInDays } from 'date-fns';

const categories = [
  { key: 'all', label: 'All Deals', icon: Percent },
  { key: 'flights', label: 'Flights', icon: Plane },
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'packages', label: 'Packages', icon: Package },
];

export default function Deals() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDaysLeft = (validUntil: string) => {
    const days = differenceInDays(parseISO(validUntil), new Date());
    return days > 0 ? days : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative h-72 bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals & Offers</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Save big on your next adventure with our special discounts and promotional offers
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container-custom -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-card p-2 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className={`bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'grid md:grid-cols-2' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'h-64 md:h-full' : 'h-48'}`}>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className={`absolute top-4 left-4 bg-secondary text-white font-bold flex flex-col items-center justify-center ${
                    index === 0 ? 'w-20 h-20 rounded-2xl text-2xl' : 'w-14 h-14 rounded-xl text-lg'
                  }`}>
                    <span>{deal.discount}%</span>
                    <span className="text-xs font-normal">OFF</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Tag className="w-4 h-4" />
                    <span>Use code:</span>
                    <button
                      onClick={() => handleCopyCode(deal.code)}
                      className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary font-mono font-bold rounded hover:bg-primary/20 transition-colors"
                    >
                      {deal.code}
                      {copiedCode === deal.code ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <h3 className={`font-bold text-dark mb-3 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                    {deal.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{getDaysLeft(deal.validUntil)} days left</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary-dark">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="container-custom pb-12">
        <div className="bg-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss a Deal</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive offers and discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary-dark">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
