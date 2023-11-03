<script setup>
import { VueFinalModal } from 'vue-final-modal';

defineProps({
  title: { type: String },
  confirmTitle: { type: String, default: 'Confirm', required: false }
});

const emit = defineEmits(['confirm'])
</script>

<template>
  <VueFinalModal
      class="custom-modal"
      content-class="custom-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
  >
    <h1 v-if="title">{{ title }}</h1>
    <slot />
    <button @click="emit('confirm')">
      {{ confirmTitle }}
    </button>
  </VueFinalModal>
</template>

<style lang="scss">
.custom-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-modal-content {
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 80vh;
}
//.custom-modal-content > * + *{
//  margin: 0;
//}
.custom-modal-content h1 {
  font-size: 1.375rem;
}
.custom-modal-content button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 9999;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .custom-modal-content {
  background: #000;
}
</style>
