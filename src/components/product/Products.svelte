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
    text-align: center;
    color: rgb(50, 47, 47);
    margin-top: 200px;
    border:  rgb(33, 32, 32);
    border-radius: 10%;
    background-color: white;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image{
  display: block;
  margin: 0 auto;
  width: 60%;
  height: 60%;
  position: relative;
  transition: transform 0.3s ease-in-out;
  
}
</style>
    

