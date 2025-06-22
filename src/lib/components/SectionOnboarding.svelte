<script>
    import { page } from "$app/state";
    import { signOut } from "@auth/sveltekit/client";
</script>

<button class="btn btn-error" onclick={() => signOut()}>Logout</button>
<ul class="steps">
    <li class="step step-primary md:w-50 sm:w-30 w-20">
        <span class="step-icon">👋</span>
        <a href="/dashboard">Claim</a>
    </li>
    <li
        class="step md:w-50 sm:w-30 w-20"
        class:step-primary={page.url.href.match(/pfp|links|deploy/g)}
    >
        <span class="step-icon">📷</span>
        <a href="/dashboard/pfp">Image</a>
    </li>
    <li
        class="step step-primary md:w-50 sm:w-30 w-20"
        class:step-primary={page.url.href.match(/links|deploy/g)}
    >
        <span class="step-icon">🔗</span>
        <a href="/dashboard/links">Add Links</a>
    </li>
    <li
        class="step step-primary md:w-50 sm:w-30 w-20"
        class:step-primary={page.url.href.match(/deploy/g)}
    >
        <span class="step-icon">🌐</span>
        <a href="/dashboard/deploy">Deploy</a>
    </li>
</ul>
