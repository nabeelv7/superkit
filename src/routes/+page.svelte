<script>
    import { page } from "$app/state";
    import ButtonGithub from "$lib/components/ButtonGithub.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        const ua = navigator.userAgent;
        console.log(ua)

        // initial function
        const getBrowser = () => {
            if (ua.includes("Edg/")) return "Edge";
            if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
            if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
            if (ua.includes("Safari/") && !ua.includes("Chrome"))
                return "Safari";
            if (ua.includes("Firefox/")) return "Firefox";
            if (ua.includes("MSIE") || ua.includes("Trident/"))
                return "Internet Explorer";

            return "Unknown";
        };

        // initial function
        const getDevice = () => {
            if (/Mobi|Android/i.test(ua)) return "Mobile";
            if (/Tablet|iPad/i.test(ua)) return "Tablet";
            return "Desktop";
        };

        // initial function
        function getOS() {
            if (/Windows NT/.test(ua)) return "Windows";
            if (/Mac OS X/.test(ua)) return "MacOS";
            if (/Linux/.test(ua)) return "Linux";
            if (/Android/.test(ua)) return "Android";
            if (/iPhone|iPad|iPod/.test(ua)) return "iOS";

            return "Unknown";
        }

        console.log(getBrowser(), getDevice(), getOS());
    });
</script>

<button class="btn" onclick={postData}>Post Data</button>
{#if !page.data.session}
    <ButtonGithub>Continue with Github</ButtonGithub>
{:else}
    <p>Welcome {page.data.session.user.name}</p>
{/if}

<a href="https://onedollarstats.com">Click</a>
