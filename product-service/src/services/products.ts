import {AttributeValue, TransactWriteItem} from "@aws-sdk/client-dynamodb";
export interface ProductInterface {
    id: string;
    title: string
    description: string;
    price: number;
};

export interface StockInterface {
    productId?: AttributeValue;
    count: AttributeValue;
};

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getAllProducts: () => Promise<ProductInterface[]>,
    createProduct: (product: ProductInterface, stock: StockInterface) => Promise<ProductInterface>,
}

export interface StockServiceInterface {
    getCreateStockTranskItem: (stock: StockInterface) => TransactWriteItem,
    getStockByProductId: (productId: string) => Promise<StockInterface[]>,
    getStock: () => Promise<StockInterface[]>,
}
