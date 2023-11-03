<script setup>
import MyPagination from "./MyPagination.vue";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps(['title', 'data', 'headers', 'perPage', 'loading', 'actions']);
const emit = defineEmits(['action']);

const total = computed(() => Math.ceil(props.data.length / props.perPage));

const table = ref();
const range = ref([0, props.perPage]);
const current = ref(1);

const changed = (page) => {
  current.value = page;
  range.value = [(props.perPage * current.value) - props.perPage, current.value * props.perPage];
};

const setLoading = () => {
  table.value.style.setProperty('--loading', props.loading ? 'block' : 'none');
};

onMounted(() => {
  setLoading();

  if(props.actions?.length > 0) {

  }
});

watch(
    () => props.loading,
    () => {
      setLoading();
    }
);
</script>

<template>
  <div class="table-top">
    <slot name="title">
      <h3 v-if="title">{{ title }}</h3>
    </slot>
    <div class="end">
      <slot name="end"></slot>
    </div>
  </div>
  <table ref="table" class="table-fill">
    <thead v-if="data.length > 0">
      <tr>
        <th v-for="h in headers" :key="h">{{ h }}</th>
        <th v-if="actions?.length > 0">actions</th>
      </tr>
    </thead>
    <tbody class="table-hover">
      <tr v-for="d in data.slice(...range)" :key="d">
        <td v-for="h in headers" :key="h" :data-th="h" class="text-left">{{ d[h] }}</td>
        <td v-if="actions?.length > 0">
          <button v-for="action in actions" :key="action.value" @click="emit('action', { name: action.value, data: d })">
            {{ action.display }}
          </button>
        </td>
      </tr>
      <tr v-if="data.length === 0 && !loading" class="no-data">
        No data
      </tr>
    </tbody>
  </table>
  <my-pagination :current="current" :total="total" :max-page="5" @change="changed" />
</template>

<style lang="scss" scoped>
  .table-top {
    display: flex;
    margin: auto;
    padding: 5px;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;

    h3 {
      color: #fafafa;
      font-size: 30px;
      font-weight: 400;
      font-style: normal;
      font-family: "Roboto", helvetica, arial, sans-serif;
      text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
      text-transform: uppercase;
    }

    .end {
      display: flex;
      padding: 2rem 0;
    }
  }

  /*** Table Styles **/
  .table-fill {
    background: white;
    border-radius: 3px;
    border-collapse: collapse;
    margin: auto;
    padding: 5px;
    width: 100%;
    min-width: 400px;
    min-height: 120px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    animation: float 5s infinite;
    position: relative;

    --loading: 'block';

    // loading
    &:after {
      display: var(--loading);
      box-sizing: border-box;
      content: "Loading...";
      font-size: 3rem;
      text-shadow: 5px 3px 5px #000;
      padding: 25px 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0 0 0 / 80%);
      left: 0;
      top: 0;
    }

    th {
      color: #D5DDE5;;
      background: #1b1e24;
      border-bottom: 4px solid #9ea7af;
      border-right: 1px solid #343a45;
      font-size: 23px;
      font-weight: 100;
      padding: 24px;
      text-align: left;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      vertical-align: middle;

      &:first-child {
        border-top-left-radius: 3px;
      }

      &:last-child {
        border-top-right-radius: 3px;
        border-right: none;
      }
    }

    tr {
      border-top: 1px solid #C1C3D1;
      border-bottom: 1px solid #C1C3D1;
      color: #666B85;
      font-size: 16px;
      font-weight: normal;
      text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);

      &.no-data {
        font-size: 5rem;
      }

      &:hover td {
        background: #4E5066;
        color: #FFFFFF;
        border-top: 1px solid #22262e;
      }

      &:first-child {
        border-top: none;
      }

      &:last-child {
        border-bottom: none;
      }

      &:nth-child(odd) {
        td {
          background: #EBEBEB;
        }

        &:hover td {
          background: #4E5066;
        }
      }

      &:last-child {
        td {
          &:first-child {
            border-bottom-left-radius: 3px;
          }

          &:last-child {
            border-bottom-right-radius: 3px;
          }
        }
      }


      td {
        background: #FFFFFF;
        padding: 20px;
        text-align: left;
        vertical-align: middle;
        font-weight: 300;
        font-size: 18px;
        text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        border-right: 1px solid #C1C3D1;

        &:last-child {
          border-right: 0px;
        }
      }

      th {
        &.text-left {
          text-align: left;
        }

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }

      td {
        &.text-left {
          text-align: left;
        }

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }
    }
  }
</style>
