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
        return 'license-plate-3d';
      case 'carbon':
        return 'license-plate-carbon';
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
    <div className="flex flex-col items-center w-full">
      {/* Standard white plate preview */}
      <div className="w-full mb-4 p-2 bg-white rounded-md">
        <div 
          className="font-license-plate bg-white text-black border-4 rounded-md p-5 mx-auto max-w-lg flex flex-col items-center relative overflow-hidden"
          style={{ borderColor: customization.borderColor }}
        >
          {/* Badge area */}
          {customization.badge !== 'none' && (
            <div className="absolute left-2 top-0 bottom-0 flex items-center">
              <div 
                className={`w-12 h-16 rounded-sm flex flex-col items-center justify-center text-xs ${badgeTextColor}`}
                style={{ backgroundColor: customization.badgeColor }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/800px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="UK Flag" className="w-9 h-5 mb-1" />
                <span className="font-bold">UK</span>
              </div>
            </div>
          )}
          
          {/* Registration number */}
          <div className="text-center ml-8">
            <div className={`text-5xl font-black tracking-wider ${getTextStyleClasses()} text-neutral-800`}>
              {customization.registrationNumber || 'YOUR REG'}
            </div>
          </div>
          
          {/* Plate surround */}
          <div 
            className="absolute inset-0 border-2 pointer-events-none" 
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
      
      {/* Yellow plate preview */}
      <div className="w-full mb-8 p-2 bg-white rounded-md">
        <div 
          className="font-license-plate bg-yellow-300 text-black border-4 rounded-md p-5 mx-auto max-w-lg flex flex-col items-center relative overflow-hidden"
          style={{ borderColor: customization.borderColor }}
        >
          {/* Badge area */}
          {customization.badge !== 'none' && (
            <div className="absolute left-2 top-0 bottom-0 flex items-center">
              <div 
                className={`w-12 h-16 rounded-sm flex flex-col items-center justify-center text-xs ${badgeTextColor}`}
                style={{ backgroundColor: customization.badgeColor }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/800px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="UK Flag" className="w-9 h-5 mb-1" />
                <span className="font-bold">UK</span>
              </div>
            </div>
          )}
          
          {/* Registration number */}
          <div className="text-center ml-8">
            <div className={`text-5xl font-black tracking-wider ${getTextStyleClasses()} text-neutral-800`}>
              {customization.registrationNumber || 'YOUR REG'}
            </div>
          </div>
          
          {/* Plate surround */}
          <div 
            className="absolute inset-0 border-2 pointer-events-none" 
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
      
      {/* Price and checkout button */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">
          Price: {formatPrice(totalPrice)}
        </div>
        
        <button 
          onClick={onCheckout}
          className="bg-primary hover:bg-primary/90 text-white py-3 px-10 rounded-md font-semibold transition-colors shadow-md"
        >
          BUY NOW
        </button>
      </div>
      
      {/* Order summary details (collapsed by default) */}
      <div className="w-full border border-neutral-200 rounded-md p-4 mt-4">
        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between py-1 text-sm">
            <span className="text-neutral-600">{item.name}</span>
            <span className="font-medium">{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
