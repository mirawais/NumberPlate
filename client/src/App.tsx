import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Customizer from "@/pages/Customizer";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Admin from "@/pages/Admin";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Customizer} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/confirmation/:orderId" component={OrderConfirmation} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
