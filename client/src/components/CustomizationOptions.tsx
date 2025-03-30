import React from 'react';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { PlateCustomization } from '@/lib/types';

interface CustomizationOptionsProps {
  customization: PlateCustomization;
  setCustomization: React.Dispatch<React.SetStateAction<PlateCustomization>>;
  plateSelectionOptions: any[];
  plateTypeOptions: any[];
  badgeOptions: any[];
  badgeColorOptions: any[];
  textStyleOptions: any[];
  borderColorOptions: any[];
  plateSurroundOptions: any[];
}

export default function CustomizationOptions({
  customization,
  setCustomization,
  plateSelectionOptions,
  plateTypeOptions,
  badgeOptions,
  badgeColorOptions,
  textStyleOptions,
  borderColorOptions,
  plateSurroundOptions
}: CustomizationOptionsProps) {
  
  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization(prev => ({
      ...prev,
      registrationNumber: e.target.value.toUpperCase()
    }));
  };
  
  const handlePlateSelectionChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      plateSelection: value
    }));
  };
  
  const handlePlateTypeChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      plateType: value
    }));
  };
  
  const handleBadgeChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      badge: value
    }));
  };
  
  const handleBadgeColorChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      badgeColor: value
    }));
  };
  
  const handleTextStyleChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      textStyle: value
    }));
  };
  
  const handleBorderColorChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      borderColor: value
    }));
  };
  
  const handlePlateSurroundChange = (value: string) => {
    setCustomization(prev => ({
      ...prev,
      plateSurround: value
    }));
  };
  
  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Registration Number */}
      <div className="p-4 border-b border-primary-700">
        <h3 className="font-semibold text-white mb-2">Your Registration</h3>
        <Input 
          type="text" 
          id="registration-number" 
          className="w-full px-3 py-2 border border-primary-700 bg-white/10 text-white rounded focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent uppercase"
          placeholder="Enter registration"
          maxLength={10}
          value={customization.registrationNumber}
          onChange={handleRegistrationChange}
        />
      </div>
      
      {/* Plate Selection */}
      <div className="p-4 border-b border-primary-700">
        <div className="grid grid-cols-3 gap-2">
          {plateSelectionOptions.map((option) => (
            <div key={option.value} className="relative">
              <input 
                type="radio" 
                id={`plate-${option.value}`} 
                name="plate-selection" 
                value={option.value} 
                className="sr-only peer"
                checked={customization.plateSelection === option.value}
                onChange={() => handlePlateSelectionChange(option.value)}
              />
              <label 
                htmlFor={`plate-${option.value}`} 
                className="block p-2 border border-primary-700 bg-primary-700 rounded cursor-pointer text-center transition peer-checked:bg-white peer-checked:text-primary hover:bg-primary-600"
              >
                <span className="font-medium text-sm">{option.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Plate Type */}
      <div className="p-4 border-b border-primary-700">
        <h3 className="font-semibold text-white mb-2">Plate Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {plateTypeOptions.map((option) => (
            <div key={option.style} className="relative">
              <input 
                type="radio" 
                id={`plate-type-${option.style}`} 
                name="plate-type" 
                value={option.style} 
                className="sr-only peer"
                checked={customization.plateType === option.style}
                onChange={() => handlePlateTypeChange(option.style)}
              />
              <label 
                htmlFor={`plate-type-${option.style}`} 
                className="block p-2 border border-primary-700 bg-primary-700 rounded cursor-pointer text-center transition peer-checked:bg-white peer-checked:text-primary hover:bg-primary-600"
              >
                <span className="font-medium text-sm">{option.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Text Style */}
      <div className="p-4 border-b border-primary-700">
        <h3 className="font-semibold text-white mb-2">Text Style</h3>
        <div className="grid grid-cols-2 gap-2">
          {textStyleOptions.map((option) => (
            <div key={option.style} className="relative">
              <input 
                type="radio" 
                id={`text-${option.style}`} 
                name="text-style" 
                value={option.style} 
                className="sr-only peer"
                checked={customization.textStyle === option.style}
                onChange={() => handleTextStyleChange(option.style)}
              />
              <label 
                htmlFor={`text-${option.style}`} 
                className="block p-2 border border-primary-700 bg-primary-700 rounded cursor-pointer text-center transition peer-checked:bg-white peer-checked:text-primary hover:bg-primary-600"
              >
                <span className="font-medium text-sm">{option.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badge Selection and Colors */}
      <div className="p-4 border-b border-primary-700">
        <h3 className="font-semibold text-white mb-2">Badges & Colours</h3>
        
        {/* Badge Options */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {badgeOptions.map((option) => (
            <div key={option.code} className="relative">
              <input 
                type="radio" 
                id={`badge-${option.code}`} 
                name="badge-selection" 
                value={option.code} 
                className="sr-only peer"
                checked={customization.badge === option.code}
                onChange={() => handleBadgeChange(option.code)}
              />
              <label 
                htmlFor={`badge-${option.code}`} 
                className={`block p-1 border border-white/30 rounded cursor-pointer transition peer-checked:border-white text-center ${option.code === customization.badge ? 'bg-white/20' : 'bg-primary-800'}`}
              >
                {option.code === 'none' ? (
                  <div className="w-full h-8 flex items-center justify-center text-xs">NONE</div>
                ) : (
                  <div className="w-full h-8 flex items-center justify-center text-xs">
                    {option.code.toUpperCase()}
                  </div>
                )}
              </label>
            </div>
          ))}
        </div>
        
        {/* Badge Colors */}
        {customization.badge !== 'none' && (
          <div className="grid grid-cols-4 gap-2">
            {badgeColorOptions.map((option) => (
              <div key={option.hexCode} className="relative">
                <input 
                  type="radio" 
                  id={`badge-color-${option.name.toLowerCase()}`} 
                  name="badge-color" 
                  value={option.hexCode} 
                  className="sr-only peer"
                  checked={customization.badgeColor === option.hexCode}
                  onChange={() => handleBadgeColorChange(option.hexCode)}
                />
                <label 
                  htmlFor={`badge-color-${option.name.toLowerCase()}`} 
                  className="block w-full h-8 rounded cursor-pointer transition border-2 border-transparent peer-checked:border-white"
                  style={{ backgroundColor: option.hexCode }}
                ></label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Border Color */}
      <div className="p-4 border-b border-primary-700">
        <h3 className="font-semibold text-white mb-2">Border Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {borderColorOptions.map((option) => (
            <div key={option.hexCode} className="relative">
              <input 
                type="radio" 
                id={`border-${option.name.toLowerCase()}`} 
                name="border-color" 
                value={option.hexCode} 
                className="sr-only peer"
                checked={customization.borderColor === option.hexCode}
                onChange={() => handleBorderColorChange(option.hexCode)}
              />
              <label 
                htmlFor={`border-${option.name.toLowerCase()}`} 
                className="block w-full h-8 rounded cursor-pointer transition border-2 border-transparent peer-checked:border-white"
                style={{ backgroundColor: option.hexCode }}
              ></label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Plate Surround */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2">Plate Surround</h3>
        <div className="grid grid-cols-2 gap-2">
          {plateSurroundOptions.map((option) => (
            <div key={option.style} className="relative">
              <input 
                type="radio" 
                id={`surround-${option.style}`} 
                name="plate-surround" 
                value={option.style} 
                className="sr-only peer"
                checked={customization.plateSurround === option.style}
                onChange={() => handlePlateSurroundChange(option.style)}
              />
              <label 
                htmlFor={`surround-${option.style}`} 
                className="block p-2 border border-primary-700 bg-primary-700 rounded cursor-pointer text-center transition peer-checked:bg-white peer-checked:text-primary hover:bg-primary-600"
              >
                <span className="font-medium text-sm">{option.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
