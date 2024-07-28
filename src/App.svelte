<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './components/Home.svelte';
  import ProductDetails from './components/ProductDetails.svelte';
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/product/:id" component={ProductDetails} />
</Router>

