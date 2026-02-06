<script>
  import { menuItems } from '$lib/data/menu';
  import { addToCart, removeFromCart, cart } from '$lib/stores/cart';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import logo from '$lib/assets/logo.jpg';
  import { categories } from '$lib/data/categories';

  let selectedCategory = 'momos';
  let showSidebar = false;
</script>

<Header bind:showSidebar {logo} />
<div class="pt-16 md:pt-0">
  <div class="flex">
    <Sidebar {categories} bind:showSidebar bind:selectedCategory variant="mobile" />
    <Sidebar {categories} bind:selectedCategory variant="desktop" />
    <div class="flex-1 min-h-screen bg-gradient-to-br from-pink-400 via-red-500 to-yellow-600 p-8">
  <h1 class="nunito text-2xl md:text-4xl font-bold text-white mb-8 text-center">Momos</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {#each menuItems.momos as item}
      {@const cartItem = $cart.find(ci => ci.item.id === item.id)}
      {@const qty = cartItem ? cartItem.qty : 0}
      <div class="bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition duration-300">
        <div class="flex items-center gap-3 mb-2">
          <!-- Indicator -->
          <div class={"w-5 h-5 border-2 flex items-center justify-center " + (item.type === 'veg' ? 'border-green-600' : item.type === 'egg' ? 'border-yellow-500' : 'border-red-600')}>
            <div class={"w-2.5 h-2.5 rounded-full " + (item.type === 'veg' ? 'bg-green-600' : item.type === 'egg' ? 'bg-yellow-500' : 'bg-red-600')}></div>
          </div>
          <h2 class="text-lg md:text-2xl font-semibold text-gray-800">
            {item.name}
          </h2>
        </div>
        <p class="text-base md:text-lg text-gray-600 mb-4">₹{item.price}</p>
        <div class="flex items-center justify-center gap-4">
          {#if qty > 0}
            <button on:click={() => removeFromCart(item.id)} class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base transition duration-300">-</button>
            <span class="text-base md:text-xl font-bold">{qty}</span>
            <button on:click={() => addToCart(item)} class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base transition duration-300">+</button>
          {:else}
            <button on:click={() => addToCart(item)} class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base transition duration-300">Add to Cart</button>
          {/if}
        </div>
      </div>
    {/each}
      </div>
    </div>
  </div>
</div>