import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the license plate customizer
  const httpServer = createServer(app);

  // Get plate selection options
  app.get('/api/options/plate-selections', (req, res) => {
    res.json(storage.getPlateSelections());
  });

  // Get plate type options
  app.get('/api/options/plate-types', (req, res) => {
    res.json(storage.getPlateTypes());
  });

  // Get badge options
  app.get('/api/options/badges', (req, res) => {
    res.json(storage.getBadges());
  });

  // Get badge color options
  app.get('/api/options/badge-colors', (req, res) => {
    res.json(storage.getBadgeColors());
  });

  // Get text style options
  app.get('/api/options/text-styles', (req, res) => {
    res.json(storage.getTextStyles());
  });

  // Get border color options
  app.get('/api/options/border-colors', (req, res) => {
    res.json(storage.getBorderColors());
  });

  // Get plate surround options
  app.get('/api/options/plate-surrounds', (req, res) => {
    res.json(storage.getPlateSurrounds());
  });

  // Create a new order
  app.post('/api/orders', async (req, res) => {
    try {
      const { customization, orderItems, totalPrice, paymentData } = req.body;
      
      // Process payment status based on PayPal response
      const paymentStatus = paymentData?.status || 'pending';
      const paymentId = paymentData?.paymentId || null;
      
      const order = await storage.createOrder({
        customization,
        orderItems, 
        totalPrice,
        paymentStatus,
        paymentId
      });
      
      res.status(201).json({ 
        success: true, 
        orderId: order.id, 
        message: 'Order created successfully' 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create order' 
      });
    }
  });

  // Get a specific order
  app.get('/api/orders/:id', async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: 'Order not found' 
        });
      }
      
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch order' 
      });
    }
  });

  // Admin routes

  // Get all orders (for admin)
  app.get('/api/admin/orders', async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch orders' 
      });
    }
  });

  // Admin routes for customization options

  // Badge management
  app.get('/api/admin/options/badges', (req, res) => {
    res.json(storage.getBadges());
  });

  app.post('/api/admin/options/badges', async (req, res) => {
    try {
      const badge = await storage.createBadge(req.body);
      res.status(201).json(badge);
    } catch (error) {
      console.error('Error creating badge:', error);
      res.status(500).json({ success: false, message: 'Failed to create badge' });
    }
  });

  app.patch('/api/admin/options/badges/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const badge = await storage.updateBadge(id, req.body);
      res.json(badge);
    } catch (error) {
      console.error('Error updating badge:', error);
      res.status(500).json({ success: false, message: 'Failed to update badge' });
    }
  });

  // Badge color management
  app.get('/api/admin/options/badge-colors', (req, res) => {
    res.json(storage.getBadgeColors());
  });

  app.post('/api/admin/options/badge-colors', async (req, res) => {
    try {
      const badgeColor = await storage.createBadgeColor(req.body);
      res.status(201).json(badgeColor);
    } catch (error) {
      console.error('Error creating badge color:', error);
      res.status(500).json({ success: false, message: 'Failed to create badge color' });
    }
  });

  app.patch('/api/admin/options/badge-colors/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const badgeColor = await storage.updateBadgeColor(id, req.body);
      res.json(badgeColor);
    } catch (error) {
      console.error('Error updating badge color:', error);
      res.status(500).json({ success: false, message: 'Failed to update badge color' });
    }
  });

  // Text style management
  app.get('/api/admin/options/text-styles', (req, res) => {
    res.json(storage.getTextStyles());
  });

  app.post('/api/admin/options/text-styles', async (req, res) => {
    try {
      const textStyle = await storage.createTextStyle(req.body);
      res.status(201).json(textStyle);
    } catch (error) {
      console.error('Error creating text style:', error);
      res.status(500).json({ success: false, message: 'Failed to create text style' });
    }
  });

  app.patch('/api/admin/options/text-styles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const textStyle = await storage.updateTextStyle(id, req.body);
      res.json(textStyle);
    } catch (error) {
      console.error('Error updating text style:', error);
      res.status(500).json({ success: false, message: 'Failed to update text style' });
    }
  });

  // Border color management
  app.get('/api/admin/options/border-colors', (req, res) => {
    res.json(storage.getBorderColors());
  });

  app.post('/api/admin/options/border-colors', async (req, res) => {
    try {
      const borderColor = await storage.createBorderColor(req.body);
      res.status(201).json(borderColor);
    } catch (error) {
      console.error('Error creating border color:', error);
      res.status(500).json({ success: false, message: 'Failed to create border color' });
    }
  });

  app.patch('/api/admin/options/border-colors/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const borderColor = await storage.updateBorderColor(id, req.body);
      res.json(borderColor);
    } catch (error) {
      console.error('Error updating border color:', error);
      res.status(500).json({ success: false, message: 'Failed to update border color' });
    }
  });

  // Plate surround management
  app.get('/api/admin/options/plate-surrounds', (req, res) => {
    res.json(storage.getPlateSurrounds());
  });

  app.post('/api/admin/options/plate-surrounds', async (req, res) => {
    try {
      const plateSurround = await storage.createPlateSurround(req.body);
      res.status(201).json(plateSurround);
    } catch (error) {
      console.error('Error creating plate surround:', error);
      res.status(500).json({ success: false, message: 'Failed to create plate surround' });
    }
  });

  app.patch('/api/admin/options/plate-surrounds/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const plateSurround = await storage.updatePlateSurround(id, req.body);
      res.json(plateSurround);
    } catch (error) {
      console.error('Error updating plate surround:', error);
      res.status(500).json({ success: false, message: 'Failed to update plate surround' });
    }
  });

  // Plate type management
  app.get('/api/admin/options/plate-types', (req, res) => {
    res.json(storage.getPlateTypes());
  });

  app.post('/api/admin/options/plate-types', async (req, res) => {
    try {
      const plateType = await storage.createPlateType(req.body);
      res.status(201).json(plateType);
    } catch (error) {
      console.error('Error creating plate type:', error);
      res.status(500).json({ success: false, message: 'Failed to create plate type' });
    }
  });

  app.patch('/api/admin/options/plate-types/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const plateType = await storage.updatePlateType(id, req.body);
      res.json(plateType);
    } catch (error) {
      console.error('Error updating plate type:', error);
      res.status(500).json({ success: false, message: 'Failed to update plate type' });
    }
  });

  return httpServer;
}
