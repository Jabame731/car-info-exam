<template>
  <div class="row items-center justify-between q-mb-md">
    <!-- Search bar -->
    <q-input
      dense
      outlined
      v-model="localSearch"
      placeholder="Search products..."
      class="col-6"
      debounce="300"
      @keyup.enter="emit('search', localSearch)"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Create button -->
    <q-btn color="black" label="Create Product" class="q-ml-md" @click="emit('create')" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  (e: 'create'): void;
  (e: 'search', term: string): void;
}>();

const localSearch = ref(props.search);

watch(
  () => props.search,
  (newVal) => {
    localSearch.value = newVal;
  },
);
</script>
