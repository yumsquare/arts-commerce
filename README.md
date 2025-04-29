# Arts Commerce

A modern, high-performance e-commerce web application built with Next.js and the DummyJSON API.

## Features

- **Product Listing**: Browse products with images, prices, and ratings
- **Detailed Product Pages**: View comprehensive product information with discounts and descriptions
- **Shopping Cart**: Add/remove products with persistent storage
- **Responsive Design**: Optimized layout for all device sizes
- **Performance Optimized**: Perfect Core Web Vitals score with 0 CLS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Details

### Architecture and Design Decisions

This project uses:
- **Next.js 15+** with App Router for routing and server components
- **Zustand with persistence** for cart state management
- **Tailwind CSS** for responsive styling
- **Server Components** for initial data fetching
- **Client Components** for interactive elements

### Core Web Vitals Optimization

The application has been extensively optimized for Core Web Vitals:

- **Cumulative Layout Shift (CLS)**: Score of 0 (perfect) achieved through:
  - Fixed-height containers for dynamic content
  - Image placeholders and explicit dimensions
  - Reserved space for dynamic elements like the cart badge
  - Consistent grid layouts with defined constraints
  
- **Largest Contentful Paint (LCP)**: Optimized through:
  - Priority loading for above-the-fold images
  - Efficient font loading with `font-display: swap`
  - Preloading critical assets

- **First Input Delay (FID)**: Enhanced through:
  - Efficient state management with Zustand
  - Minimized client-side JavaScript
  - Hydration optimization

### Performance Features

- **Image Optimization**: Next.js Image component with proper sizing and loading strategies
- **Static Rendering**: Where possible for faster page loads
- **Dynamic Imports**: For code splitting and reduced initial bundle size
- **Persistent Cart**: Using Zustand's persist middleware with localStorage

### Trade-offs and Considerations

- **Fixed Heights vs. Dynamic Content**: Used fixed heights for layout stability, which may occasionally truncate content
- **Server Components** for initial product fetching to improve SEO and performance
- **Client Components** for interactive elements like cart functionality
- **Balancing CLS and Design Flexibility**: Made design decisions that prioritize stability while maintaining good aesthetics

## Project Structure

### Known Limitations

- No authentication or checkout process
- Limited product filtering or search capabilities
- Mock e-commerce - no actual payment processing

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
