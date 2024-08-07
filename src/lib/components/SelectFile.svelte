<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let title: string = "Upload File";
  export let fileType: "text" | "image" = "text";
  export let fileTypeAlias: string[] = [];
  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = String(e.target?.result);
        dispatch("FileReaded", { fileContent });
      };
      if (fileType == "text") reader.readAsText(file);
      else if (fileType == "image") reader.readAsDataURL(file);
    }
  }
</script>

<div class="mt-5 w-1/3 flex flex-col align-middle">
  <label class="block mb-1 text-2xl font-medium text-white" for="file_input">
    {title}
  </label>
  <input
    class="file:bg-gray-100 file:mr-2 file:px-3 file:text-black file:rounded-md file:border-0 file:font-bold
    shadow-lg w-5/6
    text-md file:py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none"
    id="file_input"
    type="file"
    on:change={handleFileUpload}
  />
  <p class=" text-sm text-gray-50 dark:text-gray-300">
    {fileTypeAlias.join(" ")}
  </p>
</div>
