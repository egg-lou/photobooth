<script>
  import { space, alf4 } from "../../lib/assets/index.js";
  import { goto } from '$app/navigation'
  let username = "";
  let password = "";
  let isLoading = false;

const handleSubmit = async () => {
isLoading = true;
const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    credentials: 'include',
});
isLoading = false;
goto('/admin');
}
</script>

{#if isLoading}
    <div class="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
        <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
{/if}

<div class="h-[90svh] flex justify-center items-center bg-cover bg-center bg-no-repeat relative" style=" background-image: url({space})">
    <div class="absolute inset-0 bg-base-300 opacity-20 h-[90svh]"></div>
    <div class="flex relative">
        <img src="{alf4}" alt="AWSCC PUP - Alf" class="h-[300px] absolute -left-10 bottom-0 z-[1] hidden lg:block sm:hidden md:h-[325px] xl:h-[350px]"/>
        <div class="w-[280px] hidden lg:block sm:hidden md:w-[280px] xl:w-[315px]"></div>
        <div class="bg-base-100 bg-opacity-80 rounded-2xl shadow-md h-[70svh]">
            <form on:submit|preventDefault={handleSubmit} class="flex flex-col justify-between h-full">
                <div class="space-y-4 flex-1 h-full">
                    <div class="space-y-2 bg-base-300 px-10 pt-10 pb-5 rounded-t-xl">
                        <div>
                            Username
                        </div>
                        <input type="text" placeholder="Name" class="input input-bordered input-base-200 w-full" bind:value={username} required/>
                    </div>
                    <div class="hide-scrollbar h-[35svh] overflow-auto space-y-4 px-10 pb-5">
                        <div class="space-y-2">
                            <div>
                                Password
                            </div>
                            <div class="flex space-x-2">
                                <input type="password" placeholder="Password" class="input input-bordered input-base-100 w-60 sm:w-72 md:w-96 xl:w-96" bind:value={password} required/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 justify-end px-10 pt-5 pb-10">
                    <button class="btn btn-primary w-28" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>