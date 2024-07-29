<script>
    export let count = 1;
  </script>
  
  <div class="skeleton-container">
    {#each Array(count) as _}
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-text title"></div>
        <div class="skeleton-text price"></div>
      </div>
    {/each}
  </div>
  
  <style>
    .skeleton-container {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
     gap: 10px;
     justify-content: center;
    }
  
    .skeleton-card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .skeleton-image {
      width: 100%;
      height: 150px;
      background: #ddd;
      border-radius: 8px;
    }
  
    .skeleton-text {
      background: #ddd;
      height: 20px;
      border-radius: 4px;
      margin-top: 10px;
      width: 80%;
    }
  
    .skeleton-text.title {
      height: 30px;
      width: 60%;
    }
  
    .skeleton-text.price {
      width: 40%;
    }
  </style>
  