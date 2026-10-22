import { OrderService } from '../../../../services/orderService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../lib/apiResponse';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      return sendError('Order not found', 404);
    }
    return sendSuccess('Order retrieved successfully', order);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to retrieve order'));
  }
}
