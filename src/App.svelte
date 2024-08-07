<script lang="ts">
  import TailwindCss from "./lib/TailwindCSS.svelte";
  import Router, { location, link } from "svelte-spa-router";
  import Home from "./lib/pages/Home.svelte";
</script>

<Router
  routes={{
    "/": Home,
  }}
  restoreScrollState={true}
/>

<!-- /#{$location} -->
