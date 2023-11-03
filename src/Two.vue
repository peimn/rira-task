<script setup>
import VideoList from "./components/MyList.vue";
import MyUploader from "./components/MyUploader.vue";
import {reactive, ref} from "vue";
import {emitter} from "./emitter";
import FinalModal from "./components/FinalModal.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import {useTimesStore} from "./times-store";
import {storeToRefs} from "pinia";

const store = useTimesStore();

const { lastTimes } = storeToRefs(store);
const { saveTime } = store;

console.log(store);

const result = ref(null);
const loading = ref(false);

const uploaded = (data) => {
  result.value = true;
  loading.value = false;
  emitter.emit('reload');
};

const title = ref('');
const showModal = ref(false);
const url = ref('');
const videoName = ref('');
// const lastTimes = reactive({});

const action = (act) => {
  videoName.value = act.data.name;
  if(act.name === 'playFromStart') { // other is resumePlaying
    // lastTimes[act.data.name] = 0;
    saveTime({name:act.data.name, time:0});
  }
  url.value = `http://localhost:3000/uploads/${act.data.name}.${act.data.extension}`;
  showModal.value = true;
};

const stopPlay = () => {
  emitter.emit('stop');
};

const paused = ({ name, at }) => {
  // lastTimes[name] = at;
  saveTime({name, time:at});
  console.log({at});
};
</script>

<template>
  <MyUploader @uploaded="uploaded" @failed="() => { result = false; loading=false }" @uploading="() => {result=null;loading = true}" />
  <template v-if="result !== null">
    <span v-if="result === true">File uploaded</span>
    <span v-else>File not uploaded</span>
  </template>
  <template v-if="loading">Loading...</template>
  <FinalModal v-model="showModal"
              :title="title"
              confirm-title="Close"
              @confirm="() => showModal = false" @beforeClose="stopPlay">
    <VideoPlayer :video="url" :video-name="videoName" :last-time="lastTimes[videoName] ?? 0" @paused="paused" />
  </FinalModal>
  <VideoList api="http://localhost:3000/videos"
             :headers="['name', 'extension']"
             :actions="[{value: 'playFromStart', display: 'Play'}, {value:'resumePlaying', display: 'Resume'}]"
             title="Videos"
             :perPage="5" @action="action" />
</template>

<style scoped>
hr {
  border-color: #000;
  margin: 4rem 0 2rem;
}
</style>
