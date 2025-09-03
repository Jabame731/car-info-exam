<template>
  <q-table
    title="Products"
    :rows="props.products"
    :columns="columns"
    row-key="product_id"
    flat
    bordered
    virtual-scroll
  >
    <template v-slot:body-cell-actions="slotProps">
      <q-td :props="slotProps">
        <q-btn flat color="primary" size="md" @click="editProduct(slotProps.row.product_id)">
          Edit
        </q-btn>
        <q-btn flat color="negative" size="md" @click="deleteProduct(slotProps.row.product_id)"
          >Delete</q-btn
        >
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import type { QTableProps } from 'quasar';
import type { Products } from './models';
import { useRouter } from 'vue-router';
import { useProductsStore } from 'src/stores/products';

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'ID', field: 'product_id', align: 'left' },
  { name: 'name', label: 'Name', field: 'product_name', align: 'left' },
  { name: 'type', label: 'Type', field: 'product_type', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
];

const router = useRouter();
const store = useProductsStore();

const props = defineProps<{
  products: Products[];
}>();

async function editProduct(id: number) {
  await router.push(`/products/${id}/edit`);
}

async function deleteProduct(productId: string) {
  await store.removeProduct(Number(productId));
}
</script>
