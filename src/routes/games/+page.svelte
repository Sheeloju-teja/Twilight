<script>
  import { onMount } from 'svelte';

  const foodIcons = ['🍔', '🍕', '🍜', '🥟', '🍝'];

  let foods = [];
  let plateX = 50; // percentage
  let score = 0;
  let gameOver = false;

  function spawnFood() {
    const food = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90,
      y: -10,
      icon: foodIcons[Math.floor(Math.random() * foodIcons.length)]
    };
    foods = [...foods, food];
  }

  function movePlate(e) {
    if (e.key === 'ArrowLeft') plateX = Math.max(0, plateX - 5);
    if (e.key === 'ArrowRight') plateX = Math.min(90, plateX + 5);
  }

  function gameLoop() {
    foods = foods.map(food => ({
      ...food,
      y: food.y + 1.5
    }));

    foods.forEach(food => {
      // collision detection
      if (food.y > 85 && food.y < 92) {
        if (food.x > plateX - 5 && food.x < plateX + 15) {
          score++;
          foods = foods.filter(f => f.id !== food.id);
        }
      }

      // remove missed food
      if (food.y > 100) {
        foods = foods.filter(f => f.id !== food.id);
      }
    });
  }

  onMount(() => {
    window.addEventListener('keydown', movePlate);

    const spawn = setInterval(spawnFood, 1200);
    const loop = setInterval(gameLoop, 50);

    return () => {
      window.removeEventListener('keydown', movePlate);
      clearInterval(spawn);
      clearInterval(loop);
    };
  });
</script>

<!-- GAME AREA -->
<div class="relative w-full h-screen bg-gradient-to-b from-sky-200 to-green-200 overflow-hidden">

  <!-- SCORE -->
  <div class="absolute top-4 left-4 text-xl font-bold">
    Score: {score}
  </div>

  <!-- FALLING FOOD -->
  {#each foods as food (food.id)}
    <div
      class="absolute text-4xl"
      style="left:{food.x}%; top:{food.y}%"
    >
      {food.icon}
    </div>
  {/each}

  <!-- PLATE -->
  <div
    class="absolute bottom-4 text-5xl transition-transform"
    style="left:{plateX}%"
  >
    🍽️
  </div>

  <!-- CONTROLS -->
  <div class="absolute bottom-20 w-full text-center text-sm text-gray-700">
    ⬅️ ➡️ Use Arrow Keys to Move
  </div>
</div>
