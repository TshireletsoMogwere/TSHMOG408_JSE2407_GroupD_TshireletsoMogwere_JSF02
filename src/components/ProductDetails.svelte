<script>
    import { onMount } from 'svelte';
    import { Link } from "svelte-routing";
    import Header from './Header.svelte';
  
    export let id;
    let product = null;
    let loading = true;
  
    onMount(async () => {
      await fetchProduct();
    });
  
    async function fetchProduct() {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
      loading = false;
    }
  </script>
  <Header />
  {#if loading}
    <p id="loading">Loading product details...</p>
  {:else if product}
    <div class="product-detail">
      <Link to="/">
        <button>Back to Products</button></Link>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  {:else}
    <p>Product not found</p>
  {/if}
  
  <style>
    #loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: #343a40;
  
    }
    .product-detail {
        margin-top: 150px;
        position: relative;
        text-align: center;
      
    }

.product-detail p {
  font-size: large; 
  color: black; 
  margin-bottom: 15px; 
}

img {
    width: 15%; 
    height: auto; 
    object-fit: cover; 
    margin-bottom: 20px; 
}

button {
  display: inline-block; 
  padding: 10px 20px; 
  background-color: #007bff; 
  color: #fff;
  border: none;
  border-radius: 4px; 
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

  </style>