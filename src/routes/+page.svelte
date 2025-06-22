<script>
    import { page } from "$app/state";
    import ButtonGithub from "$lib/components/ButtonGithub.svelte";
    import { signOut } from "@auth/sveltekit/client";
</script>

{#if !page.data.session}
    <ButtonGithub>Continue with Github</ButtonGithub>
{:else}
    <p>Welcome {page.data.session.user.name}</p>
    <button onclick={() => signOut()} class="btn btn-error">Logout</button>
{/if}
