<script>
  import Header from "./Header.svelte";
  import { Link } from 'svelte-routing';
  import Skeleton from "./Skeleton.svelte";
  import { onMount } from 'svelte';
  import Products from "./product/Products.svelte";

  let products = [];
  let allProducts = [];
  let categories = [];
  let selectedCategory = 'all';
  let sortOrder = 'default';
  let loadingProducts = true;
  let loadingCategories = true;

  async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    allProducts = await res.json();
    products = allProducts;
    loadingProducts = false;
  }

  async function fetchCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    categories = await res.json();
    categories.unshift('all');
    loadingCategories = false;
  }

  /**
   * @param {string} order
   */
  function sortProducts(order) {
    if (order === 'default') {
      products = selectedCategory === 'all' ? allProducts : allProducts.filter(product => product.category === selectedCategory);
    } else {
      let sortedProducts = [...products];
      sortedProducts.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else if (order === 'desc') {
          return b.price - a.price;
        }
      });
      products = sortedProducts;
    }
    sortOrder = order;
  }

  /**
   * @param {string} category
   */
  function filterByCategory(category) {
    selectedCategory = category;
    if (category === 'all') {
      products = allProducts;
    } else {
      products = allProducts.filter(product => product.category === category);
    }
    sortProducts(sortOrder); // Apply sorting after filtering
  }

  function resetFilters() {
    selectedCategory = 'all';
    sortOrder = 'default';
    products = allProducts;
  }

  onMount(async () => {
    await fetchProducts();
    await fetchCategories();
  });
</script>

<Header
  {categories}
  {selectedCategory}
  on:categoryChange={(e) => filterByCategory(e.detail)}
/>

{#if loadingCategories}
  <Skeleton count={1} />
{/if}

{#if !loadingCategories}
  <div class="controls">
    <div class="sort-controls">
      <button on:click={() => resetFilters()}>All</button>
      <button on:click={() => sortProducts('asc')}>Sort by Price: Low to High</button>
      <button on:click={() => sortProducts('desc')}>Sort by Price: High to Low</button>
    </div>
  </div>
{/if}
  
  {#if loadingProducts}
    <Skeleton count={8} />
  {/if}
  
  {#if !loadingProducts}
    <div class="product-grid">
      {#each products as product}
        <Link to={`/product/${product.id}`}>
          <Products {product} />
        </Link>
      {/each}
    </div>
  {/if}
  
    <style>
        
    .controls {
    background-color: rgba(37, 37, 37, 0.871);
    color: white;
    padding: 10px 20px;
    width: 100%;
    position: fixed;
    top: 11%;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    }
    
    .sort-controls {
    display: flex;
    gap: 10px;
    }
    
    .sort-controls button {
    font-weight: bolder;
    font-size: medium;
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    color: black;
    }
    
    .sort-controls button:hover {
    background-color: #f1f1f1;
    }
    
    
      .sort-controls {
        display: flex;
        gap: 10px;
      }
    
      .sort-controls button {
        padding: 10px 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        background-color: #fff;
      }
    
      .sort-controls button:hover {
        background-color: #f1f1f1;
      }
    
    .product-grid { 
     
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
     gap: 10px;
     justify-content: center;
    }

   

 
    </style>
    
    