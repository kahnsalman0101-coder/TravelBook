import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Flight, User, Booking, SearchFilters, Passenger } from '@/types';

interface SearchState {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  travelers: number;
  travelClass: 'Economy' | 'Business' | 'First';
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setDepartureDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  setTravelers: (count: number) => void;
  setTravelClass: (travelClass: 'Economy' | 'Business' | 'First') => void;
  setTripType: (type: 'one-way' | 'round-trip' | 'multi-city') => void;
  swapLocations: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  from: '',
  to: '',
  departureDate: null,
  returnDate: null,
  travelers: 1,
  travelClass: 'Economy',
  tripType: 'round-trip',
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setDepartureDate: (date) => set({ departureDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),
  setTravelers: (count) => set({ travelers: count }),
  setTravelClass: (travelClass) => set({ travelClass }),
  setTripType: (type) => set({ tripType: type }),
  swapLocations: () => set((state) => ({ from: state.to, to: state.from })),
}));

interface FlightResultsState {
  flights: Flight[];
  filters: SearchFilters;
  sortBy: 'price' | 'duration' | 'departure' | 'arrival';
  selectedFlight: Flight | null;
  setFlights: (flights: Flight[]) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSortBy: (sort: 'price' | 'duration' | 'departure' | 'arrival') => void;
  setSelectedFlight: (flight: Flight | null) => void;
  resetFilters: () => void;
}

export const useFlightResultsStore = create<FlightResultsState>((set) => ({
  flights: [],
  filters: {
    directOnly: false,
    refundableOnly: false,
    withBaggage: false,
    airlines: [],
    priceRange: [0, 500000],
    departureTime: null,
  },
  sortBy: 'price',
  selectedFlight: null,
  setFlights: (flights) => set({ flights }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  resetFilters: () => set({
    filters: {
      directOnly: false,
      refundableOnly: false,
      withBaggage: false,
      airlines: [],
      priceRange: [0, 500000],
      departureTime: null,
    },
  }),
}));

interface BookingState {
  currentBooking: Booking | null;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  setCurrentBooking: (booking: Booking | null) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setContactEmail: (email: string) => void;
  setContactPhone: (phone: string) => void;
  addPassenger: (passenger: Passenger) => void;
  removePassenger: (id: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  passengers: [],
  contactEmail: '',
  contactPhone: '',
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  setPassengers: (passengers) => set({ passengers }),
  setContactEmail: (email) => set({ contactEmail: email }),
  setContactPhone: (phone) => set({ contactPhone: phone }),
  addPassenger: (passenger) => set((state) => ({ passengers: [...state.passengers, passenger] })),
  removePassenger: (id) => set((state) => ({ passengers: state.passengers.filter((p) => p.id !== id) })),
  resetBooking: () => set({ currentBooking: null, passengers: [], contactEmail: '', contactPhone: '' }),
}));

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } as User : null,
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface UIState {
  isHeaderScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  setHeaderScrolled: (scrolled: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isHeaderScrolled: false,
  isMobileMenuOpen: false,
  activeModal: null,
  setHeaderScrolled: (scrolled) => set({ isHeaderScrolled: scrolled }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
}));
