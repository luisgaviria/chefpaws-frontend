<script lang="ts">
  // These props are passed from your Go backend via Astro.props
  export let field_background_style: string = "white"; 
  export let field_trust_items: Array<{
    field_icon?: string;
    field_item_title?: string;
    field_item_description?: string;
  }> = [];

  /**
   * FIX: Cloudflare Image Resizing
   * This handles the "Image file is larger than it needs to be" error.
   * It requests a 160px version (2x for 80px CSS width) directly from the Edge.
   */
  const resolveMedia = (rawMedia: string | undefined) => {
    if (!rawMedia) return "";

    // If it's an R2 URL, we route it through Cloudflare's resizing service
    if (rawMedia.includes('r2.dev')) {
      const targetWidth = 160; // 2x for Retina sharpness
      const quality = 85;
      
      // We use the chefpaws.com proxy to trigger Cloudflare's Image Resizing
      return `https://chefpaws.com/cdn-cgi/image/width=${targetWidth},height=${targetWidth},fit=pad,format=auto,quality=${quality}/${rawMedia}`;
    }

    return rawMedia;
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
    padding: 7rem 2rem;
    background-color: #fcfcfc;
    border-top: 1px solid #f0f0f0;
  }

  .wrapper {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
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
    /* Keeps lines crisp on high-res displays */
    image-rendering: -webkit-optimize-contrast;
    filter: brightness(0.95);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin: 0 0 0.75rem 0;
    color: #1a1a1a;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #666;
    max-width: 260px;
    margin: 0 auto;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .wrapper { grid-template-columns: 1fr; gap: 4rem; }
    .trust-bar { padding: 4rem 1rem; }
  }
</style>