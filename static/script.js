const ua = navigator.userAgent;

const getCountry = () => {
    return "USA";
}

// initial function
const getReferrer = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = document.referrer || params.get("ref");
};

// initial function
const getBrowser = () => {
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("MSIE") || ua.includes("Trident/")) return "Internet Explorer";

    return "Unknown";
}

// initial function
const getDevice = () => {
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
}

// initial function
function getOS() {
    if (/Windows NT/.test(ua)) return "Windows";
    if (/Mac OS X/.test(ua)) return "MacOS";
    if (/Linux/.test(ua)) return "Linux";
    if (/Android/.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";

    return "Unknown";
}


// update function
const getExitLink = () => {
    let exitLink = null;

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (
            link &&
            link.href &&
            !link.href.startsWith(window.location.origin)
        ) {
            exitLink = link.href;

            // Optional: send to server
            navigator.sendBeacon(
                "/api/track",
                JSON.stringify({ url: exitLink }),
            );
        }
    });
}


async function postData(url) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(visit),
        })

        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log("Error while sending data! 😭")
    }
}