<script>
  export let emails = [];
</script>

{#each emails as email, index (email)}
  <div class="flex bg-base-100 p-3 w-full space-x-2 shadow rounded-sm">
    <span class="text-xs bg-secondary text-center px-2 py-1 text-secondary-content rounded-full">
      {index + 1}
    </span> 
    <span class="hide-scrollbar text-xs text-base-content flex flex-col justify-center overflow-clip overflow-x-auto">
      {email}
    </span>
  </div>
{/each}

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