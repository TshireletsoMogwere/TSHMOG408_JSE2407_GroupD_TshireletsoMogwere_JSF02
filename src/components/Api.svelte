<script>
    import Header from './Header.svelte';
    import ProductDetails from './product/Products.svelte';
    import Skeleton from './Skeleton.svelte';
    import { onMount } from 'svelte';
  
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
  
    function sortProducts(order) {
      let sortedProducts = [...products];
      sortedProducts.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      products = sortedProducts;
      sortOrder = order === 'asc' ? 'desc' : 'asc';
    }
  
    function filterByCategory(category) {
      selectedCategory = category;
      if (category === 'all') {
        products = allProducts;
      } else {
        products = allProducts.filter(product => product.category === category);
      }
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
        <button on:click={() => sortProducts('asc')}>Sort by Price: Low to High</button>
        <button on:click={() => sortProducts('desc')}>Sort by Price: High to Low</button>
      </div>
    </div>
  {/if}
  
  {#if loadingProducts}
    <Skeleton count={8} /> <!-- Show a grid of 8 skeleton cards while products are loading -->
  {/if}
  
  {#if !loadingProducts}
    <div class="product-grid">
      {#each products as product}
        <ProductDetails {product} />
      {/each}
    </div>
  {/if}
  
  <style>
    .controls {
      display: flex;
      justify-content: space-between;
      margin: 100px 0 20px; /* Adjusted margin to account for the fixed header */
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
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }
  </style>
  