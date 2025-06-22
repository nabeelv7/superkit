<script>
    import { page } from "$app/state";
    import ButtonGithub from "$lib/components/ButtonGithub.svelte";
</script>

<button class="btn" onclick={postData}>Post Data</button>
{#if !page.data.session}
    <ButtonGithub>Continue with Github</ButtonGithub>
{:else}
    <p>Welcome {page.data.session.user.name}</p>
{/if}

<a href="https://onedollarstats.com">Click</a>
