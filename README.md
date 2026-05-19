# BoiNet Frontend

🚀 **Live:** https://boi-net-frontend-7d72.vercel.app/

A modern React application for managing and browsing books with authentication, payments (Stripe), and community features.

## Features

- 📚 Book browsing with filtering & pagination
- 🔐 Secure authentication (JWT)
- 💳 Stripe payment integration
- 👥 User dashboard & management
- 🎨 Responsive design with animations
- 📖 Community features
- About, Authors, Contact, Privacy pages

## Tech Stack

- **React 19** + **TypeScript** - UI & type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **TanStack React Query** - Data fetching
- **Axios** - HTTP client
- **Stripe** - Payment processing
- **Motion** - Animations
- **Lucide React** - Icons

## Project Structure

```
src/
├── Components/    # UI components (Home, Book, Dashboard, etc.)
├── Pages/         # Page components
├── Services/      # API calls (auth, book, checkout, user)
├── Context/       # Authentication context
├── Hooks/         # Custom React hooks
├── types/         # TypeScript definitions
├── lib/           # Utilities & helpers
└── Api/           # Axios configuration
```

## Setup

```bash
# Install dependencies
npm install

# Configure .env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Development
npm run dev

# Production build
npm run build
```

---

**Status:** ✅ Live & Deployed  
**Backend API:** Required (Configure in .env)  
**License:** MIT
```

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Azure Static Web Apps

Simply build the project and upload the `dist/` directory contents.

## Future Enhancements

- User reviews and ratings
- Wishlist functionality
- Social sharing features
- Multi-language support
- Analytics dashboard

---

**Last Updated**: May 2026  
**Version**: 1.0.0 (Development)
