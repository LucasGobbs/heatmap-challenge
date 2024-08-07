<script lang="ts">
  export let heatmapInstance: any;
  export let imageDivReference: any;
  function downloadImage() {
    const heatmapCanvas = heatmapInstance._renderer.canvas;

    // Create an off-screen canvas
    let canvas = document.createElement("canvas");
    canvas.width = imageDivReference.clientWidth;
    canvas.height = imageDivReference.clientHeight;

    const ctx = canvas.getContext("2d");

    // Draw the image
    ctx?.drawImage(
      imageDivReference as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    // Draw the heatmap
    ctx?.drawImage(heatmapCanvas, 0, 0, canvas.width, canvas.height);

    // Create a download link
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "heatmap-overlay.png";
    link.click();
  }
</script>

<button
  class="mt-12 py-2.5 px-5 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:scale-110 transition-transform hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  on:click={downloadImage}
>
  Download Image
</button>
