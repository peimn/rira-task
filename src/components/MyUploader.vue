<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const emit = defineEmits(['failed', 'uploaded', 'uploading']);

const file = ref(null);

const uploadFile = (event) => {
  file.value = event.target.files[0];
};
const submit = async () => {
  const form = new FormData();
  form.append('file', file.value)
  try {
    emit('uploading', true);
    const endpoint = "http://localhost:3000/upload";
    const response = await axios.post(endpoint, form);
    emit('uploaded', response.data);
  } catch (error) {
    emit('failed', error);
  }
};
</script>

<template>
  <h1>File Upload</h1>
  <div>
    <form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data" @submit.prevent="submit">
      <input type="file" name="file" required @change="uploadFile" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<style scoped>
</style>
