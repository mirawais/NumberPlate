import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import PlatePreview from './PlatePreview';
import CustomizationOptions from './CustomizationOptions';
import { calculateTotalPrice } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { PlateCustomization, OrderItem } from '@/lib/types';

export default function LicensePlateCustomizer() {
  const [, navigate] = useLocation();

  // Initial state
  const [plateCustomization, setPlateCustomization] = useState<PlateCustomization>({
    registrationNumber: 'AB12 CDE',
    plateSelection: 'front',
    plateType: 'standard',
    badge: 'gb',
    badgeColor: '#FFD700',
    textStyle: 'standard',
    borderColor: '#FFD700',
    plateSurround: 'none'
  });
  
  const { data: plateSelectionOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/plate-selections'] 
  });

  const { data: plateTypeOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/plate-types'] 
  });

  const { data: badgeOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/badges'] 
  });

  const { data: badgeColorOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/badge-colors'] 
  });

  const { data: textStyleOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/text-styles'] 
  });

  const { data: borderColorOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/border-colors'] 
  });

  const { data: plateSurroundOptions = [] } = useQuery<any[]>({ 
    queryKey: ['/api/options/plate-surrounds'] 
  });

  // Calculate item prices
  const getSelectedOption = (options: any[], value: string) => {
    return options.find(option => option.value === value || option.style === value);
  };

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (
      (plateSelectionOptions as any[]).length && 
      (plateTypeOptions as any[]).length && 
      (badgeOptions as any[]).length && 
      (textStyleOptions as any[]).length && 
      (plateSurroundOptions as any[]).length
    ) {
      const selectedPlateSelection = getSelectedOption(plateSelectionOptions as any[], plateCustomization.plateSelection);
      const selectedPlateType = getSelectedOption(plateTypeOptions as any[], plateCustomization.plateType);
      const selectedBadge = plateCustomization.badge !== 'none' 
        ? getSelectedOption(badgeOptions as any[], plateCustomization.badge) 
        : { price: 0 };
      const selectedTextStyle = getSelectedOption(textStyleOptions as any[], plateCustomization.textStyle);
      const selectedSurround = getSelectedOption(plateSurroundOptions as any[], plateCustomization.plateSurround);

      // Create order items
      const items: OrderItem[] = [];
      
      // Add plate selection
      if (selectedPlateSelection) {
        items.push({
          id: 1,
          name: selectedPlateSelection.name,
          price: selectedPlateSelection.price
        });
      }
      
      // Add plate type if not standard (which is included)
      if (selectedPlateType && selectedPlateType.price > 0) {
        items.push({
          id: 2,
          name: selectedPlateType.name,
          price: selectedPlateType.price
        });
      }
      
      // Add badge if selected
      if (selectedBadge && plateCustomization.badge !== 'none' && selectedBadge.price > 0) {
        items.push({
          id: 3,
          name: `${selectedBadge.name} Badge`,
          price: selectedBadge.price
        });
      }
      
      // Add text style if not standard
      if (selectedTextStyle && selectedTextStyle.price > 0) {
        items.push({
          id: 4,
          name: `${selectedTextStyle.name} Text Style`,
          price: selectedTextStyle.price
        });
      }
      
      // Add surround if not none
      if (selectedSurround && selectedSurround.price > 0) {
        items.push({
          id: 5,
          name: `${selectedSurround.name} Surround`,
          price: selectedSurround.price
        });
      }
      
      setOrderItems(items);
      
      // Calculate total price
      const total = calculateTotalPrice(
        selectedPlateSelection ? selectedPlateSelection.price : 19.99,
        selectedPlateType ? selectedPlateType.price : 0,
        selectedBadge && plateCustomization.badge !== 'none' ? selectedBadge.price : 0,
        selectedTextStyle ? selectedTextStyle.price : 0,
        selectedSurround ? selectedSurround.price : 0
      );
      
      setTotalPrice(total);
    }
  }, [
    plateCustomization, 
    plateSelectionOptions, 
    plateTypeOptions, 
    badgeOptions, 
    textStyleOptions, 
    plateSurroundOptions
  ]);

  const handleProceedToCheckout = () => {
    // Save current state to session storage for the checkout page
    sessionStorage.setItem('plateCustomization', JSON.stringify(plateCustomization));
    sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
    sessionStorage.setItem('totalPrice', totalPrice.toString());
    
    // Navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-md">
      {/* Left sidebar - Red customization panel */}
      <div className="w-full md:w-80 bg-primary text-white flex flex-col">
        <div className="p-4 bg-primary-900 font-semibold text-lg">
          Select your options
        </div>
        
        {/* Customization Options */}
        <CustomizationOptions 
          customization={plateCustomization}
          setCustomization={setPlateCustomization}
          plateSelectionOptions={plateSelectionOptions as any[]}
          plateTypeOptions={plateTypeOptions as any[]}
          badgeOptions={badgeOptions as any[]}
          badgeColorOptions={badgeColorOptions as any[]}
          textStyleOptions={textStyleOptions as any[]}
          borderColorOptions={borderColorOptions as any[]}
          plateSurroundOptions={plateSurroundOptions as any[]}
        />
      </div>
      
      {/* Right panel - Preview and pricing */}
      <div className="w-full md:flex-1 bg-white p-6">
        <PlatePreview 
          customization={plateCustomization}
          orderItems={orderItems}
          totalPrice={totalPrice}
          onCheckout={handleProceedToCheckout}
        />
      </div>
    </div>
  );
}
