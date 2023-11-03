<script setup>
import {computed, nextTick, onBeforeMount, onMounted, ref, watch} from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps(["modelValue", "options", "readText", "readValue", "placeholder", "search"]);

const isOpen = ref(false);
const selectedOption = ref(props.modelValue);
const isPrimitive = ref(false);
const allOptions = ref([]);

const selectedText = computed(() => selectedOption.value ? selectedOption.value.text : props.placeholder);

const optionsComp = computed(() => {
  let arr = props.options || [];
  arr = arr.map((item) => {
    return { id: item[props.readValue], text: item[props.readText] };
  });
  return arr;
});

const onSelectOpen = () => {
  isOpen.value = true;
};
const onSelectOption = (opt) => {
  selectedOption.value = opt;
  isOpen.value = false;
  emit('update:modelValue', opt)
};
const onBlur = (e) => {
  if (
      !e.relatedTarget ||
      e.relatedTarget.type !== "text" ||
      e.relatedTarget.id !== "select-search"
  ) {
    isOpen.value = false;
  }
};
const isSelected = (opt) => {
  return selectedOption.value
      ? selectedOption.value?.id === (isPrimitive.value ? opt : opt.id)
      : false;
};
const onWrapperClick = (e) => {
  console.log(e.target, e.currentTarget)
  if (e.target === e.currentTarget || e.target.className === 'selected' || e.target.className === 'current selected') {
    isOpen.value = !isOpen.value;
  }
  if (e.target.className === 'selected-option') {
    isOpen.value = false;
  }
}

const filter = (event) => {
  if (event?.target?.value) {
    allOptions.value = optionsComp.value.filter((o) => o.text.toString() === event.target.value.toString());
  } else {
    allOptions.value = optionsComp.value;
  }
}

watch(optionsComp, () => filter());

watch(
    () => props.modelValue,
    (v) => {
      selectedOption.value = v;
    }
);
</script>

<template>
  <div class='select-wrapper' @click="onWrapperClick" :class="{'open':isOpen}" tabindex='0' @blur="onBlur">
    <span :class="{ current: !!selectedOption }" class="selected">{{selectedText}}</span>
    <div class="list-wrapper">
      <div v-if='search' class='search'>
        <input id='select-search' type='text' @input="filter" />
      </div>
      <ul>
        <li v-for='(opt,i) in allOptions'
            :key='i+1' @click='()=>onSelectOption(opt)'
            :class="{ 'selected-option': isSelected(opt) }">{{opt.text}}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
  -webkit-tap-highlight-color: transparent;
  background-color: #2a2b2d;
  border-radius: 5px;
  border: solid 1px #111111;
  box-sizing: border-box;
  clear: both;
  cursor: pointer;
  display: block;
  float: left;
  font-family: inherit;
  font-size: 18px;
  font-weight: normal;
  height: 62px;
  line-height: 60px;
  outline: none;
  padding-left: 18px;
  padding-right: 30px;
  position: relative;
  text-align: left !important;
  transition: all 0.24s ease-in-out;
  user-select: none;
  white-space: nowrap;
  .current {
    font-weight: bold;
  }
  .list-wrapper {
    z-index: 9999;
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
    background-color: #2a2b2d;
    border: solid 1px #111111;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgb(68 68 68 / 11%);
    box-sizing: border-box;
    transform: scale(0.75) translateY(-21px);
    transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;

    .search {
      display: flex;

      input {
        width: 100%;
        padding: 10px 10px 5px 10px;
      }
    }
  }
  &.open {
    border-color: rgba(33, 32, 31, 0.82);
    box-shadow: 0 0 10px rgba(44, 42, 40, 0.45);
    ul,
    .list-wrapper {
      opacity: 1 !important;
      pointer-events: auto;
      transform: scale(1) translateY(0);
    }

    &:after {
      transform: rotate(-135deg);
    }
  }
  ul {
    width: 100%;
    margin: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    transform-origin: 50% 0;
    animation: opacity 0.15s ease-out;
    z-index: 9;
    max-height: 300px;
    overflow: auto;
    color: rgb(255 255 255 / 1);
    -webkit-text-fill-color: #fff;

    &:hover {
      color: #09afec;
    }

    &::-webkit-scrollbar {
      width: 18px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border: 5px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 9999px;
      box-shadow: inset 0 0 0 10px;
    }

    li {
      cursor: pointer;
      font-weight: 400;
      line-height: 40px;
      list-style: none;
      min-height: 40px;
      outline: none;
      text-align: center;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      color: #fff;

      &:not(.disabled):not(.selected):not(.search):hover {
        background-color: #09afec;
        -webkit-text-fill-color: #fff;
      }

      &.disabled {
        background-color: transparent;
        color: #999;
        cursor: default;
        -webkit-text-fill-color: #999;
      }

      &.selected-option {
        font-weight: bold;
        background-color: #0bb5ee;
        pointer-events: none;
      }

      &:after {
        -webkit-transform: rotate(-135deg);
        -ms-transform: rotate(-135deg);
        transform: rotate(-135deg);
      }
    }
  }

  &:after {
    border-bottom: 2px solid #90a1b5;
    border-right: 2px solid #90a1b5;
    content: "";
    display: block;
    height: 5px;
    margin-top: -4px;
    pointer-events: none;
    position: absolute;
    right: 12px;
    top: 50%;
    transform-origin: 66% 66%;
    transform: rotate(45deg);
    transition: all 0.15s ease-in-out;
    width: 5px;
  }
}
</style>
