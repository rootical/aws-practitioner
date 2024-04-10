import { middyfy } from '@libs/lambda';
import { getProductsByIdHandler } from '@functions/getProductsById/handler';
import { getProductsListHandler } from '@functions/getProductsList/handler';
import { ProductService } from '../services/product-service';

const productService = new ProductService()

export const getProductsById = middyfy(getProductsByIdHandler(productService));
export const getProductsList = middyfy(getProductsListHandler(productService));