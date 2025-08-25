# Elite Sports Car Gallery

![Elite Sports Car Gallery](https://imgix.cosmicjs.com/f5856950-a455-11ed-81f2-f50e185dd248-NRQV-hBF10M.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern Next.js website showcasing premium sports cars with detailed specifications, sales team profiles, and dealership information. Built with Cosmic headless CMS for dynamic content management.

## ✨ Features

- 🏎️ Interactive sports car gallery with high-resolution images
- 📋 Detailed vehicle specifications and features
- 👥 Sales team profiles with specializations
- 🏢 Dealership locations and services
- 📱 Fully responsive mobile design
- 🔍 Advanced filtering and search capabilities
- 🎨 Modern dark theme with premium aesthetics
- ⚡ Optimized performance with Next.js 15

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68acd57904ea77b1e31e5625&clone_repository=68acd76304ea77b1e31e563e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a sports car dealership

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Use a modern style and design.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic headless CMS
- **Language**: TypeScript
- **Image Optimization**: Imgix
- **Font**: Inter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the sports car dealership content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Sports Cars

```typescript
const cars = await cosmic.objects
  .find({ type: 'sports-cars' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Sales Team Members

```typescript
const salesTeam = await cosmic.objects
  .find({ type: 'sales-team' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## 🌐 Cosmic CMS Integration

This application leverages your existing Cosmic content structure:

- **Sports Cars**: Vehicle listings with specifications, images, and pricing
- **Sales Team**: Staff profiles with specializations and contact information  
- **Dealership Locations**: Showroom information with services and hours

The content is automatically synced and displayed through the Cosmic API, providing real-time updates to your website content.

## 🚀 Deployment Options

Deploy your sports car gallery to:

- **Vercel**: Optimized for Next.js with automatic deployments
- **Netlify**: Static site deployment with edge functions
- **AWS Amplify**: Full-stack deployment with CI/CD pipeline

Remember to configure your environment variables in your chosen deployment platform.

For more information about Cosmic, visit the [Cosmic docs](https://www.cosmicjs.com/docs).
<!-- README_END -->