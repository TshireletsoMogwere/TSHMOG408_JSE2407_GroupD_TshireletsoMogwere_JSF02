<script>
  import ProductDetails from "./product/Products.svelte";
  import { onMount } from 'svelte';

    let products = [];
    let categories = [];
    let sortOrder = 'default';

    async function fetchProducts() {
        const res = await fetch ('https://fakestoreapi.com/products');
        products = await res.json();
    }

    async function fetchCategories() {
        const res = await fetch ('https://fakestoreapi.com/products/categories');
        categories = await res.json();
    }

    /**
   * @param {string} order
   */
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
        sortOrder = order === 'asc'? 'desc' : 'asc';
    }

    onMount(async () => {
        await fetchProducts();
        await fetchCategories();
    });
</script>



<div class="sort-controls">
    <button on:click={() => sortProducts('asc')}>Sort by Price: Low to High</button>
    <button on:click={() => sortProducts('desc')}>Sort by Price: High to Low</button>
  </div>



<div class="product-grid">
{#each products as product}
<ProductDetails {product} />
{/each}
</div>

<style>

.sort-controls {
    margin: 20px 0;
    display: flex;
    gap: 10px;
    position: relative;
    top: 100px;
    justify-content: center;
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

    .product-grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        row-gap: 0px;
        column-gap: 10px;
    }
     
  </style>


