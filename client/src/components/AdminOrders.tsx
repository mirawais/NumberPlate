import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders']
  });
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    order.customization.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };
  
  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };
  
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Order Responses</h2>
        <div className="w-1/3">
          <Input
            placeholder="Search by order ID or registration"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customization.registrationNumber}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewOrderDetails(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-neutral-500">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id} Details</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-1">Order Information</h3>
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                    {selectedOrder.paymentId && <p><strong>Payment ID:</strong> {selectedOrder.paymentId}</p>}
                    <p><strong>Total:</strong> {formatPrice(selectedOrder.totalPrice)}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-1">Customization Details</h3>
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <p><strong>Registration:</strong> {selectedOrder.customization.registrationNumber}</p>
                    <p><strong>Plate Selection:</strong> {selectedOrder.customization.plateSelection}</p>
                    <p><strong>Plate Type:</strong> {selectedOrder.customization.plateType}</p>
                    <p><strong>Badge:</strong> {selectedOrder.customization.badge}</p>
                    <p><strong>Badge Color:</strong> {selectedOrder.customization.badgeColor}</p>
                    <p><strong>Text Style:</strong> {selectedOrder.customization.textStyle}</p>
                    <p><strong>Border Color:</strong> {selectedOrder.customization.borderColor}</p>
                    <p><strong>Plate Surround:</strong> {selectedOrder.customization.plateSurround}</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-neutral-500 mb-1">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell className="text-right font-semibold">{formatPrice(selectedOrder.totalPrice)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
