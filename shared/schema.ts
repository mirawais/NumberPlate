import { pgTable, text, serial, integer, boolean, timestamp, json, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table (kept from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Plate Selection Options
export const plateSelections = pgTable("plate_selections", {
  id: serial("id").primaryKey(),
  value: text("value").notNull().unique(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull().default(0),
});

export const insertPlateSelectionSchema = createInsertSchema(plateSelections).pick({
  value: true,
  name: true,
  price: true,
});

export type InsertPlateSelection = z.infer<typeof insertPlateSelectionSchema>;
export type PlateSelection = typeof plateSelections.$inferSelect;

// Badges
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  price: doublePrecision("price").notNull().default(0),
  imageUrl: text("imageUrl"),
});

export const insertBadgeSchema = createInsertSchema(badges).pick({
  name: true,
  code: true,
  price: true,
  imageUrl: true,
});

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;

// Badge Colors
export const badgeColors = pgTable("badge_colors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hexCode: text("hex_code").notNull().unique(),
});

export const insertBadgeColorSchema = createInsertSchema(badgeColors).pick({
  name: true,
  hexCode: true,
});

export type InsertBadgeColor = z.infer<typeof insertBadgeColorSchema>;
export type BadgeColor = typeof badgeColors.$inferSelect;

// Text Styles
export const textStyles = pgTable("text_styles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  style: text("style").notNull().unique(),
  price: doublePrecision("price").notNull().default(0),
});

export const insertTextStyleSchema = createInsertSchema(textStyles).pick({
  name: true,
  style: true,
  price: true,
});

export type InsertTextStyle = z.infer<typeof insertTextStyleSchema>;
export type TextStyle = typeof textStyles.$inferSelect;

// Border Colors
export const borderColors = pgTable("border_colors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hexCode: text("hex_code").notNull().unique(),
});

export const insertBorderColorSchema = createInsertSchema(borderColors).pick({
  name: true,
  hexCode: true,
});

export type InsertBorderColor = z.infer<typeof insertBorderColorSchema>;
export type BorderColor = typeof borderColors.$inferSelect;

// Plate Surrounds
export const plateSurrounds = pgTable("plate_surrounds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  style: text("style").notNull().unique(),
  price: doublePrecision("price").notNull().default(0),
});

export const insertPlateSurroundSchema = createInsertSchema(plateSurrounds).pick({
  name: true,
  style: true,
  price: true,
});

export type InsertPlateSurround = z.infer<typeof insertPlateSurroundSchema>;
export type PlateSurround = typeof plateSurrounds.$inferSelect;

// Plate Types
export const plateTypes = pgTable("plate_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  style: text("style").notNull().unique(),
  price: doublePrecision("price").notNull().default(0),
});

export const insertPlateTypeSchema = createInsertSchema(plateTypes).pick({
  name: true,
  style: true,
  price: true,
});

export type InsertPlateType = z.infer<typeof insertPlateTypeSchema>;
export type PlateType = typeof plateTypes.$inferSelect;

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customization: json("customization").notNull(),
  orderItems: json("order_items").notNull(),
  totalPrice: doublePrecision("total_price").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customization: true,
  orderItems: true,
  totalPrice: true,
  paymentStatus: true,
  paymentId: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
