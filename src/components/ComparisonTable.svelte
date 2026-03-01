<script lang="ts">
  // Props mapping exactly to your Drupal JSON:API output
  export let field_comp_title: string = "The ChefPaws Difference";
  export let field_comparison_items: Array<{
    field_feature: string;
    field_chespaws_values: string; 
    field_kibble_value: string;
  }> = [];
</script>

<section class="comparison-section">
  <div class="wrapper">
    <span class="eyebrow">Market Comparison</span>
    <h2>{field_comp_title}</h2>
    
    {#if field_comparison_items && field_comparison_items.length > 0}
      <div class="table-container">
        <table class="comps-table">
          <thead>
            <tr>
              <th class="feature-head">Feature</th>
              <th class="brand-head">ChefPaws</th>
              <th class="competitor-head">Standard Kibble</th>
            </tr>
          </thead>
          <tbody>
            {#each field_comparison_items as row}
              <tr>
                <td class="feature-label">{row.field_feature}</td>
                <td class="chefpaws-cell" data-label="ChefPaws">
                  <span class="status-icon">✓</span> {row.field_chespaws_values}
                </td>
                <td class="kibble-cell" data-label="Standard Kibble">
                  <span class="status-icon">✕</span> {row.field_kibble_value}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="loading-msg">Loading the Florida fresh details...</p>
    {/if}
  </div>
</section>

<style>
  /* --- DESKTOP STYLES --- */
  .comparison-section {
    padding: 10rem 2rem;
    background-color: #ffffff;
  }

  .wrapper {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  .eyebrow {
    color: #ff4d4d;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    display: block;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 5rem;
    text-transform: uppercase;
    color: #1a1a1a;
    letter-spacing: -0.03em;
  }

  .table-container {
    background: #fff;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.05);
    border: 1px solid #f2f2f2;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th {
    padding: 2rem 3rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 900;
    border-bottom: 1px solid #eee;
  }

  .feature-head { color: #aaa; width: 30%; }
  
  .brand-head { 
    background: #ff4d4d; 
    color: #fff; 
    text-align: center;
  }
  
  .competitor-head { 
    color: #aaa; 
    text-align: center; 
    background: #fafafa;
  }

  td {
    padding: 2rem 3rem;
    border-bottom: 1px solid #f8f8f8;
    font-size: 1.1rem;
    vertical-align: middle;
  }

  .feature-label {
    font-weight: 800;
    color: #1a1a1a;
  }

  .chefpaws-cell {
    background: rgba(255, 77, 77, 0.02);
    font-weight: 700;
    color: #000;
    text-align: center;
    border-left: 1px solid #fefefe;
  }

  .kibble-cell {
    color: #888;
    text-align: center;
    background: #fafafa;
  }

  .status-icon {
    font-weight: 900;
    margin-right: 8px;
  }

  .chefpaws-cell .status-icon { color: #ff4d4d; }
  .kibble-cell .status-icon { color: #ddd; }

  /* --- MOBILE STYLES (THE FIX) --- */
  @media (max-width: 850px) {
    .comparison-section { padding: 5rem 1.5rem; }
    
    h2 { font-size: 2.2rem; margin-bottom: 3rem; }

    /* Hide the original header */
    thead { display: none; }

    /* Force table elements to stack */
    table, tbody, tr, td {
      display: block;
      width: 100%;
    }

    tr {
      padding: 2.5rem 0;
      border-bottom: 1px solid #eee;
    }

    tr:last-child { border-bottom: none; }

    td {
      padding: 0.75rem 1.5rem !important;
      border: none !important;
      text-align: left !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Feature Label becomes a small header for the 'card' */
    .feature-label {
      background: #fdfdfd;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #ff4d4d;
      margin-bottom: 1rem;
      padding: 1rem 1.5rem !important;
    }

    /* Inject labels using the data-label attribute */
    td:not(.feature-label)::before {
      content: attr(data-label);
      font-weight: 900;
      text-transform: uppercase;
      font-size: 0.7rem;
      color: #bbb;
      letter-spacing: 0.1em;
    }

    .chefpaws-cell { background: transparent !important; color: #1a1a1a; }
    .kibble-cell { background: transparent !important; }
  }
</style>