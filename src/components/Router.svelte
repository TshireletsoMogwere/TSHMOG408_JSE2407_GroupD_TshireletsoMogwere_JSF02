<script>
    import { Router, Route } from 'svelte-routing';
    import Home from './Home.svelte';
    import ProductDetails from './ProductDetails.svelte';
  </script>
  
  <Router>
    <Route path="/" component={Home} />
    <Route path="/product/:id" component={ProductDetails} />
  </Router>
  
  <style>
   
  </style>
  