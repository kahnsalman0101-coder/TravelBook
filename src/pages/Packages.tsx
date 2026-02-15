import { useState } from 'react';
import { Search, MapPin, Star, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { packages } from '@/data/destinations';

export default function Packages() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative h-80 bg-dark">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop"
          alt="Travel Packages"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our curated travel packages for unforgettable experiences at amazing prices.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container-custom -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages by destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark">Featured Packages</h2>
          <p className="text-gray-500">{filteredPackages.length} packages available</p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-sm font-bold rounded-full">
                    {pkg.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {pkg.destination}
                  </div>

                  <h3 className="font-bold text-dark text-xl mb-2">{pkg.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <span className="text-sm font-bold text-green-600">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({pkg.reviews} reviews)</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                  {/* Inclusions */}
                  <div className="space-y-2 mb-4 flex-1">
                    {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-primary">
                        Rs {pkg.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">per person</p>
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

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No packages found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
