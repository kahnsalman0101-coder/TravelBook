import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  CreditCard,
  Check,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchStore, useFlightResultsStore, useBookingStore } from '@/store';
import { format } from 'date-fns';

type TitleType = 'Mr' | 'Mrs' | 'Ms' | 'Dr';

interface PassengerForm {
  title: TitleType;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
}

export default function Booking() {
  const navigate = useNavigate();
  const { from, to, departureDate, travelers, travelClass } = useSearchStore();
  const { selectedFlight } = useFlightResultsStore();
  const { setPassengers, setContactEmail, setContactPhone } = useBookingStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [passengerForms, setPassengerForms] = useState<PassengerForm[]>(
    Array(travelers).fill(null).map(() => ({
      title: 'Mr',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
    }))
  );

  if (!selectedFlight) {
    navigate('/flight-results');
    return null;
  }

  const totalPrice = selectedFlight.price * travelers;

  const handlePassengerChange = (index: number, field: keyof PassengerForm, value: string) => {
    const updated = [...passengerForms];
    if (field === 'title') {
      updated[index] = { ...updated[index], [field]: value as TitleType };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setPassengerForms(updated);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setContactEmail(contactInfo.email);
      setContactPhone(contactInfo.phone);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const passengers = passengerForms.map((form, index) => ({
        id: `PAX${index + 1}`,
        ...form,
      }));
      setPassengers(passengers);
      setCurrentStep(3);
    }
  };

  const isStep1Valid = contactInfo.email && contactInfo.phone;
  const isStep2Valid = passengerForms.every(
    (p) => p.firstName && p.lastName && p.dateOfBirth && p.nationality
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {['Contact', 'Passengers', 'Payment'].map((step, index) => {
              const stepNum = index + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`flex flex-col items-center ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                      isActive ? 'bg-primary text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                    </div>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                  {index < 2 && (
                    <div className={`w-20 h-1 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-card p-6 animate-slide-up">
                <h2 className="text-xl font-bold text-dark mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Booking confirmation will be sent to this email</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!isStep1Valid}
                  className="w-full mt-6 bg-primary hover:bg-primary-dark"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                {passengerForms.map((passenger, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-card p-6">
                    <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Passenger {index + 1}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title *</Label>
                        <select
                          value={passenger.title}
                          onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                          className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                        </select>
                      </div>
                      <div>
                        <Label>First Name *</Label>
                        <Input
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                          placeholder="As per passport"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                          placeholder="As per passport"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Date of Birth *</Label>
                        <Input
                          type="date"
                          value={passenger.dateOfBirth}
                          onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Nationality *</Label>
                        <Input
                          value={passenger.nationality}
                          onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                          placeholder="e.g. Pakistani"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Passport Number</Label>
                        <Input
                          value={passenger.passportNumber}
                          onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                          placeholder="Optional for domestic"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleContinue}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-primary hover:bg-primary-dark"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-card p-6 animate-slide-up">
                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* Payment Options */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Credit/Debit Card', 'Easypaisa', 'JazzCash'].map((method) => (
                      <label
                        key={method}
                        className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <input type="radio" name="payment" className="hidden" defaultChecked={method === 'Credit/Debit Card'} />
                        <CreditCard className="w-8 h-8 text-primary" />
                        <span className="font-medium text-sm">{method}</span>
                      </label>
                    ))}
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label>Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" className="mt-1.5" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" className="mt-1.5" />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input placeholder="123" className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label>Cardholder Name</Label>
                      <Input placeholder="Name on card" className="mt-1.5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg mt-4">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">Your payment is secured with 256-bit SSL encryption</span>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => navigate('/booking-confirmation')}
                      className="flex-1 bg-primary hover:bg-primary-dark"
                    >
                      Pay Rs {totalPrice.toLocaleString()}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <h3 className="font-bold text-lg text-dark mb-4">Booking Summary</h3>
              
              {/* Flight Details */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={selectedFlight.airlineLogo}
                    alt={selectedFlight.airline}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedFlight.airline}&background=random`;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-sm">{selectedFlight.airline}</p>
                    <p className="text-xs text-gray-500">{selectedFlight.flightNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-bold">{selectedFlight.departureTime}</p>
                    <p className="text-gray-500">{from}</p>
                  </div>
                  <Plane className="w-4 h-4 text-gray-400" />
                  <div className="text-right">
                    <p className="font-bold">{selectedFlight.arrivalTime}</p>
                    <p className="text-gray-500">{to}</p>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <p>{format(departureDate || new Date(), 'EEE, MMM d, yyyy')}</p>
                  <p>{travelClass} • {travelers} Passenger{travelers > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base fare ({travelers} x Rs {selectedFlight.price.toLocaleString()})</span>
                  <span>Rs {(selectedFlight.price * travelers).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-dark">Total Amount</span>
                  <span className="font-bold text-primary text-lg">Rs {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-xs text-gray-600">Protected by AirVista Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
