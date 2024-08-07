import { writable } from "svelte/store";

const MinSliderStore = writable(0);
const MaxSliderStore = writable(500);
const RadiusSliderStore = writable(20);
const BlurSliderStore = writable(0.5);

export { MinSliderStore, MaxSliderStore, RadiusSliderStore, BlurSliderStore };
