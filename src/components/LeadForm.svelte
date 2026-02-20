<script>
  export let dogName = "";
  export let dailyCalories = 0;
  export let portionGrams = 0;

  let phone = "";
  let zip = "";
  let submitted = false;
  let loading = false;

  async function handleSubmit() {
    loading = true;
    
    // This will point to your Go API
    const response = await fetch('http://localhost:8080/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dogName,
        dailyCalories,
        portionGrams,
        phone,
        zip,
        source: 'ChefPaws Calculator'
      })
    });

    if (response.ok) {
      submitted = true;
    } else {
      alert("Something went wrong. Please try again.");
    }
    loading = false;
  }
</script>

<div class="lead-container">
  {#if !submitted}
    <div class="form-header">
      <span class="eyebrow">Next Steps</span>
      <h2>Secure a Consultation for {dogName}</h2>
      <p>We'll review {dogName}'s {dailyCalories} kcal profile and contact you to discuss a local delivery schedule.</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="stack">
      <div class="input-group">
        <label for="phone">Phone Number</label>
        <input type="tel" bind:value={phone} placeholder="(508) 000-0000" required />
      </div>

      <div class="input-group">
        <label for="zip">Delivery Zip Code</label>
        <input type="text" bind:value={zip} placeholder="02135" required />
      </div>

      <button type="submit" class="btn-submit" disabled={loading}>
        {loading ? 'Sending...' : 'Request My Custom Plan'}
      </button>
    </form>
  {:else}
    <div class="success-state" in:fade>
      <div class="icon-check">✓</div>
      <h2>Analysis Sent!</h2>
      <p>Your brother will reach out to discuss the best formulation for {dogName}.</p>
      
      <div class="transition-preview">
        <h3>Your 7-Day Transition Roadmap</h3>
        <p>While you wait, here is how we'll move {dogName} to raw:</p>
        
      </div>
    </div>
  {/if}
</div>

<style>
  .lead-container {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    padding: 3rem;
    border-radius: 24px;
    margin-top: 3rem;
  }

  .eyebrow {
    font-weight: 800;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #ff6b6b;
    letter-spacing: 0.1em;
  }

  h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; margin: 0.5rem 0; }
  p { color: #71717a; line-height: 1.6; margin-bottom: 2rem; }

  .stack { display: flex; flex-direction: column; gap: 1.5rem; }

  .input-group label {
    display: block;
    font-weight: 700;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #e4e4e7;
    font-size: 1rem;
    font-weight: 600;
  }

  .btn-submit {
    background: #2c2c2e;
    color: white;
    padding: 1.25rem;
    border-radius: 100px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.25rem;
    border: none;
    cursor: pointer;
    transition: 0.2s;
  }

  .btn-submit:hover { background: #ff6b6b; }

  .success-state { text-align: center; }
  .icon-check { 
    font-size: 3rem; 
    color: #22c55e; 
    margin-bottom: 1rem; 
  }

  .transition-preview {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #fdfcf8;
    border-radius: 16px;
    text-align: left;
  }
</style>