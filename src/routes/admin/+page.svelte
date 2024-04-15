<svelte:head>
    <title>Admin | AWSCC-PUP Manila-Photobooth App</title>
</svelte:head>

<script>
import { TotalQueue, Filter, QueueList, EmailsContainer, RequestDetails, UploadContainer, DeleteButton, DefaultPane } from '$lib/components/admin';

import { onMount } from 'svelte';
import { chosenFilter } from '../../lib/stores/FilterOption.js';
import { Envelope } from 'phosphor-svelte';
import { chosenRequest } from '../../lib/stores/Request.js';
import { Refetch } from '../../lib/stores/Refetch.js';

let totalQueue = 0;
let filterOption = "";
export let requestQueue;
let data;
let emails = [];
let status = "";
let pointPerson = "";
let requestId = "";
let showRequest = false;
let isLoading = false;

chosenFilter.subscribe(value => {
    filterOption = value;
});

chosenRequest.subscribe(value => {
    if(value){
        emails = value.emails;
        status = value.status;
        pointPerson = value.pointPerson;
        requestId = value.requestId;
        showRequest = true;
    } else {
        showRequest = false;
    }
});

Refetch.subscribe(async value => {
    if(value){
        console.log("Refetching");
        await fetchRequests();
        getTotalQueue();
    }

    setTimeout(() => {
        Refetch.set(false);
    }, 200);
});

chosenFilter.subscribe(filter => {
    switch(filter){
    case "all":
        requestQueue = data;
        break;
    case "pending":
        requestQueue = data.filter((data) => data.status === "pending");
        break;
    case "sent":
        requestQueue = data.filter((data) => data.status === "sent");
        break;
    case "cancelled":
        requestQueue = data.filter((data) => data.status === "cancelled");
        break;
        default:
            requestQueue = data;
        }
});

$: if ($Refetch) {
    fetchRequests();
    getTotalQueue();
}

async function fetchRequests() {
    isLoading = true;
    const response = await fetch ('/api/getRequests');
    const result = await response.json();
    requestQueue = result.requests;
    requestQueue = sortDataByRequestId(requestQueue);
    data = result.requests;
    isLoading = false;
}

async function getTotalQueue() {
    totalQueue = requestQueue.filter((data) => data.status === "pending").length;
}

function sortDataByRequestId(data) {
    return data.sort((a, b) => {
        const requestIdA = a.requestId;
        const requestIdB = b.requestId;
        return requestIdA.localeCompare(requestIdB);
    });
}

onMount(async () => {
    await fetchRequests();
    getTotalQueue();

});
</script>

{#if isLoading}
    <div class="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
        <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
{/if}

<div class="h-[90svh] flex">
    <div class="md:w-[35svw] lg:w-[30svw] xl:w-[30svw] p-6 space-y-5 bg-neutral">
        <TotalQueue {totalQueue}/>
        <div class="flex justify-between items-center">
            <h2 class="text-content font-bold text-sm pl-2 text-neutral-content"><span>Requests:</span></h2>
            <Filter />
        </div>
        <div class="hide-scrollbar overflow-auto h-[65svh]">
            <QueueList {requestQueue}/>
        </div>
    </div>
    <div class="w-full h-full p-10 flex space-x-6">
        {#if showRequest}
        <div class="h-full flex flex-col justify-center">
            <div class="w-64 flex items-center space-x-1 bg-base-300 text-base-content rounded-t-lg p-5">
                <Envelope size={25} weight="fill" />
                <h3 class=" text-lg">Emails</h3>
            </div>
            <div class="hide-scrollbar overflow-y-auto space-y-3 flex flex-col h-full px-5 pb-5 bg-base-300 shadow rounded-b-lg w-64">
                <EmailsContainer {emails}/>
            </div>
        </div>
        <div class="w-full h-[80svh] flex flex-col items-center space-y-3">
            <div class="w-full flex justify-end pb-1">
                <DeleteButton {requestId}/>
            </div>
            <RequestDetails {status} {pointPerson} {requestId} />
            <UploadContainer {requestId} />
        </div>
        
        {:else}
            <DefaultPane />
        {/if}
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