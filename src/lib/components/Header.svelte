<script>
  import { cart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';

  export let showSidebar = false;
  export let logo = '';

  $: cartCount = $cart.reduce((sum, item) => sum + item.qty, 0);

  function openCart() {
    goto('/cart');
  }
</script>

<nav class="fixed w-full top-0 left-0 z-50 p-2 flex justify-between items-center bg-white md:bg-transparent md:static">
  <a href="/">
    <img src={logo} alt="logo" class="w-20 object-cover" />
  </a>
  <div class="flex gap-4">
    <a class="font-bold" href="/">Home</a>
    <a class="font-bold" href="/sales">Sales</a>
       <a class="font-bold" href="/games">Game</a>
  </div>
  <div class="flex items-center gap-4">
    <button on:click={openCart} class="relative p-2 md:p-0 flex items-center justify-center">
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {#if cartCount > 0}
        <span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      {/if}
    </button>
    <button class="md:hidden flex flex-col justify-center items-center w-8 h-8" on:click={() => showSidebar = !showSidebar} aria-label="Toggle sidebar">
      <span class={"block transform w-5 h-0.5 bg-gray-800 mb-1 transition-all duration-300 " + (showSidebar ? 'rotate-45 translate-y-1.5' : '')}></span>
      <span class={"block transform w-5 h-0.5 bg-gray-800 mb-1 transition-all duration-300 " + (showSidebar ? 'opacity-0' : '')}></span>
      <span class={"block transform w-5 h-0.5 bg-gray-800 transition-all duration-300 " + (showSidebar ? '-rotate-45 -translate-y-1.5' : '')}></span>
    </button>
  </div>
</nav>

<style>
  /* component-local styles can go here if needed */
</style>
