import { OrderService } from '../../../services/orderService';
import { getErrorMessage, sendError, sendSuccess } from '../../../lib/apiResponse';

export async function POST(request: Request) {
  try {
    const order = await OrderService.createOrder(await request.json());
    return sendSuccess(`Order placed successfully! Order ID: ${order.id}`, order, 201);
  } catch (error) {
    console.error('API Error in Create Order Controller:', error);
    return sendError(getErrorMessage(error, 'Failed to place order'), 400);
  }
}
