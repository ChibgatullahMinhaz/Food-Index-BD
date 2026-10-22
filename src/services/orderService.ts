import { db } from "../lib/db";
import { Order, OrderStatus, DeliveryArea, PaymentMethod, OrderItem } from "../types";

export class OrderService {
  static async createOrder(orderPayload: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    deliveryArea: DeliveryArea;
    items: OrderItem[];
    paymentMethod: PaymentMethod;
    paymentTransactionId?: string;
    orderNotes?: string;
  }) {
    if (!orderPayload.customerName || !orderPayload.customerPhone || !orderPayload.deliveryAddress) {
      throw new Error("Customer name, phone number, and delivery address are strictly required.");
    }

    if (!orderPayload.items || orderPayload.items.length === 0) {
      throw new Error("Cannot place an empty order.");
    }

    // Calculate delivery shipping fee based on area logic
    const shippingCost = orderPayload.deliveryArea === 'inside_dhaka' ? 60 : 120;

    // Calculate items subtotal
    const itemsSubtotal = orderPayload.items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
    const totalAmount = itemsSubtotal + shippingCost;

    const newOrder = db.createOrder({
      customerName: orderPayload.customerName,
      customerPhone: orderPayload.customerPhone,
      deliveryAddress: orderPayload.deliveryAddress,
      deliveryArea: orderPayload.deliveryArea,
      shippingCost,
      totalAmount,
      paymentMethod: orderPayload.paymentMethod || 'COD',
      paymentTransactionId: orderPayload.paymentTransactionId || undefined,
      orderNotes: orderPayload.orderNotes || '',
      items: orderPayload.items
    });

    return newOrder;
  }

  static async getAllOrders(filters?: { status?: string; search?: string }) {
    return db.getOrders(filters);
  }

  static async getOrderById(id: string) {
    return db.getOrderById(id);
  }

  static async updateOrderStatus(id: string, status: OrderStatus) {
    const updated = db.updateOrderStatus(id, status);
    if (!updated) {
      throw new Error("Order not found");
    }
    return updated;
  }

  static async getAdminStats() {
    return db.getAdminStats();
  }
}
