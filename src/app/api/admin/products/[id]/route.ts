import { ProductService } from '../../../../../services/productService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../../lib/apiResponse';

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const updated = await ProductService.updateProduct(id, await request.json());
    if (!updated) {
      return sendError('Product not found', 404);
    }
    return sendSuccess('Product updated successfully', updated);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to update product'), 400);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const success = await ProductService.deleteProduct(id);
    if (!success) {
      return sendError('Product not found', 404);
    }
    return sendSuccess('Product deleted successfully', null);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to delete product'));
  }
}
