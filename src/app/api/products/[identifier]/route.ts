import { ProductService } from '../../../../services/productService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../lib/apiResponse';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ identifier: string }> },
) {
  try {
    const { identifier } = await params;
    const product =
      (await ProductService.getProductById(identifier)) ||
      (await ProductService.getProductBySlug(identifier));
    if (!product) {
      return sendError('Product not found', 404);
    }
    return sendSuccess('Product retrieved successfully', product);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Error fetching product'));
  }
}
