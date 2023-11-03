<script setup>
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/video.css';
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';
import 'vidstack/icons';
import {onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {emitter} from "../emitter";

const props = defineProps({
  video: { type: String },
  videoName: { type: String },
  lastTime: { type: Number, default: 0, required: false },
});

const ready = ref(false);

const emit = defineEmits(['paused']);

const currentTime = ref(0);
const player = ref();
const $viewType = ref('unknown');
const {
  _paused,
  _playing,
  _waiting,
  _currentTime,
  // ...
} = ref()
const unsubscribe = ref();

onBeforeMount(() => {
  console.log(props.lastTime);
  ready.value = true;
});

onMounted(() => {
  unsubscribe.value = player.value.subscribe((/*{ paused, viewType, playing }*/data) => {
    $viewType.value = data.viewType;
    // console.log('is paused?', '->', data.paused);
    // console.log('is playing?', '->', data.playing);
    // console.log('current time?', '->', data.currentTime);
    // console.log('duration?', '->', data.duration);
    // console.log(data.paused, data.waiting, data.started, data.played, data.playing);
    // console.log('is audio view?', '->', viewType === 'audio');
    currentTime.value = data.currentTime;
    if (data.paused && data.started && !data.playing) {
      emit('paused', {name: props.videoName, at: data.currentTime});
    }
  });
});

// Get a snapshot of internal media state.
// watch(
//     () => player.value?.state,
//     () => {
//       const {
//         paused,
//         playing,
//         waiting,
//         currentTime,
//         // ...
//       } = player.value?.state;
//       // _paused.value = paused;
//       // _playing.value = playing;
//       // _waiting.value = waiting;
//       // _currentTime.value = currentTime;
//       console.log(paused, playing, currentTime);
//     }
// );

emitter.on('stop', () => {
  emit('paused', {name: props.videoName, at: currentTime.value});
  unsubscribe.value();
  player.value?.destroy();
  ready.value = false;
})

onBeforeUnmount(() => {
  emit('paused', {name: props.videoName, at: currentTime.value});
  player.value.destroy();
})

window.addEventListener('beforeunload', function(event) {
  emit('paused', {name: props.videoName, at: currentTime.value});
})
</script>

<template>
  <media-player v-if="ready" ref="player" :src="video" :current-time="lastTime" autoplay>
    <media-provider></media-provider>
    <media-video-layout></media-video-layout>
  </media-player>
</template>

<style scoped>

</style>
