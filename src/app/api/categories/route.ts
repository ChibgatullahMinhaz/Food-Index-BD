import { CategoryService } from '../../../services/categoryService';
import { getErrorMessage, sendError, sendSuccess } from '../../../lib/apiResponse';

export async function GET() {
  try {
    const categories = await CategoryService.getAllCategories();
    return sendSuccess('Categories retrieved successfully', categories);
  } catch (error) {
    console.error('API Error in Categories Controller:', error);
    return sendError(getErrorMessage(error, 'Failed to retrieve categories'));
  }
}
