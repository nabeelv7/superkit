<script>
    import { page } from "$app/state";
    import ButtonGithub from "$lib/components/ButtonGithub.svelte";

    const postData = async () => {
        const res = await fetch("/api/track", {
            method: "POST",
        });
        const data = await res.json();
        console.log("DATA", data);
    };
    const getReferrer = () => {
        const ref = document.referrer();
        console.log(ref);
    };
</script>

<button class="btn" onclick={postData}>Post Data</button>
{#if !page.data.session}
    <ButtonGithub>Continue with Github</ButtonGithub>
{:else}
    <p>Welcome {page.data.session.user.name}</p>
{/if}
