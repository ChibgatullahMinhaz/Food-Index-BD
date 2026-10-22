import { OrderService } from '../../../../../../services/orderService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../../../lib/apiResponse';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    const updatedOrder = await OrderService.updateOrderStatus(id, status);
    return sendSuccess(`Order status updated to ${status}`, updatedOrder);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to update order status'), 400);
  }
}
