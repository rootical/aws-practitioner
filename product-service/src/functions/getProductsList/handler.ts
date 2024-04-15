import { errorResponse, successResponse } from '../../utils/apiResponseBuilder';
import { ProductInterface, ProductServiceInterface, StockInterface } from '../../services/products';
import { stockService } from "@functions/handlers";

export const getProductsListHandler = (productService: ProductServiceInterface) => async () => {
  try {
    const products: ProductInterface[]  = await productService.getAllProducts();
    const stocks: StockInterface[] = await stockService.getStock();

    console.log('products', products);
    console.log('stocks', stocks);

    const items = products.map(product => {
      // @ts-ignore
      const stock: StockInterface = stocks.find(stock => stock.productId === product.id);
      return ({
        ...product,
        count: stock?.count || 0,
      })
    })

    return successResponse(items);
  } catch (error) {
    return errorResponse(error, 500);
  }
};