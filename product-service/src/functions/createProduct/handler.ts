import { errorResponse, successResponse } from '../../utils/apiResponseBuilder';
import { ProductInterface, ProductServiceInterface } from '../../services/products';

export const createProductHandler = (productService: ProductServiceInterface) => async (event, _context) => {
    console.log('event', event);
    try {
        const {title, description, count, price} = event.body
        const product = {title, description, price}
        const stock = {
            count: count || 0}
        const result = await productService.createProduct(product as ProductInterface, stock);

        return successResponse({
            items: [result],
            statusCode: 201
        });
    } catch (err) {
        return errorResponse({name: '500', message: 'Internal Error'}, 500);
    }
};