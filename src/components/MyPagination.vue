<script setup>
import {computed, ref, watch} from "vue";
import CustomSelect from "./CustomSelect.vue";
import {emitter} from "../emitter";

const emit = defineEmits(['change']);

const props = defineProps({
  current: {type: [Number, String], default: 1},
  total: {type: [Number, String], default: 10},
  maxPage: {type: [Number, String], default: 5}
});

const total = computed(() => Number(props.total));
const activePage = ref(Number(props.current));
const page = computed(() => ({id: activePage.value, text: activePage.value }));

const firstPage = computed(() => Math.max(activePage.value - (activePage.value === total.value ? 2 : 1), 1));
const lastPage = computed(() => Math.min(activePage.value + (activePage.value === 1 ? 2 : 1), total.value));

const displayedPages = computed(() => {
  if (total.value <= props.maxPage || activePage.value > total.value) {
    return total.value;
  }

  return Array.from(
      {length: lastPage.value - firstPage.value + 1},
      (_, index) => index + firstPage.value
  );
});

const pages = computed(() => Array.from(
    {length: total.value},
    (_, index) => ({ 'id': index + 1, 'text': index + 1 })
));

const prev = () => {
  activePage.value = Math.max(activePage.value - 1, 1);
  emit("change", activePage.value);
};
const next = () => {
  activePage.value = Math.min(activePage.value + 1, total.value);
  emit("change", activePage.value);
};
const setIndex = (num) => {
  activePage.value = num;
  emit("change", activePage.value);
};

watch(
    () => props.current,
    () => {
      activePage.value = props.current;
    }
);

emitter.on('goToPage', (page) => {
  activePage.value = page;
  emit("change", page);
});
</script>

<template>
  <div v-show="total > 1" class="pagination">
    <div :class="{ 'arrow left': true, disabled: activePage === 1 }" @click="prev"></div>

    <template v-if="total > displayedPages[displayedPages.length - 2] && firstPage > 1">
      <div class="item" @click="setIndex(1)">{{ 1 }}</div>
      <div v-if="firstPage > 2">...</div>
    </template>
    <div v-for="num in displayedPages"
         :key="`pagination-item-${num}`"
         :class="{ item: true, on: activePage === num }"
         @click="setIndex(num)">
      {{ num }}
    </div>
    <template v-if="total > displayedPages[displayedPages.length - 1]">
      <div v-if="lastPage < total - 1">...</div>
      <div class="item" @click="setIndex(total)">{{ total }}</div>
    </template>

    <div :class="{ 'arrow right': true, disabled: activePage === total }" @click="next"></div>
    <custom-select :model-value="page"
                   @update:model-value="(newValue) => setIndex(newValue.id)"
                   :options='pages' read-value='id' read-text='text' placeholder='Page' :search='true' />
  </div>
</template>

<style lang="scss" scoped>
$primary: #008fff;
$text: #ffffff;
$size: 32px;

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
  color: $text;
  font-size: $size * 0.625;
  font-weight: bold;
  user-select: none;
  margin-top: 2rem;

  @media (max-width: 360px) {
    gap: 4px;
  }

  .arrow {
    width: $size;
    height: $size;
    position: relative;
    cursor: pointer;

    &.disabled {
      opacity: 0.5;
      cursor: auto;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: calc($size / 12);
      height: calc($size / 2);
      left: 0;
      top: 0;
      background-color: $text;
      border-radius: calc($size/12);
    }

    &::before {
      transform: translate(calc($size/2), calc($size/12)) rotate(40deg);
    }

    &::after {
      transform: translate(calc($size/2), calc($size/2) - calc($size/12)) rotate(-40deg);
    }

    &.right {
      transform: rotate(180deg);
    }
  }

  .item {
    width: $size;
    height: $size;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    border-radius: 4px;
    cursor: pointer;
    padding: 1rem;

    &:hover {
      background: rgba($primary, 0.2);
    }

    &.on {
      background: $primary;
      color: white;
      cursor: auto;
    }
  }
}
</style>
