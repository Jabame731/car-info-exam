import { defineStore } from 'pinia';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  getProductById,
  updateProduct,
} from 'src/boot/axios';
import type { Products } from 'src/components/models';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Products[],
    searchQuery: '' as string,
  }),
  actions: {
    async loadProducts() {
      this.products = await fetchProducts();
    },
    async searchProducts(term: string) {
      this.searchQuery = term;
      this.products = await fetchProducts(term);
    },
    async addNewProduct(product_name: string, product_type: string) {
      const created = await addProduct(product_name, product_type);
      this.products.push(created);
    },
    async removeProduct(productId: number) {
      await deleteProduct(productId);
      this.products = this.products.filter((p) => p.product_id !== productId);
    },
    async updateProduct(id: number, productData: { product_name: string; product_type: string }) {
      const updated = await updateProduct(id, productData);
      const index = this.products.findIndex((p) => p.product_id === id);
      if (index !== -1) {
        this.products[index] = updated;
      }
    },
    async getProduct(productId: number): Promise<Products | undefined> {
      const productInStore = this.products.find((p) => p.product_id === productId);
      if (productInStore) return productInStore;

      // Otherwise fetch from API
      const product = await getProductById(productId);
      return product;
    },
  },
});
