<script setup lang="ts">
import { ref, onMounted } from "vue";
import {emitter} from "../emitter";
import CustomInput from "./CustomInput.vue";
import CustomTable from "./CustomTable.vue";

const props = defineProps({
  api: { type: String, default: '' },
  searchApi: { type: String, default: '' },
  headers: { type: Array, default: [] },
  actions: { type: Array, default: [] },
  title: { type: String, default: '' },
  perPage: { type: Number, default: 5 },
});
const emit = defineEmits(['action']);

const data = ref([]);
const inp = ref(null);
const loading = ref(true);

const search = async (s) => {
  let url = props.api;
  if (s) {
    url = `${props.searchApi}${s}`;
  }

  loading.value = true;

  try {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
          data.value = json;
          loading.value = false;
          emitter.emit('goToPage', 1);
        });
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
};

onMounted(() => {
  search(null);

  emitter.on('reload', () => {
    console.log('reload');
    search(null);
  })
});
</script>

<template>
  <custom-table :data="data" :per-page="perPage" :headers="headers" :title="title" :loading="loading" :actions="actions" @action="(action) => emit('action', action)">
    <template #end>
      <custom-input
          v-if="searchApi !== ''"
          :model-value="inp"
          @update:model-value="(newValue) => search(newValue)"
      />
    </template>
  </custom-table>
</template>

<style scoped>

</style>
