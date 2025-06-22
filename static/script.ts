const ua = navigator.userAgent;

const getCountry = () => {
    return "USA";
}

const getReferrer = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = document.referrer || params.get("ref");
    return ref;
};

const getBrowser = () => {
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("MSIE") || ua.includes("Trident/")) return "Internet Explorer";

    return "Unknown";
}

const getDevice = () => {
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
}

function getOS() {
    if (/Windows NT/.test(ua)) return "Windows";
    if (/Mac OS X/.test(ua)) return "MacOS";
    if (/Linux/.test(ua)) return "Linux";
    if (/Android/.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";

    return "Unknown";
}

const getEntryPage = () => {
    if (!sessionStorage.getItem("entrypage")) {
        const path = window.location.pathname;
        sessionStorage.setItem("entrypage", path);
        return path;
    }
    return sessionStorage.getItem("entrypage");
};

const getCurrentPage = () => {
    return window.location.pathname;
}

// post the initial data
async function postData() {
    try {
        const visit = {
            country: getCountry(),
            referrer: getReferrer(),
            browser: getBrowser(),
            device: getDevice(),
            OS: getOS(),
            pages: [getCurrentPage()],
            entryPage: getEntryPage(),
        }

        const res = await fetch("/api/analytics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(visit),
        })

        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error("Error while sending data! 😭")
    }
}

sessionStorage.setItem('visiting', "true");
if (!sessionStorage.getItem("visiting")) {
    postData();
}

// post the new page to /api/analytics/update-pages, where the new page is taken and added to the visitor pages array
const updatePages = async () => {
    try {
        const currentPage = getCurrentPage();
        let pages = JSON.parse(sessionStorage.getItem("visitedPages")) || [];

        if (!pages.includes(currentPage)) {
            pages.push(currentPage);
            sessionStorage.setItem("visitedPages", JSON.stringify(pages));

            await fetch("/api/update-pages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pages }),
            });
        }
    } catch (err) {
        console.error("Failed to update pages! 😩");
    }
};
