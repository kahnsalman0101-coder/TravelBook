import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Share2, Plane, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchStore, useFlightResultsStore, useBookingStore } from '@/store';
import { airports } from '@/data/airports';
import { format } from 'date-fns';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { from, to, departureDate, travelers, travelClass } = useSearchStore();
  const { selectedFlight } = useFlightResultsStore();
  const { passengers, contactEmail } = useBookingStore();

  useEffect(() => {
    if (!selectedFlight) {
      navigate('/');
    }
  }, [selectedFlight, navigate]);

  if (!selectedFlight) return null;

  const fromAirport = airports.find((a) => a.code === from);
  const toAirport = airports.find((a) => a.code === to);
  const bookingId = `TB${Date.now().toString(36).toUpperCase()}`;
  const totalPrice = selectedFlight.price * travelers;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your booking has been confirmed and e-tickets sent to {contactEmail}</p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-slide-up">
          {/* Booking Header */}
          <div className="bg-primary p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-white/80 text-sm">Booking Reference</p>
                <p className="text-2xl font-bold">{bookingId}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Total Paid</p>
                <p className="text-2xl font-bold">Rs {totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Flight Details
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedFlight.airlineLogo}
                  alt={selectedFlight.airline}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedFlight.airline}&background=random`;
                  }}
                />
                <div>
                  <p className="font-bold text-dark">{selectedFlight.airline}</p>
                  <p className="text-sm text-gray-500">{selectedFlight.flightNumber} • {travelClass}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark">{selectedFlight.departureTime}</p>
                  <p className="text-sm text-gray-500">{from}</p>
                  <p className="text-xs text-gray-400">{fromAirport?.city}</p>
                </div>
                <div className="flex-1 px-4">
                  <div className="text-center text-xs text-gray-400 mb-1">{selectedFlight.duration}</div>
                  <div className="h-px bg-gray-300 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                    <Plane className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                  <div className="text-center text-xs text-primary mt-1">
                    {selectedFlight.stops === 0 ? 'Direct' : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? 's' : ''}`}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark">{selectedFlight.arrivalTime}</p>
                  <p className="text-sm text-gray-500">{to}</p>
                  <p className="text-xs text-gray-400">{toAirport?.city}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(departureDate || new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Passengers
            </h3>
            <div className="space-y-2">
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-dark">{passenger.title} {passenger.firstName} {passenger.lastName}</p>
                      <p className="text-xs text-gray-500">{passenger.nationality}</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Confirmed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="flex-col h-auto py-3">
                <Download className="w-5 h-5 mb-1" />
                <span className="text-xs">E-Ticket</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-3">
                <Mail className="w-5 h-5 mb-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-3">
                <Share2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Share</span>
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="flex-col h-auto py-3 bg-primary hover:bg-primary-dark"
              >
                <Plane className="w-5 h-5 mb-1" />
                <span className="text-xs">Book More</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>A confirmation email has been sent to {contactEmail}</p>
          <p className="mt-1">For any queries, contact us at <a href="tel:03405603070" className="text-primary">0340 5603070</a></p>
        </div>
      </div>
    </div>
  );
}
