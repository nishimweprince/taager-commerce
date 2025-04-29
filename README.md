# ShopSmart E-Commerce Platform

A modern, responsive e-commerce platform built with React, Redux, and TypeScript following clean architecture principles.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Core Entities](#core-entities)
- [Repository Pattern](#repository-pattern)
- [Use Cases](#use-cases)
- [Contributing](#contributing)
- [License](#license)

## Overview

ShopSmart is a complete e-commerce solution with a clean, modern UI that demonstrates best practices in React development, clean architecture, and domain-driven design. The application showcases products, handles cart management, and provides a seamless shopping experience.

## Architecture

The application follows Clean Architecture principles with a clear separation of concerns:

- **Domain Layer** - Contains business logic and entities
- **Application Layer** - Implements use cases and state management
- **Adapters Layer** - Handles external interfaces and API communication
- **Infrastructure Layer** - Provides UI components and technical implementations

This architecture ensures:
- Testability
- Maintainability
- Scalability
- Independence from frameworks

## Technology Stack

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router 7
- **Styling**: TailwindCSS 4
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React & FontAwesome
- **Forms**: React Hook Form
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.7
- **HTTP Client**: Built into Redux Toolkit (RTK Query)

## Project Structure

```
e-commerce/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── adapters/           # External interfaces adapters
│   │   └── api/            # API communication
│   │       └── mappers/    # Data transformation between API and domain
│   ├── application/        # Application business rules
│   │   ├── services/       # Service implementations
│   │   └── state/          # State management (Redux)
│   │       └── slices/     # Redux slices
│   ├── components/         # Shared UI components
│   │   └── ui/             # UI primitives
│   ├── domain/             # Enterprise business rules
│   │   ├── entities/       # Business entities
│   │   ├── repositories/   # Repository interfaces
│   │   └── usecases/       # Business use cases
│   │       ├── cart/       # Cart-related use cases
│   │       ├── category/   # Category-related use cases
│   │       └── product/    # Product-related use cases
│   ├── infrastructure/     # Framework & drivers
│   │   ├── lib/            # Utility functions
│   │   ├── routes/         # Application routes
│   │   └── ui/             # UI implementations
│   │       ├── components/ # UI components
│   │       └── pages/      # Page components
│   └── lib/                # Library code
├── .gitignore
├── components.json         # Component configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Features

- **Product Catalog**: Browse and search products
- **Product Details**: View detailed product information
- **Shopping Cart**: Add, remove, and update items
- **Category Filtering**: Filter products by category
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Clean UI**: Modern and intuitive user interface
- **Type Safety**: Full TypeScript implementation

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/shopsmart-ecommerce.git
cd shopsmart-ecommerce
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=https://fakestoreapi.com
```

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Platforms

The application can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## API Integration

The application uses the Fake Store API (https://fakestoreapi.com) for product data. The integration is handled through:

1. API endpoints defined in `src/adapters/api/endpoints.ts`
2. API client implementations in `src/adapters/api/apiQuerySlice.ts`
3. Data transformations in `src/adapters/api/mappers/`

## State Management

Redux Toolkit is used for state management:

- **Store Configuration**: `src/application/state/store.ts`
- **Slices**:
  - Products: `src/application/state/slices/productSlice.ts`
  - Cart: `src/application/state/slices/cartSlice.ts`
- **Hooks**: Custom Redux hooks in `src/application/state/hooks.ts`

## Core Entities

### Product

```typescript
interface Product extends BaseEntity {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

### Cart

```typescript
interface Cart extends BaseEntity {
  userId: number;
  products: Product[];
}
```

### Category

```typescript
interface Category extends BaseEntity {
  name: string;
  description?: string;
  image?: string;
}
```

## Repository Pattern

The application implements the Repository pattern to abstract data access:

- **Interfaces**: Defined in `src/domain/repositories/`
  - `IProductRepository`
  - `ICartRepository`
  - `ICategoryRepository`
  
- **Implementations**: Located in `src/adapters/repositories/`

This pattern allows for:
- Swapping data sources without affecting business logic
- Easier testing with mock repositories
- Clean separation between data access and domain logic

## Use Cases

Business logic is organized into use cases:

- **Product Use Cases**:
  - `GetProductsUseCase`
  - `GetProductByIdUseCase`
  - `GetProductsByCategoryUseCase`
  
- **Cart Use Cases**:
  - `AddToCartUseCase`
  - `RemoveFromCartUseCase`
  - `UpdateCartQuantityUseCase`
  
- **Category Use Cases**:
  - `GetCategoriesUseCase`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Nishimwe Prince](https://linkedin.com/in/nishimweprince)
