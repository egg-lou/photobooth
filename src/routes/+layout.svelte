<script>
    import "../app.css";
    import NavBar from "../lib/components/necessities/NavBar.svelte";
    import Footer from "../lib/components/necessities/Footer.svelte";
</script>

<div class="scrollbar" >
    <NavBar />
    <slot />
    <Footer />
</div>
