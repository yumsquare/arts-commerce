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

#### Thought Process & Trade-offs

- **Home Page Caching Strategy**: Implemented time-based revalidation (1-hour cache) for the home page to balance performance and content freshness. This improves load times and reduces API calls while ensuring product data is reasonably current. The trade-off accepts slightly stale data for significantly better performance and reduced backend load.

- **Image Display Optimization**: I optimized product display for images with transparent backgrounds, as most of the product images in the dataset have transparent backgrounds. This design decision means that some images without transparent backgrounds might not look as good within the product cards.

- **Multiple Image Handling**: I implemented a thumbnail gallery system that lets users switch between product images, which enhances the shopping experience by providing a more comprehensive view of products, but this feature requires client-side rendering, potentially impacting initial load performance, so future optimization efforts should focus on code-splitting this component to reduce the JavaScript bundle size and improve overall page load times.

- **Cumulative Layout Shift (CLS)**: Perfect score of 0 achieved through fixed-height containers, image placeholders with explicit dimensions, reserved space for dynamic elements, and consistent grid layouts with defined constraints.

- **Modern Clean Minimal Design**: I attempted a modern, clean, and minimal design approach throughout the application. This includes ample white space, subtle shadows, rounded corners, and a focused color scheme. This minimalist approach enhances readability and user focus, though it may limit visual richness for users who prefer more decorative interfaces.

- **Skeleton Loaders**: I implemented skeleton loading states throughout the application to enhance the user experience during data fetching. This improves perceived performance and maintains layout stability, though it adds some complexity to component implementation.

- **Persistent Cart**: I implemented persistent cart storage using Zustand persist middleware to maintain cart state across page refreshes and browser sessions. The trade-off is slightly increased local storage usage, but the benefit of persistence outweighs the minimal storage cost.

### Known Limitations

- No authentication or checkout process
- Limited product filtering or search capabilities
- Mock e-commerce - no actual payment processing
- No pagination of products
