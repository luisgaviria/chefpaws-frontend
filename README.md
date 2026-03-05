ChefPaws | Decoupled Enterprise E-commerce

ChefPaws is a high-performance, decoupled content and subscription platform. Built to solve the performance bottlenecks of traditional monolithic CMS setups, this project leverages a Headless Drupal 11 backend, a Go intermediate logic layer, and an Astro/Svelte frontend.

🚀 Performance Benchmark
Lighthouse Score: 100/100 (Performance, Accessibility, Best Practices, SEO)

First Contentful Paint: < 0.8s

Architecture: Islands Architecture / Static Site Generation (SSG)

🏗 The Architecture
The core philosophy of this project is separation of concerns. By decoupling the head from the body, the platform achieves enterprise-level security, lightning-fast speeds, and developer flexibility.

Backend (Content & Media): Drupal 11 serves as a Headless CMS, providing structured data via JSON:API.

Logic Layer (The Bridge): A custom Go service handles dynamic routing, data transformation, and business logic, ensuring the frontend receives only the necessary payload.

Frontend (The UI): Astro manages the static generation, while Svelte handles interactive elements (like subscription toggles and cart logic).

Storage: Assets are offloaded to AWS S3 and Cloudflare R2 to minimize server load and maximize global delivery speed.

🛠 Key Engineering Features

1. Dynamic Component Mapping
   I engineered a system that allows content editors in Drupal to "build" pages using a library of predefined components.

How it works: The Go layer parses the Drupal layout data and maps it to specific Svelte components.

The Result: Non-technical users can create high-conversion landing pages without a single code change, while maintaining a 100/100 performance score.

2. Optimized Asset Pipeline
   To ensure the site remains lightweight, I implemented a custom pipeline:

Images are managed in Drupal but served via Cloudflare R2.

Utilized Astro's image optimization to serve Next-Gen formats (WebP/AVIF) automatically.

3. Type-Safe Data Flow
   Used TypeScript across the frontend and intermediate layers to ensure that the complex data structures coming from the CMS are validated before rendering, drastically reducing runtime errors.

💻 Tech Stack
Frontend: Astro, Svelte, Tailwind CSS, TypeScript

Backend: Drupal 11 (Headless), PHP 8.3

Logic: Go (Golang)

Infrastructure: Docker, AWS S3, Cloudflare R2, GitHub Actions

🚦 Getting Started
Clone the repo:

Bash
git clone https://github.com/luisgaviria/chefpaws-frontend.git
Install dependencies:

Bash
npm install
Set Environment Variables:
Create a .env file with your DRUPAL_API_URL and GO_LOGIC_ENDPOINT.

Run Development Server:

Bash
npm run dev
📈 Future Roadmap
[ ] Integration with Stripe for subscription management.

[ ] Real-time delivery tracking via third-party logistics APIs.

[ ] PWA (Progressive Web App) support for mobile-first ordering.
