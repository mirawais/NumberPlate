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
    <div className="lg:w-3/5 order-1 lg:order-2">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-neutral-800">Registration Details</h2>
        
        <div className="mb-6">
          <label htmlFor="registration-number" className="block mb-2 font-medium text-neutral-700">
            Registration Number
          </label>
          <Input 
            type="text" 
            id="registration-number" 
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
            placeholder="Enter registration (e.g. AB12 CDE)"
            maxLength={10}
            value={customization.registrationNumber}
            onChange={handleRegistrationChange}
          />
          <p className="mt-2 text-sm text-neutral-600">Please enter a valid UK registration number</p>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Plate Selection</label>
          <div className="grid grid-cols-3 gap-4">
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
                  className="block p-4 border border-neutral-300 rounded-md cursor-pointer transition peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-neutral-50"
                >
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 mb-2 text-neutral-600 peer-checked:text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {option.value === 'front' && <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 9h14M5 4h2m5 0h7"/>}
                      {option.value === 'rear' && <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M9 9a3 3 0 0 0-3 3v3m12-6a3 3 0 0 1 3 3v3"/>}
                      {option.value === 'both' && <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 9h14"/>}
                    </svg>
                    <span className="font-medium">{option.name}</span>
                    <span className="text-sm text-neutral-600 mt-1">{formatPrice(option.price)}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-neutral-800">Plate Appearance</h2>
        
        {/* Plate Type */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Plate Type</label>
          <div className="grid grid-cols-2 gap-4">
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
                  className="block p-4 border border-neutral-300 rounded-md cursor-pointer transition peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-neutral-50"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-full h-12 ${option.style === 'standard' ? 'bg-primary' : 'bg-green-600'} rounded mb-2 text-white flex items-center justify-center font-bold`}>
                      AB12 CDE
                    </div>
                    <span className="font-medium">{option.name}</span>
                    <span className="text-sm text-neutral-600 mt-1">
                      {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Badge Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Badge Selection</label>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6">
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
                  className="block p-3 border border-neutral-300 rounded-md cursor-pointer transition peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-neutral-50"
                >
                  <div className="flex flex-col items-center">
                    {option.code === 'none' ? (
                      <div className="w-10 h-10 bg-neutral-200 rounded-full mb-2 flex items-center justify-center text-neutral-400">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </div>
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-full mb-2 flex items-center justify-center font-bold text-xs text-white"
                        style={{ backgroundColor: option.code === 'gb' ? '#FFD700' : option.code === 'eu' ? '#0055AA' : '#E63946' }}
                      >
                        {option.code.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-center">{option.name}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Badge Background Color */}
        {customization.badge !== 'none' && (
          <div className="mb-6">
            <label className="block mb-2 font-medium text-neutral-700">Badge Background Color</label>
            <div className="grid grid-cols-8 gap-2">
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
                    className="block w-full aspect-square rounded-md cursor-pointer transition border-2 border-transparent peer-checked:border-primary hover:opacity-90"
                    style={{ backgroundColor: option.hexCode }}
                  ></label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Text Style */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Text Style</label>
          <div className="grid grid-cols-3 gap-4">
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
                  className="block p-3 border border-neutral-300 rounded-md cursor-pointer transition peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-neutral-50"
                >
                  <div className="flex flex-col items-center">
                    <span className={`font-license-plate text-2xl mb-2 ${option.style === '3d' ? 'font-bold' : option.style === 'carbon' ? 'italic' : ''}`}>
                      AB12 CDE
                    </span>
                    <span className="text-sm font-medium">{option.name}</span>
                    <span className="text-xs text-neutral-600">
                      {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Border Color */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Border Color</label>
          <div className="grid grid-cols-8 gap-2">
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
                  className="block w-full aspect-square rounded-md cursor-pointer transition border-2 border-transparent peer-checked:border-primary hover:opacity-90"
                  style={{ backgroundColor: option.hexCode }}
                ></label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Plate Surround */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-neutral-700">Plate Surround</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                  className="block p-3 border border-neutral-300 rounded-md cursor-pointer transition peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-neutral-50"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-full h-12 bg-primary rounded flex items-center justify-center text-white font-bold ${
                      option.style === 'standard' ? 'border-4 border-neutral-400' : 
                      option.style === 'premium' ? 'border-4 border-yellow-400' : ''
                    }`}>
                      <span className="text-xs">{option.name}</span>
                    </div>
                    <span className="text-sm font-medium mt-2">{option.name}</span>
                    <span className="text-xs text-neutral-600">
                      {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
