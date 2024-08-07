<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import ComboBox from "../ui/Combobox.svelte";
  import HeatmapOptionsSliders from "./HeatmapOptionsSliders.svelte";
  import HeatmapDownloadButton from "./HeatmapDownloadButton.svelte";
  import h337 from "heatmap.js";
  import {
    adaptCoordinatesToImgSize,
    type Size,
  } from "../../utils/AdaptCoordinatesToImg";
  import { ExtractDataFromElastic } from "../../utils/ExtractDataFromElastic";
  import { MinSliderStore, MaxSliderStore } from "./SliderStore.js";

  import { heatmapDefaultConfig } from "./HeatmapConfig";

  export let jsonData: string = "";
  export let imageBase64: string = "";

  let heatmapInstance: any;
  let heatmapDivReference: HTMLElement;

  let filterToHeatmap: string;
  let jsonDataOptions: Array<{ value: string }>;

  let originalSize: Size;
  let imageDivReference: HTMLImageElement;

  function createHeatmap() {
    if (heatmapDivReference && jsonData) {
      const currentSize = {
        // width: imageDivReference.clientWidth,
        width: originalSize.width,
        // height: imageDivReference.clientHeight,
        height: originalSize.height,
      };
      const extractDataFromElastic = new ExtractDataFromElastic();
      extractDataFromElastic.extract(jsonData);
      const filterOptions = extractDataFromElastic.getKeys();
      jsonDataOptions = filterOptions.map((value) => ({ value }));

      const adjustedPoints = extractDataFromElastic
        .getDataFromKey(filterToHeatmap)
        .map((point) => ({
          ...adaptCoordinatesToImgSize(point, originalSize, currentSize),
          value: 50,
        }));

      if (!heatmapInstance) {
        heatmapInstance = h337.create({
          container: heatmapDivReference,
          ...heatmapDefaultConfig,
        });
      }

      heatmapInstance.setData({
        min: $MinSliderStore,
        max: $MaxSliderStore,
        data: adjustedPoints,
      });
      heatmapInstance.repaint();
    }
  }

  $: {
    const flag = originalSize;
    createHeatmap();
  }

  $: {
    const minValue = $MinSliderStore;
    const maxValue = $MaxSliderStore;

    heatmapInstance?.setDataMax(maxValue);
    heatmapInstance?.setDataMin(minValue);
  }

  function onChoosedOption(event: CustomEvent<any>) {
    filterToHeatmap = event.detail.value;
    createHeatmap();
  }

  onMount(() => {
    const img = new Image();
    img.onload = () => {
      originalSize = {
        width: img.width,
        height: img.height,
      };

      createHeatmap();
    };
    img.src = imageBase64;
  });
</script>

<div class="flex flex-row w-full h-full mt-10">
  <div
    class=" lg:w-2/3 lg:h-full object-scale-down rounded-lg bg-gray-800"
    id="heatmapContainer"
  >
    {#if originalSize}
      <img
        class="absolute z-0 top-0 left-0 object-left-top object-none"
        alt="to be overlayed with heatmap"
        bind:this={imageDivReference}
        src={imageBase64}
        width={originalSize.width}
        height={originalSize.height}
      />
    {/if}

    <div
      class="absolute top-0 left-0 w-full h-full z-10"
      bind:this={heatmapDivReference}
    ></div>
  </div>

  <div class="ml-2 w-1/3 p-4 text-white rounded-lg">
    <h2 class="text-2xl font-medium">Heatmap Options</h2>
    <div class="h-2" />
    <h3 class="text-lg">Filter Text</h3>
    <div class="text-black">
      <ComboBox on:OptionChoosed={onChoosedOption} options={jsonDataOptions} />
    </div>

    <div class="h-4" />
    <HeatmapOptionsSliders />
    <div class="w-full flex justify-center content-center align-middle">
      <HeatmapDownloadButton {heatmapInstance} {imageDivReference} />
    </div>
  </div>
</div>

<style>
  #heatmapContainer {
    position: relative;
    /* width: 800px;
    height: 500px; */
  }

  img {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
