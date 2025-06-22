<script>
    let { data } = $props();

    import { onMount } from "svelte";

    onMount(() => {
        const getEntryPage = () => {
            if (!sessionStorage.getItem("entrypage")) {
                const path = window.location.pathname;
                sessionStorage.setItem("entrypage", path);
                return path;
            }
            return sessionStorage.getItem("entrypage");
        };

        console.log(getEntryPage());
    });
</script>

<h1>analytics</h1>