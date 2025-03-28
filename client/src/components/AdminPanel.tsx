import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOrders from './AdminOrders';
import AdminOptions from './AdminOptions';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800">Admin Panel</h1>
        <p className="text-neutral-600 mt-2">Manage license plate options and view orders</p>
      </header>
      
      <Tabs defaultValue="orders" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
          <TabsTrigger value="options" className="flex-1">Customization Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <AdminOrders />
        </TabsContent>
        
        <TabsContent value="options">
          <AdminOptions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
