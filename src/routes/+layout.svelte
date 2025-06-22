<script>
	import "../app.css";

	let { data, children } = $props();
	console.log(data.session);
</script>

{@render children()}
