<script>
	import "@fontsource-variable/dm-sans";
	import "../app.css";
	import { Toaster } from "svelte-french-toast";
	import { onMount } from "svelte";

	let { data, children } = $props();
	onMount(() => {
		console.log("layout.svelte", data.session);
	});
</script>

<Toaster />
{@render children()}
