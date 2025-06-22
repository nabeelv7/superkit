<script>
    import state from "../../state.svelte";
</script>

<div class="aspect-[9/18] md:w-100 sm:min-w-sm w-80">
    <div
        class="w-full h-full rounded-4xl border-15 border-black flex flex-col justify-center items-center"
    >
        <iframe src={state.iframeUrl} class="w-full h-full"></iframe>
    </div>
</div>
