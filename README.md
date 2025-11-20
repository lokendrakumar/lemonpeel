# LemonPeel - Modern Next.js Application

A modern, full-stack Next.js 16 application built with TypeScript, Tailwind CSS, and a well-organized folder structure for scalable development.

## 🚀 Features

- **Next.js 16** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **ESLint** for code linting
- **Jest** for testing
- **Modular Architecture** with organized folder structure

## 📁 Project Structure

```
lemonpeel/
│
├── 📄 package.json               # Project dependencies and scripts
├── 📄 next.config.ts             # Next.js configuration
├── 📄 postcss.config.mjs         # PostCSS (used by Tailwind)
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 .eslintrc.json             # Linting rules
├── 📄 jest.config.js             # Jest testing configuration
├── 📄 jest.setup.js              # Jest setup file
├── 📄 .gitignore                 # Git ignore file
├── 📁 public/                    # Static assets
│   ├── favicon.ico
│   ├── *.svg files
│   └── logo.png.placeholder
│
├── 📁 styles/                    # Global styles
│   ├── globals.css               # Tailwind imports + global styles
│   └── home.module.css           # CSS modules example
│
├── 📁 app/                       # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   └── about/
│       └── page.js               # About page
│
├── 📁 components/                # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Button.jsx
│
├── 📁 features/                  # Feature modules
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── index.js
│   └── dashboard/
│       ├── DashboardPage.jsx
│       └── index.js
│
├── 📁 lib/                       # Helper utilities
│   ├── api.js                    # API client
│   ├── constants.js              # App constants
│   └── helpers.js                # Utility functions
│
├── 📁 hooks/                     # Custom React hooks
│   ├── useAuth.js
│   └── useFetch.js
│
├── 📁 context/                   # Context API files
│   ├── ThemeContext.js
│   └── UserContext.js
│
├── 📁 types/                     # TypeScript type definitions
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
│
└── 📁 tests/                     # Test files
    ├── components/
    │   └── Button.test.jsx
    └── utils/
        └── helpers.test.js
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lemonpeel
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🧪 Testing

The project includes Jest and React Testing Library for testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 Styling

This project uses Tailwind CSS for styling with:
- Dark mode support
- Responsive design
- Custom components
- CSS modules for specific components

## 🏗️ Architecture

### Components
Reusable UI components stored in `/components`

### Features 
Feature-based modules in `/features` for better organization

### Hooks
Custom React hooks in `/hooks` for shared logic

### Context
React Context providers in `/context` for global state

### Types
TypeScript type definitions in `/types`

### Tests
Test files organized by component/utility in `/tests`

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

```bash
npm run build
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
