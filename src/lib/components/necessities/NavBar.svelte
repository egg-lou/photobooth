<script>
    import ThemeChanger from "./ThemeChanger.svelte";
    import { onMount } from 'svelte';

    import { AWSCCLOGO } from "$lib/assets";
    let isMobile = false;
    let isAdmin;
    let isLoading = false;

    async function logout() {
        isLoading = true;
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        isLoading = false;

        if (response.status === 200) {
            window.location.href = '/';
        }
    }

    onMount(() => {
        isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
        });
    setTimeout(() => {
        isAdmin = window.location.pathname.includes('admin');
    }),200;
});

</script>

{#if isLoading}
    <div class="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
        <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
{/if}

<div class="navbar bg-base-200 shadow border-b-4 border-primary h-[4.5em]">
    <div class="flex-1">
        <a href="/" class="flex items-center space-x-3 text-lg px-3">
        <img src="{AWSCCLOGO}" alt="" class="w-10 md:block">
        <span class="hidden md:block">AWSCC-PUP Manila Photobooth</span>
        </a>
    </div>

    <div class="flex space-x-4 pr-3">
        <ul class="menu menu-horizontal px-1 items-center">
            {#if !isMobile}
            <li><a href="/register">Register</a></li>
            <li><a href="/admin">Admin</a></li>
                {#if isAdmin}
                    <li><a on:click={logout}>Logout</a></li>
                {/if}
            {/if}
        </ul>
        <ThemeChanger />
    </div>
</div>