<script>
  import Header from "./Header.svelte";
  import { Link } from 'svelte-routing';
  import Skeleton from "./Skeleton.svelte";
  import { onMount, onDestroy } from 'svelte';
  import Product from "../components/product/Products.svelte"; // Correct import for the component
  import { filtersStore } from '../filterStore';

  let products = [];
  let allProducts = [];
  let categories = [];
  let selectedCategory = 'all';
  let sortOrder = 'default';
  let loadingProducts = true;
  let loadingCategories = true;

  // Subscribe to the filters store
  const unsubscribe = filtersStore.subscribe(store => {
    selectedCategory = store.selectedCategory;
    sortOrder = store.sortOrder;
    products = applyFiltersAndSorting(allProducts); // Ensure products are updated
  });

  async function fetchProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      allProducts = await res.json();
      products = applyFiltersAndSorting(allProducts); // Correctly set the products variable
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loadingProducts = false;
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      categories = await res.json();
      categories.unshift('all');
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      loadingCategories = false;
    }
  }

  function applyFiltersAndSorting(products) {
    let filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
    if (sortOrder !== 'default') {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    return filteredProducts;
  }

  /**
   * @param {string} order
   */
  function sortProducts(order) {
    sortOrder = order;
    filtersStore.update(store => ({ ...store, sortOrder: order }));
    products = applyFiltersAndSorting(allProducts);
  }

  /**
   * @param {string} category
   */
  function filterByCategory(category) {
    selectedCategory = category;
    filtersStore.update(store => ({ ...store, selectedCategory: category }));
    products = applyFiltersAndSorting(allProducts);
  }

  function resetFilters() {
    selectedCategory = 'all';
    sortOrder = 'default';
    filtersStore.set({ selectedCategory: 'all', sortOrder: 'default' });
    products = allProducts;
  }

  onMount(async () => {
    await fetchProducts();
    await fetchCategories();
  });

  // Clean up subscription when component unmounts
  onDestroy(() => unsubscribe());
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
        <Product {product} /> <!-- Correct component usage -->
       
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
    
    