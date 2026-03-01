<script lang="ts">
  export let field_teardown_image: string = "";
  export let field_hotspots: Array<{
    field_label?: string;
    field_x_coord?: number | string; // Drupal sends coordinates as numbers or strings
    field_y_coord?: number | string;
  }> = [];

  let activeHotspot: string | null = null;

  const toggleHotspot = (label: string | undefined) => {
    if (!label) return;
    activeHotspot = activeHotspot === label ? null : label;
  };

  const resolveMedia = (rawMedia: string | undefined) => {
    if (!rawMedia) return "";
    return rawMedia;
  };
</script>

{#if field_teardown_image}
  <section class="teardown-container">
    <div class="header">
      <span class="eyebrow">The Recipe</span>
      <h2>Uncompromising Ingredients</h2>
      <p class="sub-header">Tap the ingredients to see what Alfonzo is eating today.</p>
    </div>

    <div class="image-wrapper">
      <img 
        src={resolveMedia(field_teardown_image)} 
        alt="ChefPaws Meal Teardown" 
        class="bowl-img" 
      />

      {#each field_hotspots as hotspot}
        <div 
          class="hotspot-group" 
          class:active={activeHotspot === hotspot.field_label}
          style="left: {hotspot.field_x_coord}%; top: {hotspot.field_y_coord}%;"
          on:click={() => toggleHotspot(hotspot.field_label)}
        >
          <div class="pulse-ring"></div>
          <div class="dot"></div>
          
          <div class="label-card">
            <span class="label-text">{hotspot.field_label}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}

<style>
  .teardown-container {
    padding: clamp(4rem, 10vw, 8rem) 1.5rem;
    background: #ffffff;
    text-align: center;
    overflow: hidden;
  }

  .header { margin-bottom: clamp(2rem, 5vw, 4rem); }
  
  .eyebrow { 
    color: #ff4d4d; 
    text-transform: uppercase; 
    font-weight: 900; 
    font-size: 0.75rem; 
    letter-spacing: 0.3em; 
  }

  h2 { 
    font-size: clamp(2rem, 5vw, 3.5rem); 
    font-weight: 950; 
    margin: 0.5rem 0; 
    text-transform: uppercase; 
    letter-spacing: -0.03em;
    line-height: 1;
  }
  
  .sub-header { color: #888; font-size: 1rem; font-weight: 500; }

  .image-wrapper { 
    position: relative; 
    display: inline-block; 
    max-width: 1000px; 
    width: 100%;
    border-radius: clamp(16px, 4vw, 32px);
    box-shadow: 0 40px 100px rgba(0,0,0,0.1);
  }

  .bowl-img { 
    width: 100%; 
    display: block; 
    border-radius: clamp(16px, 4vw, 32px); 
  }

  .hotspot-group {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 10;
    transition: transform 0.3s ease;
  }

  .dot {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 4px solid #ff4d4d; /* Use ChefPaws Red for the border */
    border-radius: 50%;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.4);
  }

  .pulse-ring {
    position: absolute;
    width: 44px;
    height: 44px;
    border: 2px solid #ff4d4d;
    border-radius: 50%;
    animation: pulse 2.5s infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .label-card {
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #1a1a1a;
    padding: 10px 20px;
    border-radius: 100px; /* Full pill shape */
    white-space: nowrap;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    pointer-events: none;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  /* Desktop Hover */
  @media (min-width: 1025px) {
    .hotspot-group:hover .label-card {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .hotspot-group:hover { transform: translate(-50%, -50%) scale(1.2); }
  }

  /* Mobile Active State */
  .hotspot-group.active .label-card {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .label-text {
    color: #fff;
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
  }

  @media (max-width: 768px) {
    .sub-header { font-size: 0.9rem; }
    .dot { width: 20px; height: 20px; } /* Larger touch targets for mobile */
    .label-card { 
      bottom: 40px; 
      padding: 8px 16px;
    }
  }
</style>