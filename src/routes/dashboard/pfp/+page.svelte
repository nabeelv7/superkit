<script>
    let imageUrl = $state("");
    let fileName = $state("");
    let isUploading = $state(false);

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        fileName = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        isUploading = true;

        await setTimeout(() => {
            console.log(yo);
        }, 2000);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();
            console.log(result);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            isUploading = false;
        }
    }
</script>

<fieldset class="fieldset">
    <legend class="fieldset-legend">Pick an image</legend>
    <input
        accept="image/*"
        type="file"
        class="file-input"
        onchange={handleImageUpload}
    />
    <span class="span">Max size 1MB</span>
</fieldset>

{#if isUploading}
    <div class="mt-4 text-center">
        <div
            class="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin mx-auto"
        ></div>
        <p class="text-sm text-gray-500 mt-2">Uploading...</p>
    </div>
{/if}

{#if imageUrl}
    <div class="mt-4">
        <img src={imageUrl} alt="Preview" class="rounded shadow min-w-md" />
    </div>
{/if}
