import { ProductServiceInterface } from './products';
import products from './products.json';

class ProductService implements ProductServiceInterface {
    getProductById(id: string) {
        return Promise.resolve(products.find( product => product.id === id ));
    }

    getAllProducts() {
        return Promise.resolve(products);
    }
}

export { ProductService };