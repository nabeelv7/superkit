<script>
	import "@fontsource-variable/dm-sans";
	import "../app.css";

	let { data, children } = $props();
	console.log(data.session);
</script>

{@render children()}
