<script>
    import { createEventDispatcher } from 'svelte';
    export let categories = [];
  export let selectedCategory = 'all';

  const dispatch = createEventDispatcher();

  /**
   * @param {any} category
   */
  function filterByCategory(category) {
    dispatch('categoryChange', category);
  }
</script>

<header class="header">
    <h1>E-commerce store</h1>
    <div class="filter-controls">
      {#each categories as category}
        <button
          on:click={() => filterByCategory(category)}
          class:selected={selectedCategory === category}
        >
          {category}
        </button>
      {/each}
    </div>
  </header>

  <style>
    .header {
      background-color: white;
      color: black;
      padding: 20px 0;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .header h1 {
      margin: 0;
      padding: 0;
      font-weight: bolder;
      font-size: xx-large;
      text-align: center;
      color: black;
    }
  
    .filter-controls {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
  
    .filter-controls button {
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      background-color: black;
      color: white;
    }
  
    .filter-controls button:hover {
      background-color: #f1f1f1;
    }
  
    .filter-controls .selected {
      background-color: #d3d3d3;
    }
  </style>