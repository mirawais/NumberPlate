import { 
  users, type User, type InsertUser,
  plateSelections, type PlateSelection, type InsertPlateSelection,
  badges, type Badge, type InsertBadge,
  badgeColors, type BadgeColor, type InsertBadgeColor,
  textStyles, type TextStyle, type InsertTextStyle,
  borderColors, type BorderColor, type InsertBorderColor,
  plateSurrounds, type PlateSurround, type InsertPlateSurround,
  plateTypes, type PlateType, type InsertPlateType,
  orders, type Order, type InsertOrder
} from "@shared/schema";

// Storage interface definition
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Plate Selection methods
  getPlateSelections(): PlateSelection[];
  createPlateSelection(plateSelection: InsertPlateSelection): Promise<PlateSelection>;
  updatePlateSelection(id: number, plateSelection: Partial<InsertPlateSelection>): Promise<PlateSelection>;

  // Badge methods
  getBadges(): Badge[];
  createBadge(badge: InsertBadge): Promise<Badge>;
  updateBadge(id: number, badge: Partial<InsertBadge>): Promise<Badge>;

  // Badge Color methods
  getBadgeColors(): BadgeColor[];
  createBadgeColor(badgeColor: InsertBadgeColor): Promise<BadgeColor>;
  updateBadgeColor(id: number, badgeColor: Partial<InsertBadgeColor>): Promise<BadgeColor>;

  // Text Style methods
  getTextStyles(): TextStyle[];
  createTextStyle(textStyle: InsertTextStyle): Promise<TextStyle>;
  updateTextStyle(id: number, textStyle: Partial<InsertTextStyle>): Promise<TextStyle>;

  // Border Color methods
  getBorderColors(): BorderColor[];
  createBorderColor(borderColor: InsertBorderColor): Promise<BorderColor>;
  updateBorderColor(id: number, borderColor: Partial<InsertBorderColor>): Promise<BorderColor>;

  // Plate Surround methods
  getPlateSurrounds(): PlateSurround[];
  createPlateSurround(plateSurround: InsertPlateSurround): Promise<PlateSurround>;
  updatePlateSurround(id: number, plateSurround: Partial<InsertPlateSurround>): Promise<PlateSurround>;

  // Plate Type methods
  getPlateTypes(): PlateType[];
  createPlateType(plateType: InsertPlateType): Promise<PlateType>;
  updatePlateType(id: number, plateType: Partial<InsertPlateType>): Promise<PlateType>;

  // Order methods
  getAllOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private plateSelections: Map<number, PlateSelection>;
  private badges: Map<number, Badge>;
  private badgeColors: Map<number, BadgeColor>;
  private textStyles: Map<number, TextStyle>;
  private borderColors: Map<number, BorderColor>;
  private plateSurrounds: Map<number, PlateSurround>;
  private plateTypes: Map<number, PlateType>;
  private orders: Map<number, Order>;
  
  private currentUserId: number;
  private currentPlateSelectionId: number;
  private currentBadgeId: number;
  private currentBadgeColorId: number;
  private currentTextStyleId: number;
  private currentBorderColorId: number;
  private currentPlateSurroundId: number;
  private currentPlateTypeId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.plateSelections = new Map();
    this.badges = new Map();
    this.badgeColors = new Map();
    this.textStyles = new Map();
    this.borderColors = new Map();
    this.plateSurrounds = new Map();
    this.plateTypes = new Map();
    this.orders = new Map();

    this.currentUserId = 1;
    this.currentPlateSelectionId = 1;
    this.currentBadgeId = 1;
    this.currentBadgeColorId = 1;
    this.currentTextStyleId = 1;
    this.currentBorderColorId = 1;
    this.currentPlateSurroundId = 1;
    this.currentPlateTypeId = 1;
    this.currentOrderId = 1;

    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize plate selections
    this.plateSelections.set(this.currentPlateSelectionId++, {
      id: 1,
      value: 'front',
      name: 'Front Only',
      price: 19.99
    });
    this.plateSelections.set(this.currentPlateSelectionId++, {
      id: 2,
      value: 'rear',
      name: 'Rear Only',
      price: 19.99
    });
    this.plateSelections.set(this.currentPlateSelectionId++, {
      id: 3,
      value: 'both',
      name: 'Both Plates',
      price: 34.99
    });

    // Initialize badges with default images
    this.badges.set(this.currentBadgeId++, {
      id: 1,
      name: 'GB Badge',
      code: 'gb',
      price: 4.99,
      imageUrl: '/img/badges/gb_flag.svg'
    });
    this.badges.set(this.currentBadgeId++, {
      id: 2,
      name: 'EU Badge',
      code: 'eu',
      price: 4.99,
      imageUrl: '/img/badges/eu_flag.svg'
    });
    this.badges.set(this.currentBadgeId++, {
      id: 3,
      name: 'UK Badge',
      code: 'uk',
      price: 4.99,
      imageUrl: '/img/badges/uk_flag.svg'
    });
    this.badges.set(this.currentBadgeId++, {
      id: 4,
      name: 'None',
      code: 'none',
      price: 0,
      imageUrl: ''
    });

    // Initialize badge colors
    this.badgeColors.set(this.currentBadgeColorId++, {
      id: 1,
      name: 'Gold',
      hexCode: '#FFD700'
    });
    this.badgeColors.set(this.currentBadgeColorId++, {
      id: 2,
      name: 'Blue',
      hexCode: '#0055AA'
    });
    this.badgeColors.set(this.currentBadgeColorId++, {
      id: 3,
      name: 'Red',
      hexCode: '#E63946'
    });
    this.badgeColors.set(this.currentBadgeColorId++, {
      id: 4,
      name: 'Black',
      hexCode: '#212529'
    });
    this.badgeColors.set(this.currentBadgeColorId++, {
      id: 5,
      name: 'Green',
      hexCode: '#28A745'
    });

    // Initialize text styles
    this.textStyles.set(this.currentTextStyleId++, {
      id: 1,
      name: 'Standard',
      style: 'standard',
      price: 0
    });
    this.textStyles.set(this.currentTextStyleId++, {
      id: 2,
      name: '3D Effect',
      style: '3d',
      price: 7.99
    });
    this.textStyles.set(this.currentTextStyleId++, {
      id: 3,
      name: 'Carbon',
      style: 'carbon',
      price: 9.99
    });

    // Initialize border colors
    this.borderColors.set(this.currentBorderColorId++, {
      id: 1,
      name: 'Yellow',
      hexCode: '#FFD700'
    });
    this.borderColors.set(this.currentBorderColorId++, {
      id: 2,
      name: 'Blue',
      hexCode: '#0055AA'
    });
    this.borderColors.set(this.currentBorderColorId++, {
      id: 3,
      name: 'Black',
      hexCode: '#212529'
    });
    this.borderColors.set(this.currentBorderColorId++, {
      id: 4,
      name: 'Chrome',
      hexCode: '#CED4DA'
    });

    // Initialize plate surrounds
    this.plateSurrounds.set(this.currentPlateSurroundId++, {
      id: 1,
      name: 'None',
      style: 'none',
      price: 0
    });
    this.plateSurrounds.set(this.currentPlateSurroundId++, {
      id: 2,
      name: 'Standard',
      style: 'standard',
      price: 5.99
    });
    this.plateSurrounds.set(this.currentPlateSurroundId++, {
      id: 3,
      name: 'Premium',
      style: 'premium',
      price: 7.99
    });

    // Initialize plate types
    this.plateTypes.set(this.currentPlateTypeId++, {
      id: 1,
      name: 'Standard Plate',
      style: 'standard',
      price: 0
    });
    this.plateTypes.set(this.currentPlateTypeId++, {
      id: 2,
      name: 'Electric Car Plate',
      style: 'electric',
      price: 4.99
    });
    this.plateTypes.set(this.currentPlateTypeId++, {
      id: 3,
      name: 'Show Plate',
      style: 'show',
      price: 7.99
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id } as User;
    this.users.set(id, user);
    return user;
  }

  // Plate Selection methods
  getPlateSelections(): PlateSelection[] {
    return Array.from(this.plateSelections.values());
  }

  async createPlateSelection(insertPlateSelection: InsertPlateSelection): Promise<PlateSelection> {
    const id = this.currentPlateSelectionId++;
    const plateSelection = { 
      ...insertPlateSelection, 
      id,
      price: insertPlateSelection.price ?? 0 
    } as PlateSelection;
    this.plateSelections.set(id, plateSelection);
    return plateSelection;
  }

  async updatePlateSelection(id: number, plateSelection: Partial<InsertPlateSelection>): Promise<PlateSelection> {
    const existingPlateSelection = this.plateSelections.get(id);
    
    if (!existingPlateSelection) {
      throw new Error(`Plate selection with ID ${id} not found`);
    }
    
    const updatedPlateSelection: PlateSelection = {
      ...existingPlateSelection,
      ...plateSelection
    };
    
    this.plateSelections.set(id, updatedPlateSelection);
    return updatedPlateSelection;
  }

  // Badge methods
  getBadges(): Badge[] {
    return Array.from(this.badges.values());
  }

  async createBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.currentBadgeId++;
    const badge = { 
      ...insertBadge, 
      id,
      price: insertBadge.price ?? 0 
    } as Badge;
    this.badges.set(id, badge);
    return badge;
  }

  async updateBadge(id: number, badge: Partial<InsertBadge>): Promise<Badge> {
    const existingBadge = this.badges.get(id);
    
    if (!existingBadge) {
      throw new Error(`Badge with ID ${id} not found`);
    }
    
    const updatedBadge: Badge = {
      ...existingBadge,
      ...badge
    };
    
    this.badges.set(id, updatedBadge);
    return updatedBadge;
  }

  // Badge Color methods
  getBadgeColors(): BadgeColor[] {
    return Array.from(this.badgeColors.values());
  }

  async createBadgeColor(insertBadgeColor: InsertBadgeColor): Promise<BadgeColor> {
    const id = this.currentBadgeColorId++;
    const badgeColor = { ...insertBadgeColor, id } as BadgeColor;
    this.badgeColors.set(id, badgeColor);
    return badgeColor;
  }

  async updateBadgeColor(id: number, badgeColor: Partial<InsertBadgeColor>): Promise<BadgeColor> {
    const existingBadgeColor = this.badgeColors.get(id);
    
    if (!existingBadgeColor) {
      throw new Error(`Badge color with ID ${id} not found`);
    }
    
    const updatedBadgeColor: BadgeColor = {
      ...existingBadgeColor,
      ...badgeColor
    };
    
    this.badgeColors.set(id, updatedBadgeColor);
    return updatedBadgeColor;
  }

  // Text Style methods
  getTextStyles(): TextStyle[] {
    return Array.from(this.textStyles.values());
  }

  async createTextStyle(insertTextStyle: InsertTextStyle): Promise<TextStyle> {
    const id = this.currentTextStyleId++;
    const textStyle = { 
      ...insertTextStyle, 
      id,
      price: insertTextStyle.price ?? 0 
    } as TextStyle;
    this.textStyles.set(id, textStyle);
    return textStyle;
  }

  async updateTextStyle(id: number, textStyle: Partial<InsertTextStyle>): Promise<TextStyle> {
    const existingTextStyle = this.textStyles.get(id);
    
    if (!existingTextStyle) {
      throw new Error(`Text style with ID ${id} not found`);
    }
    
    const updatedTextStyle: TextStyle = {
      ...existingTextStyle,
      ...textStyle
    };
    
    this.textStyles.set(id, updatedTextStyle);
    return updatedTextStyle;
  }

  // Border Color methods
  getBorderColors(): BorderColor[] {
    return Array.from(this.borderColors.values());
  }

  async createBorderColor(insertBorderColor: InsertBorderColor): Promise<BorderColor> {
    const id = this.currentBorderColorId++;
    const borderColor = { ...insertBorderColor, id } as BorderColor;
    this.borderColors.set(id, borderColor);
    return borderColor;
  }

  async updateBorderColor(id: number, borderColor: Partial<InsertBorderColor>): Promise<BorderColor> {
    const existingBorderColor = this.borderColors.get(id);
    
    if (!existingBorderColor) {
      throw new Error(`Border color with ID ${id} not found`);
    }
    
    const updatedBorderColor: BorderColor = {
      ...existingBorderColor,
      ...borderColor
    };
    
    this.borderColors.set(id, updatedBorderColor);
    return updatedBorderColor;
  }

  // Plate Surround methods
  getPlateSurrounds(): PlateSurround[] {
    return Array.from(this.plateSurrounds.values());
  }

  async createPlateSurround(insertPlateSurround: InsertPlateSurround): Promise<PlateSurround> {
    const id = this.currentPlateSurroundId++;
    const plateSurround = { 
      ...insertPlateSurround, 
      id,
      price: insertPlateSurround.price ?? 0 
    } as PlateSurround;
    this.plateSurrounds.set(id, plateSurround);
    return plateSurround;
  }

  async updatePlateSurround(id: number, plateSurround: Partial<InsertPlateSurround>): Promise<PlateSurround> {
    const existingPlateSurround = this.plateSurrounds.get(id);
    
    if (!existingPlateSurround) {
      throw new Error(`Plate surround with ID ${id} not found`);
    }
    
    const updatedPlateSurround: PlateSurround = {
      ...existingPlateSurround,
      ...plateSurround
    };
    
    this.plateSurrounds.set(id, updatedPlateSurround);
    return updatedPlateSurround;
  }

  // Plate Type methods
  getPlateTypes(): PlateType[] {
    return Array.from(this.plateTypes.values());
  }

  async createPlateType(insertPlateType: InsertPlateType): Promise<PlateType> {
    const id = this.currentPlateTypeId++;
    const plateType = { 
      ...insertPlateType, 
      id,
      price: insertPlateType.price ?? 0 
    } as PlateType;
    this.plateTypes.set(id, plateType);
    return plateType;
  }

  async updatePlateType(id: number, plateType: Partial<InsertPlateType>): Promise<PlateType> {
    const existingPlateType = this.plateTypes.get(id);
    
    if (!existingPlateType) {
      throw new Error(`Plate type with ID ${id} not found`);
    }
    
    const updatedPlateType: PlateType = {
      ...existingPlateType,
      ...plateType
    };
    
    this.plateTypes.set(id, updatedPlateType);
    return updatedPlateType;
  }

  // Order methods
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order = { 
      ...insertOrder, 
      id,
      createdAt: new Date(),
      paymentStatus: insertOrder.paymentStatus || 'pending',
      paymentId: insertOrder.paymentId || null 
    } as Order;
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
