// @ts-nocheck
import { Router } from 'svelte-routing';
import './app.css'
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  props: {
    Router
  }
})

export default app;
