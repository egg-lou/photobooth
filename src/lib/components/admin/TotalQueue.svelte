<script>
  import { User } from 'phosphor-svelte'

  export let totalQueue = 0;
</script>

<div class="shadow w-full h-[57px] bg-base-200 rounded-lg flex items-center p-4 gap-2">
  <User size={20} weight="fill"/>
  <p>Total Queue: {totalQueue}</p>
</div>