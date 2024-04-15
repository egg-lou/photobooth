<script>
    export let requestId = "";
    export let pointPerson = "";
    export let status = ""; 

    function toSentenceCase(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
</script>

<div class="w-full bg-neutral h-[3rem] rounded-lg flex justify-evenly items-center text-neutral-content">
    <p>Request ID: <span class="font-semibold text-primary">{requestId}</span></p>
    <p>Point Person: <span class="font-semibold text-primary">{pointPerson}</span></p>
    <p>Status: <span class="font-semibold text-primary">{toSentenceCase(status)}</span></p>
</div>