<script lang="ts">
  import Heatmap from "../components/Heatmap/Heatmap.svelte";
  import SelectFile from "../components/SelectFile.svelte";

  let jsonData: string;
  let imageBase64: string;
  function onFileReadedJson(event: CustomEvent<any>) {
    jsonData = event.detail.fileContent;
  }
  function onFileReadedImage(event: CustomEvent<any>) {
    imageBase64 = event.detail.fileContent;
  }
</script>

<div class="h-screen w-full flex bg-gray-600 flex-col p-2 items-center">
  <h1
    class="md:text-4xl lg:text-6xl tracking-wide font-mont font-bold leading-tight text-center text-white"
  >
    Heatmap Explorer
  </h1>
  <div
    class="text-white w-11/12 h-full flex flex-col align-middle content-center justify-items-center"
  >
    <div class="flex flex-row w-full items-center align-middle justify-center">
      <SelectFile
        title={"Upload Json File"}
        fileTypeAlias={[".json", ".txt"]}
        on:FileReaded={onFileReadedJson}
      />
      <SelectFile
        title="Upload Image File"
        fileTypeAlias={[".png", ".jpg"]}
        fileType="image"
        on:FileReaded={onFileReadedImage}
      />
    </div>
    <hr
      class="mt-4 mb-6 h-0.5 border-t-0 bg-gray-700 shadow-md dark:bg-white/10"
    />

    {#if jsonData && imageBase64}
      <Heatmap {jsonData} {imageBase64} />
    {:else}
      <div></div>
    {/if}
  </div>
</div>
