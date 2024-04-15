<script lang="ts">
  import { goto } from'$app/navigation';
  import { AWSCCLOGO, space, alfUFO } from '../../../../lib/assets/index.js';
  
  function newRequest() {
    goto('/register');
  }
</script>

<div class="h-[90svh] flex justify-center items-center  bg-cover bg-center bg-no-repeat relative" style="background-image: url({space})">
    <div class="absolute inset-0 bg-base-300 opacity-20 h-[90svh]"></div>
    <div class="flex flex-col justify-center items-center  bg-opacity-80 h-[70svh] w-[85svw] xl:w-[50svw] md:w-[70svw] sm:w-[80svw] rounded-xl bg-base-200 relative gap-7">
      <div class="px-4 font-medium flex flex-col justify-center items-center text-sm md:text-xl text-center">
        <span>Your request has been submitted. Please tell the booth the name you gave as the point person.</span>
      </div>
      
      <!-- pls upload this -->
      <img src="{alfUFO}" alt="Alf in UFO" class=" w-40 md:w-60">
      <span class="px-4 font-medium flex flex-col justify-center items-center text-sm md:text-xl text-center">Thank you for registering!</span>
      <button on:click={newRequest} class="btn btn-outline btn-primary">New Request</button> 
    </div>
</div>