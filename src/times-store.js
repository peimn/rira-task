import { defineStore } from 'pinia'
import {reactive} from "vue";

export const useTimesStore = defineStore('times', () => {
        let lastTimes = reactive({});
        const saveTime = ({name, time}) => {
            lastTimes[name] = time;
        };

        function $reset() {
            lastTimes = {};
        }

        return { lastTimes, saveTime, $reset };
    },
    {
        persist: true
    });
