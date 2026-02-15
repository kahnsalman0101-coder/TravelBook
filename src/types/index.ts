export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  stopLocations?: string[];
  baggage: {
    cabin: string;
    checked: string;
  };
  refundable: boolean;
  seatsAvailable: number;
  class: 'Economy' | 'Business' | 'First';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  images: string[];
  amenities: string[];
  description: string;
  stars: number;
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  inclusions: string[];
  rating: number;
  reviews: number;
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  travelDate: string;
  totalAmount: number;
  currency: string;
  details: Flight | Hotel | Package;
  passengers?: Passenger[];
}

export interface Passenger {
  id: string;
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  bookings: Booking[];
}

export interface SearchFilters {
  directOnly: boolean;
  refundableOnly: boolean;
  withBaggage: boolean;
  airlines: string[];
  priceRange: [number, number];
  departureTime: 'morning' | 'afternoon' | 'evening' | 'night' | null;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image: string;
  code: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  startingPrice: number;
  currency: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
}
