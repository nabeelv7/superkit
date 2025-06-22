<script>
    import Phone from "$lib/components/Phone.svelte";
    import SectionOnboarding from "$lib/components/SectionOnboarding.svelte";

    /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
    let { data, children } = $props();
</script>

<div class="flex flex-wrap justify-center items-start sm:px-10 px-3 py-20 gap-10">
    <div class="flex flex-col gap-10 justify-start items-center">
        <SectionOnboarding />
        {@render children()}
    </div>
    <div class="bg-500">
        <Phone />
    </div>
</div>
