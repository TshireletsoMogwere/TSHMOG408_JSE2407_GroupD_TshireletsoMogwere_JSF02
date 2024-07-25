<script>
export let product;
</script>

<div>
    <img src="{product.image}" alt="productimage" class="product-image" >
    <h2>{product.title}</h2>
    <h2>${product.price}</h2>
    <h2>{product.category}</h2>

</div>

<style>
    .product-image {
        width: 200px;
        height: full;
        object-fit: cover;
        margin-bottom: 10px;
 
    }
</style>

    

