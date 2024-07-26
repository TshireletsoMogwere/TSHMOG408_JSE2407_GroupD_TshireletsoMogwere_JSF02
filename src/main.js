import { Router } from 'svelte-routing';
import './app.css'
// @ts-ignore
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  props: {
    Router
  }
})

export default app;
