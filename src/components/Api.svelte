<script>
  import ProductDetails from "./product/Products.svelte";

    let products = [];
    async function fetchProducts() {
        const res = await fetch ('https://fakestoreapi.com/products');
        products = await res.json();
    }
    fetchProducts();
</script>

{#each products as products}
<ProductDetails product = {products} />
{/each}

