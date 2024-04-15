<script>
  import { alfHuhu, alfSwag } from '../../assets/index.js';

  export let statusModal = "";
  let image = "";

  $: if (statusModal === "SUCCESS") {
    image = "https://awscc-photobooth.s3.ap-southeast-1.amazonaws.com/assets/Swag+Alf.png";
  } else if (statusModal === "ERROR") {
    image = "https://awscc-photobooth.s3.ap-southeast-1.amazonaws.com/assets/Aww+Alf.png";
  }
</script>

<div class="flex flex-col justify-center items-center space-y-3">
  <h3 class="font-bold text-lg text-base-content">{statusModal}</h3>
  <img src={image} class="w-full h-auto" alt="status">
</div>