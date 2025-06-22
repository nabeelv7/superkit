<script>
    import { page } from "$app/state";
    import ButtonGithub from "$lib/components/ButtonGithub.svelte";
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

<button class="btn" onclick={postData}>Post Data</button>
{#if !page.data.session}
    <ButtonGithub>Continue with Github</ButtonGithub>
{:else}
    <p>Welcome {page.data.session.user.name}</p>
{/if}

<a href="https://onedollarstats.com">Click</a>
