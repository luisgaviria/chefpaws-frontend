<script lang="ts">
  // These props are passed from your Go backend via Astro.props
  export let field_background_style: string = "white"; 
  export let field_trust_items: Array<{
    field_icon?: string;
    field_item_title?: string;
    field_item_description?: string;
  }> = [];

  // Cleanup logic matching your Hero component for S3/Cloudflare paths
  const resolveMedia = (rawMedia: string | undefined) => {
    if (!rawMedia) return "";
    return rawMedia.startsWith('http') ? rawMedia : rawMedia;
  };

  // Determine grid columns based on item count (1, 2, or 3)
  $: itemCount = field_trust_items.length;
</script>

{#if itemCount > 0}
  <section class="trust-bar bg-{field_background_style.split('|').pop()}">
    <div class="wrapper" class:single={itemCount === 1} class:triple={itemCount === 3}>
      {#each field_trust_items as item}
        <div class="trust-card">
          {#if item.field_icon}
            <div class="icon-wrap">
              <img 
                src={resolveMedia(item.field_icon)} 
                alt={item.field_item_title || "Trust Icon"} 
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
    padding: 7rem 2rem; /* Much larger padding for a luxury feel */
    background-color: #fcfcfc; /* Off-white is easier on the eyes than pure white */
    border-top: 1px solid #f0f0f0;
  }

  .wrapper {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem; /* Wide gaps prevent the "cluttered" MVP look */
  }

  .trust-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
  }

  /* Hover effect adds "Life" to the site */
  .trust-card:hover {
    transform: translateY(-5px);
  }

  .icon-wrap {
    width: 80px; /* Bigger presence */
    height: 80px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: auto;
    /* Keeps lines crisp on your MacBook Pro */
    image-rendering: -webkit-optimize-contrast;
    filter: brightness(0.95);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em; /* This is the secret to the "Premium" look */
    margin: 0 0 0.75rem 0;
    color: #1a1a1a;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #666;
    max-width: 260px; /* Constraining the width makes it look designed */
    margin: 0 auto;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .wrapper { grid-template-columns: 1fr; gap: 4rem; }
    .trust-bar { padding: 4rem 1rem; }
  }
</style>