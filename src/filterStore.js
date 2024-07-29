/**
 * Store to manage filters
 *  * @type {import('svelte/store').Writable<{ selectedCategory: string, sortOrder: string }>}
 * @constant
 * @name filtersStore
 *
 * @property {string} selectedCategory - The currently selected category. Default is 'all'.
 * @property {string} sortOrder - The current sort order. Default is 'default'.
 *
 * @returns {import('svelte/store').Writable<{ selectedCategory: string, sortOrder: string }>} - A writable store for managing filters.
 */
 
import { writable } from 'svelte/store';

export const filtersStore = writable({
  selectedCategory: 'all',
  sortOrder: 'default'
});

