<script>
  import RequestButton from "./RequestButton.svelte";

  export let requestQueue = [];
</script>

<div class="w-full h-screen rounded-lg px-2 py-2 gap-3 flex flex-col">
  {#if requestQueue}
    {#each requestQueue as { requestId, emails, status, pointPerson, presigned } (requestId)}
        <RequestButton 
          requestId={requestId} 
          emails={emails} 
          status={status} 
          pointPerson={pointPerson}
          presigned={presigned}
        />
    {/each}
  {:else}
    <div>Loading...</div>
  {/if}
</div>