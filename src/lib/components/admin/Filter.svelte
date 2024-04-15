<script>
    import { Funnel } from "phosphor-svelte";
    import { chosenFilter } from "../../stores/FilterOption.js";

    let selectedOption = "";

    let filterOptions = {
        "all" : "All",
        "pending": "Pending",
        "sent": "Sent",
        "cancelled": "Cancelled"
    }

    function selectOption(option){
        selectedOption = option;
        chosenFilter.set(option);
    }

    function toSentenceCase(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
</script>


<div class="dropdown dropdown-bottom dropdown-end">
  <div tabindex="0" role="button" class="btn flex min-w-min -space-x-1">
    <span><Funnel size={14} weight="fill" /></span>
    <span>{toSentenceCase(selectedOption) || "Filter"}</span>
  </div>
  <ul tabindex="0" class="dropdown-content mt-3 z-[1] menu shadow bg-base-100 text-base-content">
    {#each Object.keys(filterOptions) as option}
    <button on:click={() => selectOption(option)}>
        <li><a>{filterOptions[option]}</a></li>
    </button>
    {/each}
  </ul>
</div>