export interface Badge {
  id: number;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

export interface BadgeColor {
  id: number;
  name: string;
  hexCode: string;
}

export interface TextStyle {
  id: number;
  name: string;
  style: string;
  price: number;
}

export interface BorderColor {
  id: number;
  name: string;
  hexCode: string;
}

export interface PlateSurround {
  id: number;
  name: string;
  style: string;
  price: number;
}

export interface PlateType {
  id: number;
  name: string;
  style: string;
  price: number;
}

export interface PlateSelection {
  value: 'front' | 'rear' | 'both';
  name: string;
  price: number;
}

export interface PlateCustomization {
  registrationNumber: string;
  plateSelection: string;
  plateType: string;
  badge: string;
  badgeColor: string;
  textStyle: string;
  borderColor: string;
  plateSurround: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  customization: PlateCustomization;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  createdAt: Date;
}
