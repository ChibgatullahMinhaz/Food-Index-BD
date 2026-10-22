import { OrderService } from '../../../../services/orderService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../lib/apiResponse';

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const orders = await OrderService.getAllOrders({
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
    });
    return sendSuccess('Orders retrieved successfully', orders);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to retrieve orders'));
  }
}
