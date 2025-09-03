<template>
  <q-form class="q-pa-md" @submit.prevent="onSubmit">
    <q-input
      v-model="form.product_name"
      label="Product Name"
      outlined
      :rules="[(val) => !!val || 'Name is required']"
      @update:model-value="setDirty"
    />

    <q-input
      v-model="form.product_type"
      label="Product Type"
      outlined
      :rules="[(val) => !!val || 'Type is required']"
      class="q-mt-md"
      @update:model-value="setDirty"
    />

    <div class="row justify-end q-gutter-sm">
      <q-btn flat label="Cancel" color="grey" @click="onCancel" />
      <q-btn
        type="submit"
        color="primary"
        :label="mode === 'create' ? 'Create' : 'Update'"
        :loading="loading"
        :disable="!isDirty"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Products } from './models';
import { useProductsStore } from 'src/stores/products';

const route = useRoute();
const router = useRouter();
const store = useProductsStore();

const props = defineProps<{
  mode: 'create' | 'edit';
  product?: Products;
}>();

const form = ref<{ product_name: string; product_type: string }>({
  product_name: '',
  product_type: '',
});
const isDirty = ref(false);

const loading = ref(false);

// pre-fill when editing
watch(
  () => props.product,
  (val) => {
    if (val && props.mode === 'edit') {
      form.value = { ...val };
    }
  },
  { immediate: true },
);

function setDirty() {
  isDirty.value = true;
}

// pre-fill when editing using store
onMounted(async () => {
  if (props.mode === 'edit' && route.params.id) {
    const productId = Number(route.params.id);

    const loadProduct = async () => {
      const productInStore = store.products.find((p) => p.product_id === productId);
      if (productInStore) {
        form.value = { ...productInStore };
      } else {
        const product = await store.getProduct(productId);
        if (product) {
          console.log('yes');
          form.value = { ...product };
        }
      }
    };

    await loadProduct();
  }
});

async function onCancel() {
  await router.push('/');
}

async function onSubmit() {
  loading.value = true;

  try {
    if (props.mode === 'create') {
      await store.addNewProduct(form.value.product_name, form.value.product_type);
    } else {
      await store.updateProduct(Number(route.params.id), form.value);
    }
    await router.push('/');
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
