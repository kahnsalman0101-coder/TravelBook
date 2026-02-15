import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Filter, 
  ArrowUpDown, 
  Luggage, 
  RotateCcw,
  ChevronDown,
  X,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchStore, useFlightResultsStore, useBookingStore } from '@/store';
import { generateFlights, airlines } from '@/data/flights';
import type { Flight } from '@/types';
import { format } from 'date-fns';

const sortOptions = [
  { key: 'price', label: 'Price (Lowest)' },
  { key: 'duration', label: 'Duration (Shortest)' },
  { key: 'departure', label: 'Departure (Earliest)' },
  { key: 'arrival', label: 'Arrival (Earliest)' },
];

// Departure time filters - can be used for future implementation
// const departureTimeFilters = [
//   { key: 'morning', label: 'Morning (6AM - 12PM)' },
//   { key: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
//   { key: 'evening', label: 'Evening (6PM - 12AM)' },
//   { key: 'night', label: 'Night (12AM - 6AM)' },
// ];

export default function FlightResults() {
  const navigate = useNavigate();
  const { from, to, departureDate, travelers, travelClass } = useSearchStore();
  const { flights, filters, sortBy, setFlights, setFilters, setSortBy, setSelectedFlight } = useFlightResultsStore();
  const { setCurrentBooking } = useBookingStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const generatedFlights = generateFlights(from, to, departureDate?.toISOString() || '');
      setFlights(generatedFlights);
      setLoading(false);
    }, 1500);
  }, [from, to, departureDate, setFlights]);

  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights];

    // Apply filters
    if (filters.directOnly) {
      result = result.filter((f) => f.stops === 0);
    }
    if (filters.refundableOnly) {
      result = result.filter((f) => f.refundable);
    }
    if (filters.withBaggage) {
      result = result.filter((f) => parseInt(f.baggage.checked) >= 20);
    }
    if (filters.airlines.length > 0) {
      result = result.filter((f) => filters.airlines.includes(f.airline));
    }
    result = result.filter(
      (f) => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    );

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'arrival':
          return a.arrivalTime.localeCompare(b.arrivalTime);
        default:
          return 0;
      }
    });

    return result;
  }, [flights, filters, sortBy]);

  const handleBookNow = (flight: Flight) => {
    setSelectedFlight(flight);
    const booking = {
      id: `BK${Date.now()}`,
      type: 'flight' as const,
      status: 'pending' as const,
      bookingDate: new Date().toISOString(),
      travelDate: departureDate?.toISOString() || '',
      totalAmount: flight.price * travelers,
      currency: flight.currency,
      details: flight,
    };
    setCurrentBooking(booking);
    navigate('/booking');
  };

  const toggleAirline = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    setFilters({ airlines: newAirlines });
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between lg:hidden">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={() => setShowMobileFilters(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Filters */}
      <div>
        <h4 className="font-semibold text-dark mb-3">Quick Filters</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Checkbox
              checked={filters.directOnly}
              onCheckedChange={(checked) => setFilters({ directOnly: checked as boolean })}
            />
            <span className="text-sm">Direct flights only</span>
          </label>
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Checkbox
              checked={filters.refundableOnly}
              onCheckedChange={(checked) => setFilters({ refundableOnly: checked as boolean })}
            />
            <span className="text-sm">Refundable tickets</span>
          </label>
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Checkbox
              checked={filters.withBaggage}
              onCheckedChange={(checked) => setFilters({ withBaggage: checked as boolean })}
            />
            <span className="text-sm">With checked baggage</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-dark mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ priceRange: value as [number, number] })}
            max={500000}
            step={5000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>PKR {filters.priceRange[0].toLocaleString()}</span>
            <span>PKR {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Airlines */}
      <div>
        <h4 className="font-semibold text-dark mb-3">Airlines</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {airlines.slice(0, 8).map((airline) => (
            <label
              key={airline.name}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Checkbox
                checked={filters.airlines.includes(airline.name)}
                onCheckedChange={() => toggleAirline(airline.name)}
              />
              <img
                src={airline.logo}
                alt={airline.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${airline.name}&background=random&size=24`;
                }}
              />
              <span className="text-sm">{airline.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        onClick={() => setFilters({
          directOnly: false,
          refundableOnly: false,
          withBaggage: false,
          airlines: [],
          priceRange: [0, 500000],
          departureTime: null,
        })}
        className="w-full"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Summary */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{from}</span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-lg">{to}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300" />
              <div className="text-sm text-gray-600">
                {departureDate && format(departureDate, 'EEE, MMM d')} • {travelers} Traveler{travelers > 1 ? 's' : ''} • {travelClass}
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Modify Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl shadow-card p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <p className="text-gray-600">
                  {loading ? 'Searching flights...' : `${filteredAndSortedFlights.length} flights found`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <ArrowUpDown className="w-4 h-4" />
                    <span className="text-sm">
                      {sortOptions.find((o) => o.key === sortBy)?.label}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-dropdown opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setSortBy(option.key as typeof sortBy)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                          sortBy === option.key ? 'text-primary bg-primary/5' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Cards */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : filteredAndSortedFlights.length === 0 ? (
              <div className="bg-white rounded-xl shadow-card p-12 text-center">
                <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">No flights found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                  >
                    {/* Flight Header */}
                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Airline Info */}
                        <div className="flex items-center gap-3 lg:w-48">
                          <img
                            src={flight.airlineLogo}
                            alt={flight.airline}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${flight.airline}&background=random`;
                            }}
                          />
                          <div>
                            <p className="font-semibold text-dark">{flight.airline}</p>
                            <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                          </div>
                        </div>

                        {/* Flight Times */}
                        <div className="flex-1 flex items-center justify-center gap-6">
                          <div className="text-center">
                            <p className="text-xl font-bold text-dark">{flight.departureTime}</p>
                            <p className="text-sm text-gray-500">{from}</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-500">{flight.duration}</p>
                            <div className="w-24 h-px bg-gray-300 relative my-1">
                              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-300 rounded-full" />
                            </div>
                            <p className="text-xs text-primary">
                              {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-dark">{flight.arrivalTime}</p>
                            <p className="text-sm text-gray-500">{to}</p>
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2 lg:w-40">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              Rs {flight.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">per person</p>
                          </div>
                          <Button
                            onClick={() => handleBookNow(flight)}
                            className="bg-primary hover:bg-primary-dark"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Luggage className="w-4 h-4" />
                        <span>Cabin: {flight.baggage.cabin}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Luggage className="w-4 h-4" />
                        <span>Checked: {flight.baggage.checked}</span>
                      </div>
                      {flight.refundable && (
                        <div className="flex items-center gap-1 text-green-600">
                          <RotateCcw className="w-4 h-4" />
                          <span>Refundable</span>
                        </div>
                      )}
                      <div className="ml-auto text-gray-500">
                        {flight.seatsAvailable} seats left
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-5 overflow-y-auto animate-slide-up">
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
