import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

interface SalesData {
  day: { [date: string]: number };
  week: { [weekKey: string]: number };
  month: { [monthKey: string]: number };
  year: { [year: string]: number };
}

function getWeekKey(date: Date): string {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek.toISOString().split('T')[0];
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getYearKey(date: Date): string {
  return String(date.getFullYear());
}

function createSalesStore() {
  const initial: SalesData = {
    day: {},
    week: {},
    month: {},
    year: {}
  };

  const { subscribe, update } = writable<SalesData>(initial);

  if (browser) {
    const stored = localStorage.getItem('salesData');
    if (stored) {
      update(() => JSON.parse(stored));
    }
  }

  return {
    subscribe,
    addSale: (amount: number, date: Date = new Date()) => {
      update(data => {
        const dateKey = date.toISOString().split('T')[0];
        const weekKey = getWeekKey(date);
        const monthKey = getMonthKey(date);
        const yearKey = getYearKey(date);

        data.day[dateKey] = (data.day[dateKey] || 0) + amount;
        data.week[weekKey] = (data.week[weekKey] || 0) + amount;
        data.month[monthKey] = (data.month[monthKey] || 0) + amount;
        data.year[yearKey] = (data.year[yearKey] || 0) + amount;

        if (browser) {
          localStorage.setItem('salesData', JSON.stringify(data));
        }

        return data;
      });
    }
  };
}

export const sales = createSalesStore();

export const todayTotal = derived(sales, $sales => {
  const today = new Date().toISOString().split('T')[0];
  return $sales.day[today] || 0;
});

export const thisWeekTotal = derived(sales, $sales => {
  const weekKey = getWeekKey(new Date());
  return $sales.week[weekKey] || 0;
});

export const thisMonthTotal = derived(sales, $sales => {
  const monthKey = getMonthKey(new Date());
  return $sales.month[monthKey] || 0;
});

export const thisYearTotal = derived(sales, $sales => {
  const yearKey = getYearKey(new Date());
  return $sales.year[yearKey] || 0;
});