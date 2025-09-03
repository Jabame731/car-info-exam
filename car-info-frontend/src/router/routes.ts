import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('layouts/MainLayout.vue') },
  {
    path: '/products/create',
    component: () => import('components/ProductForm.vue'),
    props: { mode: 'create' },
  },
  {
    path: '/products/:id/edit',
    component: () => import('components/ProductForm.vue'),
    props: (route) => ({ mode: 'edit', id: route.params.id }),
  },
  // Always leave this as last one,
  // // but you can also remove it
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },
];
export default routes;
