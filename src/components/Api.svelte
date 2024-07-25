<script>
  import ProductDetails from "./product/Products.svelte";

    let products = [];
    async function fetchProducts() {
        const res = await fetch ('https://fakestoreapi.com/products');
        products = await res.json();
    }
    fetchProducts();
</script>

<div class="product-grid">
{#each products as products}
<ProductDetails product = {products} />
{/each}
</div>

<style>
    .product-grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 30px;
    }
     
  </style>


