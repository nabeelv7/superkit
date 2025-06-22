<script>
    import { page } from "$app/state";
    const user = page.data.session.user;
</script>

<h1>{user.name}'s Page</h1>
