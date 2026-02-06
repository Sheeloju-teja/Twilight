<script>
  import { goto } from '$app/navigation';
</script>

<div class="flex justify-between items-center mb-4">
  <button on:click={() => history.back()}
    class="px-3 py-2 bg-gray-200 rounded">
    ← Back
  </button>

  <button on:click={() => goto('/cart')}
    class="px-3 py-2 bg-green-600 text-white rounded">
    🛒 Cart
  </button>
</div>
