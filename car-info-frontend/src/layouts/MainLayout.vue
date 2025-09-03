<template>
  <div class="q-pa-md">
    <ProductSearch :search="searchQuery" @search="onSearch" @create="createForm" />
    <ProductsTable :products="store.products" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductsTable from 'src/components/ProductsTable.vue';
import ProductSearch from 'src/components/ProductSearch.vue';
import { useProductsStore } from 'src/stores/products';

const router = useRouter();
const searchQuery = ref('');
const store = useProductsStore();

onMounted(async () => {
  if (store.products.length === 0) {
    await store.loadProducts();
  }
});

async function onSearch(term: string) {
  await store.searchProducts(term);
  await router.replace({ query: { search: term } });
}

async function createForm() {
  await router.push('/products/create');
}
</script>
