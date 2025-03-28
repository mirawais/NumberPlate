import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { formatPrice } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { PlateCustomization, OrderItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    paypal: any;
  }
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [customization, setCustomization] = useState<PlateCustomization | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false);
  
  useEffect(() => {
    // Retrieve data from session storage
    const storedCustomization = sessionStorage.getItem('plateCustomization');
    const storedOrderItems = sessionStorage.getItem('orderItems');
    const storedTotalPrice = sessionStorage.getItem('totalPrice');
    
    if (storedCustomization && storedOrderItems && storedTotalPrice) {
      setCustomization(JSON.parse(storedCustomization));
      setOrderItems(JSON.parse(storedOrderItems));
      setTotalPrice(parseFloat(storedTotalPrice));
    } else {
      // If data is missing, go back to the customizer
      navigate('/');
    }
  }, [navigate]);
  
  const createOrderMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await apiRequest('POST', '/api/orders', {
        customization,
        orderItems,
        totalPrice,
        paymentData
      });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been completed!",
        variant: "default"
      });
      navigate(`/confirmation/${data.orderId}`);
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message || "There was an error processing your order.",
        variant: "destructive"
      });
    }
  });
  
  useEffect(() => {
    // Initialize PayPal when customization data is loaded
    if (customization && !paypalButtonRendered && window.paypal) {
      setPaypalButtonRendered(true);
      
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalPrice.toFixed(2),
                currency_code: 'GBP'
              },
              description: `Custom License Plate - ${customization.registrationNumber}`
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            createOrderMutation.mutate({
              paymentId: details.id,
              status: 'completed',
              details
            });
          });
        },
        onError: (err: any) => {
          toast({
            title: "Payment Error",
            description: "There was an error processing your payment.",
            variant: "destructive"
          });
          console.error(err);
        }
      }).render('#paypal-button-container');
    }
  }, [customization, paypalButtonRendered, totalPrice, createOrderMutation, toast]);
  
  // Handle back to customizer
  const handleBackToCustomizer = () => {
    navigate('/');
  };

  if (!customization) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <p>Loading checkout...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-800">Checkout</h1>
        </div>
        <div className="mt-6 bg-neutral-200 h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-2/3 rounded-full"></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-neutral-600">
          <span className="font-medium">1. Customize</span>
          <span className="font-medium text-primary">2. Review</span>
          <span>3. Payment</span>
        </div>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800">Order Summary</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">License Plate Details</h3>
              <div className="bg-neutral-50 p-4 rounded">
                <p><strong>Registration:</strong> {customization.registrationNumber}</p>
                <p><strong>Type:</strong> {customization.plateType === 'standard' ? 'Standard Plate' : 'Electric Car Plate'}</p>
                {customization.badge !== 'none' && <p><strong>Badge:</strong> {customization.badge.toUpperCase()}</p>}
                <p><strong>Text Style:</strong> {
                  customization.textStyle === 'standard' ? 'Standard' : 
                  customization.textStyle === '3d' ? '3D Effect' : 'Carbon'
                }</p>
                <p><strong>Plate Selection:</strong> {
                  customization.plateSelection === 'front' ? 'Front Only' :
                  customization.plateSelection === 'rear' ? 'Rear Only' : 'Both Plates'
                }</p>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-medium mb-2">Price Breakdown</h3>
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
            onClick={handleBackToCustomizer}
            className="text-primary hover:text-primary/80 font-medium py-2 px-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7M5 12h14"/>
            </svg>
            Back to Customizer
          </button>
        </div>
        
        {/* Payment */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800">Payment</h2>
            
            <div className="mb-4">
              <p className="text-neutral-600 mb-4">
                Please complete your payment using one of the following methods:
              </p>
              
              {/* PayPal Button Container */}
              <div id="paypal-button-container" className="mt-4"></div>
              
              {createOrderMutation.isPending && (
                <div className="text-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-neutral-600">Processing your payment...</p>
                </div>
              )}
            </div>
            
            <div className="border-t border-neutral-200 pt-4 mt-4">
              <div className="flex items-center text-sm text-neutral-600">
                <svg className="w-4 h-4 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Secure payment processed through PayPal
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-md text-sm">
            <h3 className="font-medium mb-2">Order Policy</h3>
            <p className="text-neutral-600 mb-2">
              Once your payment is processed, your custom license plate will be manufactured to your specifications.
            </p>
            <p className="text-neutral-600">
              Please note that custom registration plates are non-refundable once production has begun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
