import React from 'react';
import { formatPrice, isColorDark } from '@/lib/utils';
import { PlateCustomization, OrderItem } from '@/lib/types';

interface PlatePreviewProps {
  customization: PlateCustomization;
  orderItems: OrderItem[];
  totalPrice: number;
  onCheckout: () => void;
}

export default function PlatePreview({
  customization,
  orderItems,
  totalPrice,
  onCheckout
}: PlatePreviewProps) {
  // Determine text color for badge based on background color
  const badgeTextColor = isColorDark(customization.badgeColor) ? 'text-white' : 'text-black';
  
  // Determine text style classes
  const getTextStyleClasses = () => {
    switch (customization.textStyle) {
      case '3d':
        return 'font-bold';
      case 'carbon':
        return 'italic';
      default:
        return '';
    }
  };
  
  // Determine plate color
  const getPlateBackground = () => {
    switch (customization.plateType) {
      case 'electric':
        return 'bg-green-600';
      default:
        return 'bg-primary';
    }
  };
  
  return (
    <div className="lg:w-2/5 order-2 lg:order-1 sticky top-8 h-fit">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-neutral-800">Live Preview</h2>
        <div className="bg-neutral-100 p-4 rounded-md mb-4">
          <div 
            className={`font-license-plate ${getPlateBackground()} text-white border-4 rounded p-6 mx-auto max-w-md flex flex-col items-center relative overflow-hidden`}
            style={{ borderColor: customization.borderColor }}
          >
            {/* Badge area */}
            {customization.badge !== 'none' && (
              <div className="absolute left-4 top-0 bottom-0 flex items-center">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xs ${badgeTextColor}`}
                  style={{ backgroundColor: customization.badgeColor }}
                >
                  {customization.badge.toUpperCase()}
                </div>
              </div>
            )}
            
            {/* Registration number */}
            <div className="text-center">
              <div className={`text-4xl font-bold tracking-wider ${getTextStyleClasses()}`}>
                {customization.registrationNumber || 'AB12 CDE'}
              </div>
            </div>
            
            {/* Plate surround */}
            <div 
              className="absolute inset-0 border-8 pointer-events-none" 
              style={{ 
                borderColor: 
                  customization.plateSurround === 'none' 
                    ? 'transparent' 
                    : customization.plateSurround === 'standard' 
                      ? '#CED4DA' 
                      : customization.borderColor 
              }}
            ></div>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-md">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between py-1 text-sm">
              <span className="text-neutral-600">{item.name}</span>
              <span className="font-medium">{formatPrice(item.price)}</span>
            </div>
          ))}
          <div className="border-t border-neutral-200 mt-2 pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onCheckout}
        className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-semibold transition shadow-md flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        Proceed to Checkout
      </button>
    </div>
  );
}
