<script>
    import { X } from "phosphor-svelte";
    import { alfUFO } from '$lib/assets';
    import  UploadStatus from "../../components/admin/UploadStatus.svelte";
    
    export let requestId = "";
    export let status = "";
    let selectedImages = [];
    let isLoading = false;

async function loopUpload(presignedUrls) {
    for (const key in presignedUrls) {
        const { url, fields } = presignedUrls[key];
        const image = selectedImages.find(img => img.name === key);
        if (image) {
            try {
                uploadToS3(key, url, fields, image);
            } catch (error) {
                console.error("Error uploading image:", error);
                status = "ERROR";
            }
        } else {
        }
    }
}

async function uploadToS3(key, url, fields, image) {
    const formData = new FormData();

    for(const key in fields) {
        formData.append(key, fields[key]);
    }

    formData.append('file', image);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}

async function presigner(images, requestId) {
    try {
        isLoading = true;
        const objects = images.map((image) => image.name);
        const folderName = requestId;

        const payload = {
            objects,
            folderName
        }
        const response = await fetch('/api/completeRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if(!response.ok) {
            throw new Error('Network response was not ok');
            status = "ERROR";
        }

        const jsonResponse = await response.json();
        const presignedUrls = jsonResponse.presignedPosts;
        await loopUpload(presignedUrls);
        isLoading = false;
        status = "SUCCESS";
    } catch (error) {
        console.error("Error presigning images:", error);
        status = "ERROR"
    }
}

function handleFileChange(event) {
    const fileInput = event.currentTarget;
    const files = fileInput.files;
    if(files){
        selectedImages = Array.from(files);
    }
}

async function handleUpload() {
    await presigner(selectedImages, requestId);
}

function removeImage(index) {
    selectedImages = selectedImages.filter((_, i) => i !== index);
    const dataTransfer = new DataTransfer();
    for (const image of selectedImages) {
        dataTransfer.items.add(image);
    }
    const fileInput = document.querySelector('.file-input');
    fileInput.files = dataTransfer.files;
}

</script>

{#if isLoading}
    <div class="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
        <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
{/if}

<div class="shadow flex flex-col items-center w-full p-10 rounded-lg bg-base-200 border-base-300 justify-between space-y-4">
    <div class="h-[40svh] flex flex-col justify-top space-y-4">
        <input type="file" multiple class="file-input file-input-bordered file-input-neutral w-full h-14 max-w-xs border" on:change={handleFileChange} />
        <div class="hide-scrollbar overflow-y-auto h-full space-y-4 bg-base-300 p-4 rounded-lg shadow">
            {#if selectedImages.length === 0}
            <div class="flex flex-col justify-center w-full items-center h-full">
                    <img src="{alfUFO}" class="w-[75px] h-auto " alt="AWSCC Pup Manila Logo">
                </div>
            {:else}
                {#each selectedImages as image, index (image.name)}
                    <div class="shadow flex items-center max-w-xs bg-neutral p-3 rounded-sm" data-index="{index}">
                        <div class="w-full overflow-clip text-xs text-neutral-content">
                            {image.name}
                        </div>
                        <button class="text-error hover:text-base-100 active:text-accent transition-all" on:click={() => removeImage(index)}>
                            <X size={16} />
                        </button>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
    <div>
        <label for="my_modal_1" class="btn btn-outline btn-primary {selectedImages.length === 0 ? 'pointer-events-none opacity-10' : ''}" on:click={handleUpload}>Submit</label>
        <input type="checkbox" id="my_modal_1" class="modal-toggle"/>
        <div class="modal" role="dialog">
            <div class="modal-box bg-base-200 w-72">
              <UploadStatus statusModal={status} />
            </div>
            <label class="modal-backdrop" for="my_modal_1">Close</label>
        </div>
    </div>
</div>

<style>
    .hide-scrollbar::-webkit-scrollbar-track {
        display: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .hide-scrollbar::-webkit-scrollbar-thumb {
        display: none;
    }
</style>