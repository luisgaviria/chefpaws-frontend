<script lang="ts">
  // Props passed from Drupal/Go via Astro
  export let field_background_style: string = "white"; 
  export let field_trust_items: Array<{
    field_icon?: string; // This will now be a local /_astro/ URL
    field_item_title?: string;
    field_item_description?: string;
  }> = [];

  // No more resolveMedia function! 
  // Astro's [...slug].astro now handles the optimization server-side.

  $: itemCount = field_trust_items.length;
</script>

{#if itemCount > 0}
  <section class="trust-bar bg-{field_background_style.split('|').pop()}">
    <div class="wrapper">
      {#each field_trust_items as item}
        <div class="trust-card">
          {#if item.field_icon}
            <div class="icon-wrap">
              <img 
                src={item.field_icon} 
                alt={item.field_item_title || "Trust Icon"} 
                width="80"
                height="80"
                loading="lazy" 
              />
            </div>
          {/if}
          <div class="text-content">
            <h3>{item.field_item_title || "Quality Guaranteed"}</h3>
            <p>{item.field_item_description || ""}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}

<style>
  .trust-bar {
    padding: clamp(4rem, 8vw, 7rem) 2rem;
    background-color: #fcfcfc;
    border-top: 1px solid #f0f0f0;
  }

  /* Support for Drupal background styles */
  .bg-white { background-color: #ffffff; }
  .bg-soft { background-color: #f8f8f6; }

  .wrapper {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    /* auto-fit makes it responsive without extra media queries */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
  }

  .trust-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .trust-card:hover {
    transform: translateY(-5px);
  }

  .icon-wrap {
    width: 80px; 
    height: 80px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  h3 {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin: 0 0 0.75rem 0;
    color: #111;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #666;
    max-width: 260px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .wrapper { 
      grid-template-columns: 1fr; 
      gap: 4rem; 
    }
    .trust-bar { padding: 4rem 1.5rem; }
  }
</style>