<script lang="ts">
  export let field_cta_title: string = "Ready to see the math?";
  export let field_cta_subtitle: string = "Calculate your dog's custom meal plan instantly.";
  export let button_text: string = "Calculate My Plan";
  export let button_url: string = "/calculator";
  
  // Added to support dynamic headline from Drupal if provided
  export let field_features_title: string = ""; 
</script>

<section class="cta-light-impact">
  <div class="luxury-card">
    <div class="content">
      <span class="location-badge">Miami • Ft. Lauderdale • Palm Beach</span>
      <h2>{field_features_title || field_cta_title}</h2>
      <p>{field_cta_subtitle}</p>

      <div class="action">
        <a href={button_url} class="premium-pill">
          <span class="text">{button_text}</span>
          <div class="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-light-impact {
    /* Significantly reduced top padding to eliminate the gap after the timeline */
    padding: clamp(40px, 5vw, 60px) 20px clamp(80px, 10vw, 120px);
    background: #ffffff;
    position: relative;
  }

  .luxury-card {
    max-width: 1100px;
    margin: 0 auto;
    background: #ffffff;
    /* Optimized internal vertical breathing room */
    padding: clamp(50px, 7vw, 80px) 40px;
    border-radius: 60px;
    text-align: center;
    position: relative;
    border: 1px solid #f2f2f2;
    box-shadow: 
      0 10px 30px rgba(0,0,0,0.01),
      0 40px 100px rgba(255, 107, 107, 0.08); /* Soft brand-accent glow */
  }

  .location-badge {
    color: var(--brand-accent, #ff6b6b);
    font-weight: 800;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    margin-bottom: 16px;
    display: block;
    opacity: 0.8;
  }

  h2 {
    color: #1a1a1a;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 24px;
    text-wrap: balance;
  }

  p {
    color: #666;
    font-size: clamp(16px, 2vw, 19px);
    max-width: 520px;
    margin: 0 auto 48px;
    font-weight: 400;
    line-height: 1.6;
  }

  .premium-pill {
    display: inline-flex;
    align-items: center;
    background: #121212;
    color: white;
    text-decoration: none;
    padding: 8px 8px 8px 40px;
    border-radius: 100px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

  .text {
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 13px;
    margin-right: 24px;
  }

  .icon-box {
    width: 48px;
    height: 48px;
    background: var(--brand-accent, #ff6b6b);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
  }

  .icon-box svg {
    width: 18px;
    height: 18px;
    color: white;
  }

  .premium-pill:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 25px 50px rgba(255, 107, 107, 0.25);
    background: #000;
  }

  .premium-pill:hover .icon-box {
    transform: rotate(-45deg);
  }

  @media (max-width: 768px) {
    .cta-light-impact { padding: 40px 15px 80px; }
    .luxury-card { padding: 40px 24px; border-radius: 40px; }
    h2 { font-size: 32px; letter-spacing: -0.02em; }
    .premium-pill { width: 100%; justify-content: space-between; padding: 6px; }
    .text { margin-left: 15px; font-size: 12px; }
  }
</style>