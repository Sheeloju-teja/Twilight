<script>
  import { cart, removeFromCart, addToCart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';

  $: total = $cart.reduce((s, ci) => s + ci.item.price * ci.qty, 0);
</script>

<h1 class="text-xl font-bold mb-4">Cart</h1>

{#each $cart as ci}
  <div class="flex justify-between border p-2 mb-2 items-center">
    <span>{ci.item.name} x{ci.qty}</span>
    <span>₹{ci.item.price * ci.qty}</span>
    <div class="flex gap-2">
      <button on:click={() => removeFromCart(ci.item.id)} class="bg-red-500 text-white px-2 py-1 rounded">-</button>
      <button on:click={() => addToCart(ci.item)} class="bg-green-500 text-white px-2 py-1 rounded">+</button>
    </div>
  </div>
{/each}

<p class="font-bold mt-4">Total: ₹{total}</p>

<button
  class="mt-4 bg-green-600 text-white px-4 py-2 rounded"
  on:click={() => goto('/bill')}>
  Confirm Order
</button>
