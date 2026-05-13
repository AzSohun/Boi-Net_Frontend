# BoiNet Frontend

A modern, full-featured React application for managing and browsing books with user authentication, payment processing, and community features.

## Overview

BoiNet is a comprehensive book management platform built with React 19, TypeScript, and Vite. It provides a seamless experience for users to discover books, manage their library, process payments securely with Stripe, and connect with the community.

## Features

### 📚 Core Functionality
- **Book Browsing**: Explore a collection of books with advanced filtering and pagination
- **Book Details**: View comprehensive information about each book including reviews, pricing, and availability
- **Authentication**: Secure user registration and login system
- **Dashboard**: Personal user dashboard for managing books and account settings
- **Checkout & Payments**: Integrated Stripe payment processing for book purchases
- **Community**: Connect with other readers and participate in community events

### 🎨 User Interface
- **Responsive Design**: Fully responsive layouts using Tailwind CSS
- **Smooth Animations**: Modern motion effects with Motion library
- **Intuitive Navigation**: Clean navigation structure with protected routes
- **Form Handling**: Robust form validation with React Hook Form

### 🔐 Security
- **Protected Routes**: Authentication-based route protection
- **Axios Interceptors**: Centralized API request/response handling
- **Secure Token Management**: JWT token storage and refresh handling
- **Environment Configuration**: Secure configuration management

### 🌐 Additional Pages
- **About**: Learn about BoiNet's mission, philosophy, and values
- **Authors**: Discover author profiles and their works
- **Contact**: Get in touch with the team
- **Privacy Policy**: Comprehensive privacy information
- **Payment Success**: Order confirmation page

## Tech Stack

### Frontend Framework
- **React 19.2.5** - UI library
- **TypeScript 6.0** - Type safety
- **Vite 8.0** - Build tool and dev server
- **React Router DOM 7.14** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **Lucide React 1.14** - Icon library
- **Motion 12.38** - Animation library

### State Management & Data Fetching
- **TanStack React Query 5.100** - Server state management
- **Context API** - Local state management (Authentication)
- **Axios 1.16** - HTTP client

### Form & Validation
- **React Hook Form 7.75** - Form state management

### Payment Processing
- **Stripe React 6.3** - Stripe payment integration
- **Stripe JS 9.4** - Stripe client library

### Utilities
- **JS Cookie 3.0** - Cookie management

### Development Tools
- **ESLint 10.2** - Code linting
- **TypeScript ESLint 8.58** - TypeScript linting
- **Prettier** (configured) - Code formatting

## Project Structure

```
src/
├── Api/                      # API client setup
│   └── axiosClient.ts       # Axios instance configuration
├── Components/              # Reusable React components
│   ├── About/              # About page components
│   ├── Authors/            # Authors page components
│   ├── Book/               # Book listing components
│   ├── BookDetails/        # Book detail page components
│   ├── Checkout/           # Checkout components
│   ├── Community/          # Community page components
│   ├── Contact/            # Contact page components
│   ├── Dashboard/          # Dashboard components
│   ├── Home/               # Home page components
│   ├── Privacy/            # Privacy policy components
│   ├── shared/             # Shared components (Navbar, Footer, etc.)
│   └── UI/                 # UI components (Feedback, etc.)
├── Context/                # React Context for state management
│   └── AuthContext.tsx     # Authentication context
├── Hooks/                  # Custom React hooks
│   ├── useBooks.ts         # Hook for book data
│   ├── useUser.ts          # Hook for user data
│   └── useUsers.ts         # Hook for users list
├── lib/                    # Utility functions
│   ├── api-utils.ts        # API utilities
│   └── imageUtils.ts       # Image processing utilities
├── Pages/                  # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Authors.tsx
│   ├── Book.tsx
│   ├── BookDetails.tsx
│   ├── Community.tsx
│   ├── Contact.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Privacy.tsx
│   ├── PaymentSuccess.tsx
│   └── Contact.tsx
├── Services/               # API service functions
│   ├── authService.ts      # Authentication API calls
│   ├── bookService.ts      # Book API calls
│   ├── checkoutService.ts  # Checkout API calls
│   └── userService.ts      # User API calls
├── types/                  # TypeScript type definitions
│   ├── auth.ts            # Authentication types
│   ├── book.ts            # Book types
│   └── checkout.ts        # Checkout types
├── App.tsx                # Root app component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- Stripe API keys (for payment functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boi-net-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Lint code with ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Key Features Explained

### Authentication Flow
- Users can register and login through dedicated pages
- Authentication state is managed via React Context
- Tokens are securely stored using js-cookie
- Protected routes automatically redirect unauthenticated users to login
- Axios interceptors handle token refresh and request authentication

### Book Management
- Browse books with filtering and pagination
- View detailed book information
- Track reading progress in personal dashboard
- Add books to personal library

### Payment Processing
- Secure Stripe integration for book purchases
- Real-time payment validation
- Order confirmation and payment success pages
- Checkout flow with payment model

### Community Features
- Community events and announcements
- Author profiles and bios
- User testimonials
- Community engagement tracking

## API Integration

### Services
The application communicates with a backend API through dedicated service modules:

- **authService** - Handle login, registration, and token management
- **bookService** - Fetch and filter book data
- **checkoutService** - Process payments and orders
- **userService** - Manage user profiles and preferences

### Axios Configuration
The axios client is configured with interceptors to:
- Automatically include authentication tokens
- Handle token refresh on 401 responses
- Provide centralized error handling
- Transform requests/responses

## Styling

### Tailwind CSS
- Utility-first CSS framework for rapid UI development
- Responsive design utilities
- Dark mode support ready
- Custom theme configuration in `tailwind.config.js`

### Component-Level Styles
Individual component styles are managed through:
- Tailwind utility classes
- CSS modules (when needed)
- Component-scoped styles

## State Management

### Context API
- **AuthContext**: Manages global authentication state (user, tokens, login/logout)

### React Query
- Server state management for API data
- Automatic caching and synchronization
- Stale time: 5 minutes
- Retry policy: 1 attempt

### Local State
- Component-level state with React hooks
- Form state with React Hook Form

## Development Guidelines

### Component Organization
- Place reusable components in `Components/`
- Page-specific components go in `Pages/`
- Share logic through custom hooks in `Hooks/`
- API calls through `Services/`

### Type Safety
- Always define types in `types/` directory
- Use interfaces for data structures
- Leverage TypeScript strict mode

### API Communication
- Use appropriate service module for API calls
- Handle loading and error states
- Use React Query for server state
- Show user feedback for errors

### Code Quality
- Run ESLint before committing: `npm run lint`
- Follow component naming conventions
- Keep components focused and single-responsibility
- Document complex logic with comments

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Code splitting for optimal performance
- Tree-shaking for reduced bundle size
- Source maps for debugging

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting with React Router
- **Image Optimization**: Utility functions for image processing
- **Lazy Loading**: Components loaded on demand
- **Query Caching**: React Query handles data caching
- **Tree Shaking**: Unused code removed during build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to this project:
1. Follow the existing code structure and naming conventions
2. Ensure all TypeScript types are properly defined
3. Run linting before submitting changes
4. Test new features thoroughly
5. Update documentation as needed

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173 | taskkill /PID <PID> /F
# macOS/Linux: lsof -ti :5173 | xargs kill -9
```

**Dependencies Installation Failed**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Failures**
```bash
# Check TypeScript errors
npm run build

# Fix any type errors and try again
```

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Azure Static Web Apps

Simply build the project and upload the `dist/` directory contents.

## License

[Add your license here]

## Support

For issues and questions:
- Check existing documentation
- Review component source code
- Check the troubleshooting section
- Open an issue in the repository

## Future Enhancements

- [ ] Dark mode implementation
- [ ] Advanced search and filtering
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Analytics dashboard

---

**Last Updated**: May 2026  
**Version**: 0.0.0 (Development)
