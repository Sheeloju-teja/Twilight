<script>
  export let categories = [
    { name: 'Maggie', key: 'maggie', emoji: '🍜', link: '/maggie' },
    { name: 'Momos', key: 'momos', emoji: '🥟', link: '/momos' },
    { name: 'Pastas', key: 'pastas', emoji: '🍝', link: '/pastas' },
    { name: 'Sandwiches', key: 'sandwiches', emoji: '🥪', link: '/sandwiches' },
    { name: 'Snacks', key: 'snacks', emoji: '🍿', link: '/snacks' },
    { name: 'Lollipops', key: 'lollipops', emoji: ' 🍡', link: '/lollipops' },
    { name: 'Burgers', key: 'burgers', emoji: '🍔', link: '/burgers' },
    { name: 'Frankies', key: 'frankies', emoji: '🌮', link: '/frankies' }
  ];

  export let showSidebar = false;
  export let selectedCategory = '';
  export let variant = 'mobile';

  function select(cat) {
    selectedCategory = cat.key;
    if (variant === 'mobile') showSidebar = false;
  }
</script>

{#if variant === 'mobile'}
  <!-- Mobile Sidebar -->
  <div
    class={
      "space-y-2 md:hidden fixed top-0 left-0 h-full w-64 bg-gray-900 p-4 z-50 transform transition-transform duration-300 overflow-y-auto " +
      (showSidebar ? 'translate-x-0' : '-translate-x-full')
    }
  >
    {#each categories as cat}
      <a
        href={cat.link}
        on:click={() => select(cat)}
        class={
          "flex items-center gap-3 p-3 rounded hover:bg-gray-800 " +
          (selectedCategory === cat.key ? 'bg-gray-700' : '')
        }
      >
        <!-- Emoji -->
        <div class="text-xl">{cat.emoji}</div>

        <!-- Text -->
        <div class="text-white text-sm font-semibold whitespace-nowrap">
          {cat.name}
        </div>
      </a>
    {/each}
  </div>
{:else}
  <!-- Desktop Sidebar -->
  <div class="hidden md:block w-64 bg-gray-100 p-4 space-y-2">
    {#each categories as cat}
      <a
        href={cat.link}
        on:click={() => select(cat)}
        class={
          "flex items-center gap-4 p-3 rounded hover:bg-gray-200 " +
          (selectedCategory === cat.key ? 'bg-gray-300' : '')
        }
      >
        <!-- Emoji -->
        <div class="text-2xl lg:text-3xl">
          {cat.emoji}
        </div>

        <!-- Text -->
        <div class="font-semibold text-base md:text-lg lg:text-xl whitespace-nowrap">
          {cat.name}
        </div>
      </a>
    {/each}
  </div>
{/if}
