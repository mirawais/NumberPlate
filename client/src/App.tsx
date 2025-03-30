import { Switch, Route, useLocation, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Customizer from "@/pages/Customizer";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Admin from "@/pages/Admin";
import { Toaster } from "@/components/ui/toaster";

// Customer-facing Routes
function CustomerRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Number Plate Customizer</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <Switch>
          <Route path="/" component={Customizer} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/confirmation/:orderId" component={OrderConfirmation} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2025 Number Plate Customizer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Admin Routes - Separate view for administration
function AdminRouter() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Number Plate Admin Panel</h1>
          <a href="/" className="text-white hover:text-gray-300 underline">Return to Store</a>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <Admin />
      </main>
      
      <footer className="bg-gray-800 text-white p-2 text-sm">
        <div className="container mx-auto text-center">
          Admin Panel - Restricted Access
        </div>
      </footer>
    </div>
  );
}

// Main Router that decides between customer and admin routes
function Router() {
  const [isAdminRoute] = useRoute('/admin-portal/*');
  const [isAdminRootRoute] = useRoute('/admin-portal');
  
  // If we're at an admin route, show the admin interface
  if (isAdminRoute || isAdminRootRoute) {
    return <AdminRouter />;
  }
  
  // Otherwise show the customer interface
  return <CustomerRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
