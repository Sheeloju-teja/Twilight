<script>
  import { goto } from '$app/navigation';
  import logo from '$lib/assets/logo.jpg';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { categories } from '$lib/data/categories';

  const foods = [
    { emoji: '🍔', delay: '0s' },
    { emoji: '🍕', delay: '1.5s' },
    { emoji: '🍜', delay: '3s' },
    { emoji: '🥟', delay: '4.5s' },
    { emoji: '🍝', delay: '6s' }
  ];

  let selectedCategory = 'maggie';
  let showSidebar = false;
</script>

<Header bind:showSidebar logo={logo} />

<!-- PAGE WRAPPER -->
<div class="flex min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 overflow-hidden">

  <!-- Mobile Sidebar -->
  <Sidebar
    {categories}
    bind:showSidebar
    bind:selectedCategory
    variant="mobile"
  />

  <!-- Desktop Sidebar -->
  <Sidebar
    {categories}
    bind:selectedCategory
    variant="desktop"
  />

  <!-- MAIN CONTENT -->
  <main class="relative flex-1 flex items-center justify-center overflow-hidden">

    <!-- Floating Food -->
    {#each foods as food}
      <span
        class="absolute text-4xl md:text-5xl animate-float select-none"
        style="
          left: {Math.random() * 85}%;
          animation-delay: {food.delay};
        "
      >
        {food.emoji}
      </span>
    {/each}

    <!-- HERO CONTENT -->
    <div class="relative z-10 text-center px-4 sm:px-6 max-w-xl">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 animate-slide">
        Welcome to <span class="text-red-500">Twilight</span>
      </h1>

      <p class="mt-4 text-base sm:text-lg text-gray-700 animate-fade">
        Fresh • Tasty • Hygienic Food 😋
      </p>

      <button
        on:click={() => goto('/menu')}
        class="mt-8 px-7 py-3 bg-red-500 text-white rounded-full font-semibold
               shadow-xl transition transform hover:scale-110 hover:bg-red-600"
      >
        View Menu 🍽️
      </button>
    </div>

  </main>
</div>

<style>
@keyframes float {
  0% {
    transform: translateY(-20vh) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(120vh) rotate(360deg);
    opacity: 0;
  }
}
  .animate-float {
    animation: float 12s linear infinite;
    pointer-events: none;
  }

  @keyframes slide {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide {
    animation: slide 0.9s ease-out both;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade {
    animation: fade 1.8s ease-in both;
  }
  
</style>
