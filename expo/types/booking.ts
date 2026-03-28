export interface BookingData {
  id: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
  numberOfChildren: number;
  childrenAges: string;
  specialRequests?: string;
  createdAt: string;
}

export interface TimeSlot {
  value: string;
  label: string;
  available: boolean;
}
