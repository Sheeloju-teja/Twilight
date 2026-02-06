<script>
  import { todayTotal, thisWeekTotal, thisMonthTotal, thisYearTotal } from '$lib/stores/sales';
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Sales Summary</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-blue-100 p-4 rounded-lg">
      <h2 class="text-lg font-semibold">Today</h2>
      <p class="text-2xl font-bold">₹{$todayTotal}</p>
    </div>

    <div class="bg-green-100 p-4 rounded-lg">
      <h2 class="text-lg font-semibold">This Week</h2>
      <p class="text-2xl font-bold">₹{$thisWeekTotal}</p>
    </div>

    <div class="bg-yellow-100 p-4 rounded-lg">
      <h2 class="text-lg font-semibold">This Month</h2>
      <p class="text-2xl font-bold">₹{$thisMonthTotal}</p>
    </div>

    <div class="bg-purple-100 p-4 rounded-lg">
      <h2 class="text-lg font-semibold">This Year</h2>
      <p class="text-2xl font-bold">₹{$thisYearTotal}</p>
    </div>
  </div>
</div>