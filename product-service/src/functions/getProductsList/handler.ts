import { errorResponse, successResponse } from '../../utils/apiResponseBuilder';
import { ProductServiceInterface } from '../../services/products';

export const getProductsListHandler = (productService: ProductServiceInterface) => async () => {
  try {
    const products = await productService.getAllProducts();
    return successResponse(products);
  } catch (error) {
    return errorResponse(error, 500);
  }
};
