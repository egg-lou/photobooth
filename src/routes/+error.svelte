<script>
    import { page } from '$app/stores';
    import { alfHuhu, space } from '$lib/assets';
</script>

<div class="h-[90svh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative px-20" style="background-image:url({space})">
    <div class="absolute inset-0 bg-base-300 opacity-20 h-[90svh]"></div>
    <img src="{alfHuhu}" alt="Sad Alf" class="spin-shrink h-auto w-[350px]">
    <div class="fade-in flex flex-col justify-center items-center absolute w-full h-full">
        <span class="text-8xl text-[#DDDDDD]">{$page.status}</span>
        <span class="text-6xl font-bold text-[#DDDDDD]">{$page.error.message.toUpperCase()}</span>
    </div>
</div>

<style>
    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    @keyframes spin-shrink {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }

    .spin-shrink {
        animation: spin-shrink 3s linear forwards;
    }

    .fade-in {
        opacity: 0;
        animation: fade-in 1s ease-in-out 3s forwards;
    }
</style>
