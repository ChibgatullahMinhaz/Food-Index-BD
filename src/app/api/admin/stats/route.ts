import { OrderService } from '../../../../services/orderService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../lib/apiResponse';

export async function GET() {
  try {
    const stats = await OrderService.getAdminStats();
    return sendSuccess('Admin analytics statistics retrieved', stats);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to retrieve admin stats'));
  }
}
