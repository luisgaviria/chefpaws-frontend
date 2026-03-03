<script lang="ts">
  import { z } from 'zod';

  // ── Props ────────────────────────────────────────────────────────────────
  // Field names match the Drupal paragraph--contact_form machine names exactly
  // so that {...section.content} spread in [...slug].astro wires them up with
  // no manual mapping required.
  export let field_contact_heading: string = '';
  export let field_contact_subtext: string = '';
  export let field_submit_label: string    = '';
  export let field_success_alert: string   = '';

  const heading     = field_contact_heading || 'Get in Touch';
  const subheading  = field_contact_subtext || "Have a question about your dog's nutrition? We'd love to hear from you.";
  const submitLabel = field_submit_label    || 'Send Message';
  const successMsg  = field_success_alert   || "Thanks! We'll be in touch within 24 hours.";

  // ── Zod schema ───────────────────────────────────────────────────────────
  const schema = z.object({
    name:    z.string().min(2, 'Name must be at least 2 characters'),
    email:   z.string().email('Please enter a valid email address'),
    breed:   z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

  type FormData = z.infer<typeof schema>;

  // ── State ────────────────────────────────────────────────────────────────
  let form: FormData = { name: '', email: '', breed: '', message: '' };
  let errors: Partial<Record<keyof FormData, string>> = {};
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let serverError = '';

  // ── Handlers ─────────────────────────────────────────────────────────────
  function validate(): boolean {
    const result = schema.safeParse(form);
    if (result.success) {
      errors = {};
      return true;
    }
    errors = Object.fromEntries(
      result.error.issues.map(i => [i.path[0], i.message])
    ) as typeof errors;
    return false;
  }

  async function handleSubmit() {
    if (!validate()) return;

    status = 'loading';
    serverError = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        status = 'success';
        form = { name: '', email: '', breed: '', message: '' };
      } else {
        status = 'error';
        serverError = data.error ?? 'Something went wrong. Please try again.';
      }
    } catch {
      status = 'error';
      serverError = 'Unable to reach the server. Please try again later.';
    }
  }
</script>

<section class="contact-section">
  <div class="container">

    <header class="section-header">
      <p class="eyebrow">Contact</p>
      <h2 class="section-title">{heading}</h2>
      <p class="section-subtitle">{subheading}</p>
    </header>

    {#if status === 'success'}
      <div class="success-card">
        <div class="success-icon">🐾</div>
        <p class="success-text">{successMsg}</p>
      </div>
    {:else}
      <form class="contact-form" on:submit|preventDefault={handleSubmit} novalidate>

        <div class="field-row">
          <!-- Name -->
          <div class="field" class:has-error={!!errors.name}>
            <label for="cf-name">Your Name</label>
            <input
              id="cf-name"
              type="text"
              placeholder="Jane Smith"
              bind:value={form.name}
              autocomplete="name"
            />
            {#if errors.name}<span class="error-msg">{errors.name}</span>{/if}
          </div>

          <!-- Email -->
          <div class="field" class:has-error={!!errors.email}>
            <label for="cf-email">Email Address</label>
            <input
              id="cf-email"
              type="email"
              placeholder="jane@example.com"
              bind:value={form.email}
              autocomplete="email"
            />
            {#if errors.email}<span class="error-msg">{errors.email}</span>{/if}
          </div>
        </div>

        <!-- Breed (optional) -->
        <div class="field">
          <label for="cf-breed">Dog's Breed <span class="optional">(optional)</span></label>
          <input
            id="cf-breed"
            type="text"
            placeholder="e.g. Golden Retriever"
            bind:value={form.breed}
          />
        </div>

        <!-- Message -->
        <div class="field" class:has-error={!!errors.message}>
          <label for="cf-message">Message</label>
          <textarea
            id="cf-message"
            rows="5"
            placeholder="Tell us about your dog and how we can help…"
            bind:value={form.message}
          ></textarea>
          {#if errors.message}<span class="error-msg">{errors.message}</span>{/if}
        </div>

        {#if status === 'error'}
          <div class="server-error">{serverError}</div>
        {/if}

        <button type="submit" class="submit-btn" disabled={status === 'loading'}>
          {#if status === 'loading'}
            <span class="spinner"></span> Sending…
          {:else}
            {submitLabel}
          {/if}
        </button>

      </form>
    {/if}

  </div>
</section>

<style>
  .contact-section {
    background: #fff;
    padding: clamp(4rem, 9vw, 9rem) clamp(1.25rem, 5vw, 2rem);
  }

  .container {
    max-width: 700px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .section-header {
    text-align: center;
    margin-bottom: clamp(2.5rem, 5vw, 4rem);
  }

  .eyebrow {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--brand-accent, #ff6b6b);
    margin: 0 0 1rem;
  }

  .section-title {
    font-size: clamp(1.85rem, 4.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.1;
    color: #111;
    margin: 0 0 0.85rem;
    text-wrap: balance;
  }

  .section-subtitle {
    font-size: 1rem;
    color: #999;
    line-height: 1.65;
    margin: 0;
    text-wrap: balance;
  }

  /* ── Form card ── */
  .contact-form {
    background: #fafaf9;
    border: 1px solid #ebebeb;
    border-radius: 1.5rem;
    padding: clamp(1.75rem, 4vw, 2.75rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 540px) {
    .field-row { grid-template-columns: 1fr; }
  }

  /* ── Field ── */
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #444;
    letter-spacing: 0.02em;
  }

  .optional {
    font-weight: 400;
    color: #aaa;
  }

  input,
  textarea {
    width: 100%;
    background: #fff;
    border: 1.5px solid #e5e5e5;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    color: #111;
    line-height: 1.5;
    transition: border-color 0.15s;
    box-sizing: border-box;
    font-family: inherit;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #111;
  }

  .has-error input,
  .has-error textarea {
    border-color: #e53e3e;
  }

  .error-msg {
    font-size: 0.78rem;
    color: #e53e3e;
    font-weight: 500;
  }

  /* ── Server error ── */
  .server-error {
    background: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    font-size: 0.88rem;
    color: #c53030;
  }

  /* ── Submit button ── */
  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 0.9rem 2.25rem;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    align-self: flex-start;
    transition: background 0.2s, transform 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #000;
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* ── Spinner ── */
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Success state ── */
  .success-card {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 1.5rem;
    padding: 3rem 2rem;
    text-align: center;
  }

  .success-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .success-text {
    font-size: 1.05rem;
    color: #166534;
    font-weight: 500;
    margin: 0;
    line-height: 1.6;
  }
</style>
