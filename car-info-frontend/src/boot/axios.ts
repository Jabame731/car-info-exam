import { defineBoot } from '#q-app/wrappers';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Products } from 'src/components/models';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchProducts = async (q?: string): Promise<Products[]> => {
  const response = await api.get('/products', {
    params: q ? { name: q } : {},
  });
  return response.data;
};
export const addProduct = async (product_name: string, product_type: string): Promise<Products> => {
  const response = await api.post('/products', {
    product_name,
    product_type,
  });
  return response.data;
};

export const updateProduct = async (
  id: number,
  data: { product_name: string; product_type: string },
): Promise<Products> => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ app }) => {
  // something to do
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
