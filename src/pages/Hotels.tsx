import { useState } from 'react';
import { Search, MapPin, Star, Users, Calendar, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotels } from '@/data/destinations';

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative h-80 bg-dark">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=600&fit=crop"
          alt="Hotels"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover amazing hotels at the best prices. From luxury resorts to budget-friendly stays.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container-custom -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <Button className="bg-primary hover:bg-primary-dark h-full">
              <Search className="w-5 h-5 mr-2" />
              Search Hotels
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark">Popular Hotels</h2>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Hotel Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {hotel.stars} Star
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-dark text-lg">{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    <span className="text-sm font-bold text-green-600">{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-primary">
                      Rs {hotel.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">per night</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary-dark">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
