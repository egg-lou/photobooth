<script>
  import { ClipboardText } from 'phosphor-svelte'
  import { ArrowRight } from 'phosphor-svelte'
  import { chosenRequest } from '../../stores/Request.js';
  export let requestId = "";
  export let emails = [];
  export let status = "";
  export let pointPerson = "";
  let presignedUrl;

  let showRequest = false;

  chosenRequest.subscribe(value => {
    showRequest = value && value.requestId === requestId;
  });

  async function chooseRequest() {
    if (showRequest) {
      chosenRequest.set(null);
    } else {
      localStorage.setItem("showRequest", "true");
      chosenRequest.set({
        requestId,
        emails,
        status,
        pointPerson,
      });
    }
  }

</script>

<div>
  <button on:click={chooseRequest} class="grid grid-cols-4 grid-rows-6 gap-0 btn w-full h-[5rem]">
      <div class="row-span-2 row-start-3 flex justify-center items-center">
        <ClipboardText size={46} weight="fill"/>
      </div>
      <div class="col-span-5 row-span-2 row-start-2 col-start-2 flex items-start text-sm">Request:
        {pointPerson.length > 8 ? `${pointPerson.slice(0, 8)}...` : pointPerson}
      </div>
      <div class="col-span-3 row-span-1 col-start-2 row-start-4 gap-2 items-center text-sm  inline-flex">View Request <ArrowRight size={12}/>
      </div>
  </button>
</div>
