# Arts Commerce

A modern e-commerce web application built with Next.js and DummyJSON API.

## Features

- Product listing with images, prices, and ratings
- Detailed product pages with discounts and descriptions
- Shopping cart with persistent storage
- Responsive design for all device sizes

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
- Next.js App Router for routing and server components
- Zustand with persistence for cart state management
- Tailwind CSS for styling
- Fetch API for data retrieval from DummyJSON endpoints

### Trade-offs and Considerations

- Server components for initial product fetching to improve SEO and performance
- Client components for interactive elements like cart functionality
- Persistent cart state using Zustand's persist middleware to maintain user's selections

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
