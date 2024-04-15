export interface ProductInterface {
    id: string;
    title: string
    description: string;
    price: number;
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getAllProducts: () => Promise<ProductInterface[]>,
}