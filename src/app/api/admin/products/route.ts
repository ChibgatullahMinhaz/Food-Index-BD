import { ProductService } from '../../../../services/productService';
import { getErrorMessage, sendError, sendSuccess } from '../../../../lib/apiResponse';

export async function POST(request: Request) {
  try {
    const product = await ProductService.createProduct(await request.json());
    return sendSuccess('Product created successfully', product, 201);
  } catch (error) {
    return sendError(getErrorMessage(error, 'Failed to create product'), 400);
  }
}
