import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/lib/types';

export default function OrderConfirmation() {
  const [, params] = useRoute('/confirmation/:orderId');
  const [, navigate] = useLocation();
  const orderId = params?.orderId;
  
  const { data: order, isLoading, error } = useQuery<Order>({ 
    queryKey: [`/api/orders/${orderId}`],
    enabled: !!orderId
  });
  
  // Clear session storage
  useEffect(() => {
    sessionStorage.removeItem('plateCustomization');
    sessionStorage.removeItem('orderItems');
    sessionStorage.removeItem('totalPrice');
  }, []);
  
  const handleBackToHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Loading order details...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Order Not Found</h1>
        <p className="text-neutral-600 mb-6">We couldn't find the order you're looking for.</p>
        <button 
          onClick={handleBackToHome}
          className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md font-medium"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-800">Order Confirmation</h1>
        </div>
        <div className="mt-6 bg-neutral-200 h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-full rounded-full"></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-neutral-600">
          <span className="font-medium">1. Customize</span>
          <span className="font-medium">2. Review</span>
          <span className="font-medium text-primary">3. Payment</span>
        </div>
      </header>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Order Successful!</h2>
        <p className="text-center text-neutral-600 mb-6">
          Thank you for your order. Your custom license plate is being processed.
        </p>
        
        <div className="border border-neutral-200 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Order Details</h3>
            <span className="text-sm text-neutral-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-600">Order ID:</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-600">Payment Status:</span>
              <span className={`font-medium ${
                order.paymentStatus === 'completed' ? 'text-green-600' : 
                order.paymentStatus === 'pending' ? 'text-orange-600' : 'text-red-600'
              }`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Registration Number:</span>
              <span className="font-medium">{order.customization.registrationNumber}</span>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-4">
            <h4 className="font-medium mb-2">Order Summary</h4>
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">{item.name}</span>
                <span>{formatPrice(item.price)}</span>
              </div>
            ))}
            <div className="border-t border-neutral-200 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-neutral-600 text-sm mb-4">
            We've sent a confirmation email with these details to your email address.
            Your order will be processed within 1-2 working days.
          </p>
          
          <button 
            onClick={handleBackToHome}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md font-medium"
          >
            Create Another License Plate
          </button>
        </div>
      </div>
    </div>
  );
}
