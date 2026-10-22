import { ProductService } from '../../../services/productService';
import { getErrorMessage, sendError, sendSuccess } from '../../../lib/apiResponse';

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const products = await ProductService.getAllProducts({
      categorySlug: searchParams.get('category') || undefined,
      isFeatured: searchParams.get('featured') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
    });
    return sendSuccess('Products retrieved successfully', products);
  } catch (error) {
    console.error('API Error in Products Controller:', error);
    return sendError(getErrorMessage(error, 'Failed to retrieve products'));
  }
}
