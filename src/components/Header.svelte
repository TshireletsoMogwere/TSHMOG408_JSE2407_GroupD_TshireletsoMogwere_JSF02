<script>
    import { createEventDispatcher } from 'svelte';
    export let categories = [];
    export let selectedCategory = 'all';
  
    const dispatch = createEventDispatcher();
  
    function filterByCategory(category) {
      dispatch('categoryChange', category);
    }
  </script>
  
  <header class="header">
    <div class="header-content">
      <h1 class="logo">E-commerce store</h1>
      <nav class="navigation">
        {#each categories as category}
          <button
            on:click={() => filterByCategory(category)}
            class:selected={selectedCategory === category}
          >
            {category}
          </button>
        {/each}
      </nav>
    </div>
  </header>
  
  <style>
    header {
      background-color: rgb(222, 221, 221);
      color: black;
      padding: 10px ;
      width: 100%;
      position: fixed;
      top: 0;
      left: -10;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .logo {
      font-size: xx-large;
      font-weight: bold;
      margin-left: 50px;
    }
  
    .navigation {
      display: flex;
      gap: 20px;
      font-size: large;
    }
  
    .navigation button {
      background: none;
      border: none;
      color: black;
      font-size:larger;
      cursor: pointer;
      padding: 10px;
      transition: background 0.3s;
    }
  
    .navigation button:hover,
    .navigation button.selected {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
    }
  </style>
  