<svelte:head>
    <title>Register | AWSCC-PUP Manila-Photobooth App</title>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Trash } from "phosphor-svelte";
    import { space, imageLinks } from "../../lib/assets/index.js";

    let currentAlfIndex = 0;

    const alf_urls = imageLinks;

    let formData = {
        pointPerson: "",
        emails: [{ value: "" }], 
    };

    let error = "";

    function addEmailField() {
        formData = {
            ...formData,
            emails: [...formData.emails, { value: "" }]
        };

        getAlfUrl();
    }

    function removeEmailField(index) {
        if (formData.emails.length > 1) {
            formData = {
                ...formData,
                emails: formData.emails.filter((_, i) => i !== index)
            };
        }

        getAlfUrl();
    }

    function getAlfUrl(){
        const newIndex = formData.emails.length;
        if (newIndex == 1){
            currentAlfIndex = 0;
        } else if (newIndex >= 2 && newIndex <= 4) {
            currentAlfIndex = newIndex - 1;
        } else {
            currentAlfIndex = 3;
        }
    }

    function validateForm() {
        const atLeastOneEmailFilled = formData.emails.some((email) => email.value.length > 0);
        if (!atLeastOneEmailFilled) {
            error = "Please enter at least one email address";
            return;
        }

        const pointPersonValue = formData.pointPerson.trim();
        if (!pointPersonValue) {
            error = "Please enter a point person"; 
            return;
        }

        const formDataCopy = { ...formData };
        localStorage.setItem("formData", JSON.stringify(formDataCopy));
    }

    function HandleReviewForm() {
        if (formData.pointPerson.length > 0 && formData.emails.length >= 1) {   
            goto("register/review");
        }
    }

    onMount(() => {
        const savedFormData = localStorage.getItem("formData");

        if (savedFormData) {
            const parsedFormData = JSON.parse(savedFormData);
            formData = parsedFormData;
        }
    });

    $: imgSrc = alf_urls[currentAlfIndex];
</script>

<div class="h-[90svh] flex justify-center items-center bg-cover bg-center bg-no-repeat relative" style=" background-image: url({space})">
    <div class="absolute inset-0 bg-base-300 opacity-20 h-[90svh]"></div>
    <div class="flex relative">
        <img src="{imgSrc}" alt="AWSCC PUP - Alf" class="h-[300px] absolute -left-10 bottom-0 z-[1] hidden lg:block sm:hidden md:h-[325px] xl:h-[350px]"/>
        <div class="w-[280px] hidden lg:block sm:hidden md:w-[280px] xl:w-[315px]"></div>
        <div class="bg-base-100 bg-opacity-80 rounded-2xl shadow-md h-[70svh]">
            <form on:submit|preventDefault={validateForm} class="flex flex-col justify-between h-full">
                <div class="space-y-4 flex-1 h-full">
                    <div class="space-y-2 bg-base-300 px-10 pt-10 pb-5 rounded-t-xl">
                        <div>
                            Point Person
                        </div>
                        <input type="text" placeholder="Name" class="input input-bordered input-base-200 w-full" bind:value={formData.pointPerson} required/>
                    </div>
                    <div class="hide-scrollbar h-[35svh] overflow-auto space-y-4 px-10 pb-5">
                    {#each formData.emails as {value}, index(index)}
                        <div class="space-y-2">
                            <div>
                                Email Address {index + 1}
                            </div>
                            <div class="flex space-x-2">
                                <input type="email" placeholder="Email Address" class="input input-bordered input-base-100 w-60 sm:w-72 md:w-96 xl:w-96" bind:value={formData.emails[index].value} required/>
                                <button class="text-error hover:text-accent active:text-base-300 transition-all" on:click={() => removeEmailField(index)}>
                                    <Trash size={20} weight="fill"/>
                                </button>
                            </div>
                        </div>
                    {/each}
                    </div>
                </div>
                <div class="flex space-x-2 justify-end px-10 pt-5 pb-10">
                    <button class="btn btn-outline btn-secondary w-28" on:click={addEmailField}>
                        Add Email
                    </button>
                    <button class="btn btn-primary w-28" on:click={HandleReviewForm}>
                        Review
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

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