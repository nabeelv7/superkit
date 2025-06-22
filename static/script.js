// Made with 🧡 and 🍩 by Nabeel
console.log("Hi from Nabeel! 👋")

const ua = navigator.userAgent;
const id = crypto.randomUUID();

const getLocation = async () => {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    const locationInfo = {
        country: data.country,
        city: data.city,
        flag: data.flag.img,
        isEU: data.is_eu,
    };

    return locationInfo;
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

// check for bots
const isBotUA = () => {
    const botPattern = /bot|crawl|slurp|spider|crawling|vercelbot|headless/i;
    return botPattern.test(navigator.userAgent);
};


// post the initial data
async function postInitialData() {
    try {
        const location = await getLocation();
        const visit = {
            crypto: id,
            location,
            referrer: getReferrer(),
            browser: getBrowser(),
            device: getDevice(),
            OS: getOS(),
            pages: [],
            entryPage: getEntryPage(),
        }

        console.log(visit)
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


// when user clicks a different link, send that link to /api/analytics/exit-link
const sendExitLink = () => {
    document.addEventListener("click", (e) => {
        let exitLink;
        const link = e.target.closest("a");
        if (
            link &&
            link.href &&
            !link.href.startsWith(window.location.origin)
        ) {
            exitLink = link.href;
            navigator.sendBeacon(
                "/api/analytics/exit-link",
                JSON.stringify({ exitLink }),
            );
        }
    });
}

// initialize the script
const init = async () => {
    if (isBotUA() || navigator.webdriver) {
        console.log("Bot detected — skipping analytics");
        return;
    }

    if (!sessionStorage.getItem("visiting")) {
        await postInitialData();
        sessionStorage.setItem('visiting', "true");
    }

    updatePages();
    sendExitLink();
}

init(); // call the main function
