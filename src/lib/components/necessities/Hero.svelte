<script>
  import { onMount } from 'svelte';
  import { spaceHero, space, alf4 } from '$lib/assets';
  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 768;
    });
  });

  function redirect() {
    window.location.href = '/register';
  }
</script>


{#if !isMobile}
<div class="hero min-h-screen bg-cover bg-center" 
    style="background-image: url({spaceHero});">
  <div class="hero-content text-center text-neutral-content">
  </div>
</div>
{:else}
  <div class="hero min-h-screen bg-cover bg-center" 
    style="background-image: url({space});">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md px-10 md:px-0 flex flex-col justify-center items-center text-white">
      <h1 class="mb-5 text-2xl md:text-4xl  font-bold text-center">Welcome to the AWSCC-PUP Photobooth!</h1>
      <img src={alf4} alt="" class=" w-40 mb-5">
      <p class="mb-5 text-center">Capture and share your memorable moments with our amazing photobooth experience. Get started now!</p>
      <button on:click={redirect} class="btn btn-primary">Register Now!</button>
    </div>
  </div>
</div>
{/if}

