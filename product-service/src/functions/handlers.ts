import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getProductsByIdHandler } from '@functions/getProductsById/handler';
import { getProductsListHandler } from '@functions/getProductsList/handler';
import { createProductHandler } from '@functions/createProduct/handler';
import { catalogBatchProcessHandler } from "@functions/catalogBatchProcess/handler";
import { Product } from '../services/product';
import { StockService } from '../services/stock';

const client = new DynamoDBClient();
export const productService = new Product(client);
export const stockService = new StockService(client);

export const getProductsById = getProductsByIdHandler(productService);
export const getProductsList = getProductsListHandler(productService);
export const createProduct = createProductHandler(productService);
export const catalogBatchProcess = catalogBatchProcessHandler(productService);