const getCountry = () => {
    return "USA";
}

const getReferrer = () => {
    const ref = document.referrer();
    console.log(ref)
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