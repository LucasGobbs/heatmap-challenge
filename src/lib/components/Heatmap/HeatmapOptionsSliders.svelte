<script lang="ts">
  // @ts-ignore
  import Slider from "@bulatdashiev/svelte-slider";
  import {
    MinSliderStore,
    MaxSliderStore,
    RadiusSliderStore,
    BlurSliderStore,
  } from "./SliderStore.js";
  let rangeMin = [0, 1000];
  let rangeMax = [100, 1000];

  $: {
    const [min] = rangeMin;
    $MinSliderStore = min;
  }
  $: {
    const [max] = rangeMax;
    $MaxSliderStore = max;
  }
</script>

<div class="w-full text-white text-lg">
  <span>
    Minimum Value: <span class="font-bold">{rangeMin[0]}</span>
  </span>
  <Slider max="1000" step="10" bind:value={rangeMin} order />

  <span class="mt-2">
    Maximum Value: <span class="font-bold">{rangeMax[0]}</span>
  </span>
  <Slider max="1000" step="10" bind:value={rangeMax} order />
</div>
