# ShopSmart E-Commerce Platform

A modern, responsive e-commerce platform built with React, Redux Toolkit, and TypeScript, following clean architecture principles.

## Overview
ShopSmart is a full-featured e-commerce web application designed for scalability, maintainability, and a seamless user experience. It demonstrates best practices in frontend architecture, state management, and domain-driven design.

## Architecture
The project follows Clean Architecture principles:
- **Domain Layer**: Business entities, repository interfaces, and use cases.
- **Application Layer**: Implements business logic, state management, and application services.
- **Adapters Layer**: Handles API communication, data mapping, and repository implementations.
- **Presentation Layer**: UI components, pages, and containers.
- **Infrastructure Layer**: Technical utilities, storage, and framework-specific code.

This separation ensures testability, scalability, and ease of maintenance.

## Project Structure

```
e-commerce/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── adapters/          # API clients, mappers, repository implementations
│   │   ├── api/           # API endpoints for cart, products, users
│   │   ├── mappers/       # Data transformation between API and domain
│   │   └── repositories/  # Data access implementations
│   ├── components/        # Shared UI primitives
│   │   └── ui/
│   ├── core/              # Core business logic
│   │   ├── application/   # Use cases, state, and services
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── products/
│   │   │   ├── state/     # Redux slices and store
│   │   │   └── users/
│   │   ├── domain/        # Entities, repositories, use cases
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   │       ├── cart/
│   │   │       ├── category/
│   │   │       └── product/
│   │   ├── infrastructure/    # Storage, technical utilities
│   │   └── storage/
│   ├── lib/               # Shared libraries/utilities
│   └── presentation/      # UI, pages, containers, routes
│       ├── constants/
│       ├── containers/
│       │   └── products/
│       ├── outlets/
│       ├── routes/
│       └── ui/
│           ├── components/
│           │   ├── cart/
│           │   ├── common/
│           │   ├── inputs/
│           │   ├── layout/
│           │   ├── product/
│           │   ├── table/
│           │   └── users/
│           └── pages/
│               ├── auth/
│               ├── cart/
│               ├── dashboard/
│               ├── home/
│               ├── non-functional/
│               ├── product/
│               └── user/
├── ...
```

## Key Features
- **Product Search & Catalog**: Browse, search, and filter products by category.
- **Cart Management**: Add, remove, and update items in your shopping cart with real-time updates.
- **Product Details**: View detailed information, images, and ratings for each product.
- **User Authentication**: Secure login/logout with JWT, using the Fake Store API.
- **Category Filtering**: Easily filter products by category.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Modern UI**: Clean, intuitive interface with custom components and TailwindCSS.
- **Type Safety**: Full TypeScript support for reliability and maintainability.
- **Extensible Architecture**: Easily add new features, entities, or data sources.

## State Management
- **Redux Toolkit** is used for global state management (products, cart, user, etc.).
- **Slices** for each domain (e.g., `productSlice`, `cartSlice`).
- **RTK Query** for efficient API data fetching and caching.
- **Custom hooks** for accessing and updating state.

## API & Authentication
- **Fake Store API** ([fakestoreapi.com](https://fakestoreapi.com)) provides product data and authentication endpoints.
- **JWT-based Auth**: Secure login with token storage in localStorage.
- **Test Credentials:**
  - Username: `johnd`
  - Password: `m38rmF$`

## Quick Start
1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   ```
2. **Run the app:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Visit:** [http://localhost:3000](http://localhost:3000)

## Tech Stack
- **React 19**
- **Redux Toolkit** (with RTK Query)
- **TypeScript 5.7**
- **Vite 6**
- **TailwindCSS 4**
- **React Router 7**
- **Radix UI, Lucide React, FontAwesome**
- **React Hook Form**

## Testing & Extensibility
- The architecture supports easy unit and integration testing (add tests in `__tests__` or alongside modules).
- Repository pattern allows for mocking data sources and swapping implementations.
- Add new features by extending domain/use case layers and connecting to adapters/presentation.

## License
[MIT](./LICENSE)

## Further Documentation
For in-depth guides, architecture details, and advanced usage, see the [Extensive Documentation powered by DeepWiki](https://deepwiki.com/nishimweprince/taager-commerce).
