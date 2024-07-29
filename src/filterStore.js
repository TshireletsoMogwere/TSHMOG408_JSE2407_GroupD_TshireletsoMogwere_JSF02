
import { writable } from 'svelte/store';

export const filtersStore = writable({
  selectedCategory: 'all',
  sortOrder: 'default'
});

