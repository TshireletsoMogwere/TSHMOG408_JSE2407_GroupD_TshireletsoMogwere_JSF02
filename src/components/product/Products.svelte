<script>
export let product;
</script>

<div class="card">
    <img src="{product.image}" alt="productimage" class="product-image" >
    <h2>{product.title}</h2>
    <h2>${product.price}</h2>
    <h2>{product.category}</h2>

</div>

<style>
.card{
    font-size: small;
    margin-top: 150px;
    width: 350px;
    border: 1px solid rgb(232, 190, 214);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(142, 21, 130, 0.2);
    cursor: pointer;
    overflow: hidden;
    background: white;
    padding: 50px;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image{
    width: 60%;
    height: 60%;
    position: relative;
    transition: transform 0.3s ease-in-out;
}


</style>
    

