<script>
    import { Refetch } from "../../stores/Refetch.js";

    export let requestId = "";
    let isLoading = false;

    async function deleteRequest() {
        console.log("Deleting request", requestId);
        isLoading = true;
        try {
            const response = await fetch ('/api/deleteRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            })
            Refetch.set(true);
            isLoading = false;
        } catch (error) {
            console.error(error);
            isLoading = false;
        }
    }

</script>

{#if isLoading}
    <div class="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
        <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
{/if}

<button on:click={deleteRequest} class="btn btn-outline btn-error">Delete Request</button>