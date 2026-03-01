<script lang="ts">
  export let field_cta_title: string = "Ready to see the math?";
  export let field_cta_subtitle: string = "Calculate your dog's custom meal plan instantly.";
  export let button_text: string = "Calculate My Plan";
  export let button_url: string = "/calculator";
</script>

<section class="cta-light-impact">
  <div class="luxury-card">
    <div class="content">
      <span class="location-badge">Miami • Ft. Lauderdale • Palm Beach</span>
      <h2>{field_cta_title}</h2>
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
    padding: 140px 20px;
    background: #ffffff;
    position: relative;
  }

  /* Subtle soft glow to make the white card "pop" from the white background */
  .luxury-card {
    max-width: 1100px;
    margin: 0 auto;
    background: #ffffff;
    padding: 100px 40px;
    border-radius: 60px;
    text-align: center;
    position: relative;
    border: 1px solid #f0f0f0;
    box-shadow: 
      0 10px 30px rgba(0,0,0,0.02),
      0 40px 100px rgba(255, 77, 77, 0.05); /* Subtle brand-colored shadow */
  }

  .location-badge {
    color: #ff4d4d;
    font-weight: 900;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 24px;
    display: block;
  }

  h2 {
    color: #1a1a1a;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 20px;
  }

  p {
    color: #888;
    font-size: 20px;
    max-width: 580px;
    margin: 0 auto 50px;
    font-weight: 400;
  }

  .premium-pill {
    display: inline-flex;
    align-items: center;
    background: #1a1a1a; /* Using black for the button makes it the strongest focal point */
    color: white;
    text-decoration: none;
    padding: 12px 12px 12px 45px;
    border-radius: 100px;
    transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .text {
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 14px;
    margin-right: 30px;
  }

  .icon-box {
    width: 54px;
    height: 54px;
    background: #ff4d4d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
  }

  .icon-box svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  /* Interaction: The red circle expands on hover */
  .premium-pill:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(255, 77, 77, 0.2);
    background: #000;
  }

  .premium-pill:hover .icon-box {
    transform: scale(1.1) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .luxury-card { padding: 60px 20px; border-radius: 40px; }
    h2 { font-size: 34px; }
    .premium-pill { width: 100%; justify-content: space-between; padding: 10px; }
    .text { margin-left: 20px; }
  }
</style>