# 🚗 FlexDrive - Vehicle Discovery Platform

A modern, responsive web application for discovering and exploring vehicles with advanced filtering, location-based search, and detailed vehicle information. Built with Next.js 15, TypeScript, and Tailwind CSS.

**🚀 Live Demo**: [flex-drive.vercel.app](https://flex-drive.vercel.app)

This application has been designed and developed based on the requirements specified in the [Requirements.pdf](Requirements.pdf) document in the root directory.

[![GitHub Repository](https://img.shields.io/badge/GitHub-shastri48%2Fflex--drive-181717?style=flat-square&logo=github)](https://github.com/shastri48/flex-drive)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-flex--drive.vercel.app-00C7B7?style=flat-square&logo=vercel)](https://flex-drive.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![Jest](https://img.shields.io/badge/Jest-30.x-C21325?style=flat-square&logo=jest)

## 🌟 Features

### 🎯 Core Functionality

- **Vehicle Discovery**: Browse and search through a curated collection of vehicles
- **Location-Based Search**: ZIP code integration with persistent storage
- **Advanced Filtering**: Filter by make, model, year, price range, and more
- **Detailed Vehicle Pages**: Comprehensive vehicle information with high-quality images
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience

- **Modern UI/UX**: Clean, intuitive interface with unified red theme (#FF1E00)
- **Consistent Theming**: All interactive elements (radio buttons, checkboxes, sliders) use matching red theme
- **Persistent State**: ZIP code and preferences saved in localStorage
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Graceful error states and user feedback
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🔧 Technical Features

- **Server-Side Rendering**: Next.js App Router with static generation
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable components
- **Context Management**: React Context for global state
- **Performance Optimized**: Bundle analysis and optimization

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm equivalent)

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:shastri48/flex-drive.git
   cd flex-drive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
flex-drive/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Homepage
│   │   └── vehicle/[id]/       # Dynamic vehicle detail pages
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared components (ResultsHeader)
│   │   ├── filters/            # Domain-specific filtering components
│   │   │   └── VehicleFilters.tsx # Main vehicle filtering interface
│   │   ├── layout/             # Layout components (Header)
│   │   ├── search/             # Search-related components (ZIP code)
│   │   ├── ui/                 # Generic, reusable UI components
│   │   │   ├── Accordion.tsx   # Generic accordion/collapsible component
│   │   │   ├── Button.tsx      # Reusable button component
│   │   │   ├── CheckboxFilter.tsx # Generic checkbox filter component
│   │   │   ├── Input.tsx       # Generic input component
│   │   │   ├── Modal.tsx       # Generic modal component
│   │   │   ├── RadioFilter.tsx # Generic radio filter component
│   │   │   ├── RangeSlider.tsx # Generic dual-range slider component
│   │   │   ├── Skeleton.tsx    # Generic loading skeleton component
│   │   │   └── Icons.tsx       # Icon components
│   │   └── vehicle/            # Vehicle-specific components
│   │       ├── VehicleCard.tsx # Vehicle display card
│   │       ├── VehicleGrid.tsx # Vehicle grid layout
│   │       └── EmptyState.tsx  # No results state
│   ├── contexts/               # React Context providers
│   ├── hooks/                  # Custom React hooks
│   │   ├── useVehicleFilters.ts # Vehicle filtering logic
│   │   └── useZipCodeSearch.ts  # ZIP code search logic
│   ├── data/                   # Static data and mock data
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── public/                     # Static assets
├── .next/                      # Next.js build output
└── config files               # Various configuration files
```

## 🏗️ Architecture & Design Patterns

### Component Architecture

The application follows a **modular component architecture** with clear separation of concerns:

#### **Small, Focused Components**

- **VehicleCard** (25 lines): Composition of smaller vehicle components
- **VehicleGrid** (20 lines): Simple grid layout with loading/empty states
- **VehicleFilters** (120 lines): Well-structured filter interface
- **UI Components**: Reusable, single-purpose components

#### **Component Composition Pattern**

```
VehicleCard
├── VehicleImage
├── VehicleDetails
├── VehiclePrice
└── VehicleFeatures

VehicleGrid
├── LoadingSkeleton (when loading)
├── EmptyState (when no results)
└── VehicleCard[] (when data available)
```

### Custom Hooks

#### **useVehicleFilters**

Manages all vehicle filtering logic and state:

- Filter state management (make, color, year, price, etc.)
- Vehicle filtering and sorting logic
- Active filter counting
- Filter reset functionality

#### **useZipCodeSearch**

Handles ZIP code search functionality:

- Search validation and API simulation
- Loading state management
- Error handling and user feedback
- Integration with localStorage

### Enhanced UI Component Architecture

The application features a **highly modular UI component system** with clear separation between generic and domain-specific components:

#### **Generic UI Components (`/ui` folder)**

- **Accordion**: Reusable collapsible/expandable component (formerly FilterSection)
- **Button**: Consistent button component with multiple variants
- **CheckboxFilter**: Generic checkbox group component
- **Input**: Standardized input component
- **Modal**: Reusable modal/dialog component
- **RadioFilter**: Generic radio button group component
- **RangeSlider**: Dual-range slider component (formerly PriceRangeFilter)
- **Skeleton**: Loading skeleton component (formerly LoadingSkeleton)

#### **Smart Import Aliasing**

Components use ES6 import aliasing for backward compatibility:

```typescript
// VehicleFilters.tsx - Clean import aliasing
import {
  Button,
  CheckboxFilter,
  Accordion as FilterSection,
  RangeSlider as PriceRangeFilter,
  RadioFilter,
} from '@/components/ui'

// VehicleGrid.tsx - Direct aliasing
import { Skeleton as LoadingSkeleton } from '@/components/ui'
```

#### **Backward Compatibility**

The architecture maintains full backward compatibility through smart re-exports:

```typescript
// filters/index.ts - Re-exports with aliases
export {
  CheckboxFilter,
  Accordion as FilterSection,
  RangeSlider as PriceRangeFilter,
  RadioFilter,
} from '../ui'
```

### Benefits of This Architecture

- **Maximum Reusability**: Generic UI components can be used anywhere in the application
- **Clear Separation**: Domain-specific vs. generic component distinction
- **Maintainability**: Small, focused components are easy to modify
- **Backward Compatibility**: Existing imports continue to work seamlessly
- **Testability**: Each component has a single responsibility, making testing straightforward
- **Scalability**: Easy to add new features without affecting existing code
- **Performance**: Import-level aliasing eliminates runtime overhead

## 🧪 Testing

### Test Suite Overview

- **Total Tests**: 174+ comprehensive test cases
- **Test Coverage**: Components, utilities, hooks, and integration tests
- **Testing Framework**: Jest with React Testing Library
- **Environment**: jsdom for DOM simulation

### Test Categories

#### Component Tests

- **UI Components**: Button, Input, Modal, Icons
- **Layout Components**: Header, Modal system
- **Filter Components**: RadioFilter, FilterSection, CheckboxFilter, VehicleFilters
- **Vehicle Components**: VehicleImage, VehicleGrid, VehicleCard, VehicleDetails, VehiclePrice
- **Search Components**: ZipCodeModal, CurrentZipDisplay

#### Utility Tests

- **Vehicle Utils**: Filtering, sorting, and data manipulation
- **Custom Hooks**: Vehicle filtering and ZIP code search logic
- **Type Safety**: TypeScript interface validation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Configuration

- **Jest Config**: `jest.config.js`
- **Setup File**: `jest.setup.js`
- **Environment**: `jest-environment-jsdom`

## 🏗️ Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Bundle Analysis

```bash
npm run analyze
```

This generates detailed bundle analysis reports in `.next/analyze/`:

- `client.html` - Client-side bundle analysis
- `nodejs.html` - Server-side bundle analysis
- `edge.html` - Edge runtime analysis

### Build Output

- **Homepage**: ~3.8 kB + 110 kB shared = 113.8 kB total
- **Vehicle Pages**: ~1.9 kB + 108 kB shared = 109.9 kB total
- **Optimized**: Tree-shaking, code splitting, and compression

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15.5.3**: React framework with App Router
- **React 19.1.0**: UI library with latest features
- **TypeScript 5.x**: Type-safe JavaScript

### Styling & UI

- **Tailwind CSS 4.x**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Custom Components**: Reusable UI component library

### Development Tools

- **ESLint**: Code linting with Next.js and Prettier configs
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

### Build & Analysis

- **Webpack Bundle Analyzer**: Bundle size analysis
- **Source Maps**: Debugging support
- **TypeScript Compiler**: Type checking and compilation

## 📋 Available Scripts

| Script                  | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Create production build   |
| `npm start`             | Start production server   |
| `npm test`              | Run test suite            |
| `npm run test:watch`    | Run tests in watch mode   |
| `npm run test:coverage` | Generate coverage report  |
| `npm run lint`          | Run ESLint                |
| `npm run format`        | Format code with Prettier |
| `npm run format:check`  | Check code formatting     |
| `npm run analyze`       | Analyze bundle size       |

## 🔧 Configuration Files

### Core Configuration

- **`next.config.ts`**: Next.js configuration with bundle analyzer
- **`tsconfig.json`**: TypeScript compiler configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration (if exists)
- **`postcss.config.mjs`**: PostCSS configuration

### Code Quality

- **`eslint.config.mjs`**: ESLint configuration
- **`.prettierrc`**: Prettier formatting rules
- **`jest.config.js`**: Jest testing configuration
- **`jest.setup.js`**: Jest setup and global test configuration

### Typography

- **Font Family**: System fonts with fallbacks
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Sizing**: Tailwind's responsive typography scale

### Components

- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Inputs, selects, and validation states
- **Cards**: Vehicle cards with consistent styling
- **Modals**: Overlay system with backdrop blur

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- **Touch-friendly interface**: Large tap targets and intuitive gestures
- **Optimized image loading**: Next.js Image component with lazy loading
- **Responsive grid layouts**: Adaptive layouts for all screen sizes
- **Mobile-first approach**: Progressive enhancement from mobile to desktop
- **Smart Filter UI**: Mobile filter dialog hidden on large screens (lg:hidden) for optimal tablet/desktop experience
- **Consistent Breakpoint Strategy**: Unified responsive behavior across all components

## 🔍 SEO & Performance

### SEO Features

- **Meta Tags**: Dynamic meta descriptions and titles
- **Structured Data**: Vehicle information markup
- **Sitemap**: Auto-generated sitemap
- **Open Graph**: Social media sharing optimization

### Performance Optimizations

- **Static Generation**: Pre-rendered pages
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Regular bundle size monitoring

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- **Netlify**: Static site deployment
- **AWS**: Lambda or EC2 deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions to FlexDrive! This is a public repository and we appreciate community involvement.

### Development Workflow

1. **Fork the repository**

   ```bash
   git clone git@github.com:shastri48/flex-drive.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style and patterns
   - Add tests for new functionality
   - Update documentation as needed

4. **Run tests and linting**

   ```bash
   npm test
   npm run lint
   npm run format
   ```

5. **Submit a pull request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass

### Code Standards

- **TypeScript**: All new code must be typed
- **Testing**: New features require tests
- **ESLint**: Code must pass linting
- **Prettier**: Code must be formatted
- **Component Architecture**: Follow the established patterns

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/shastri48/flex-drive/issues) with:

- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

- **Build Errors**: Check Node.js version (18+ required)
- **Test Failures**: Ensure all dependencies are installed
- **Styling Issues**: Verify Tailwind CSS configuration

### Getting Help

- Check the [Issues](https://github.com/shastri48/flex-drive/issues) page
- Review the documentation
- Run `npm run analyze` to debug bundle issues

### Repository Information

- **Repository**: [github.com/shastri48/flex-drive](https://github.com/shastri48/flex-drive)
- **Clone URL**: `git@github.com:shastri48/flex-drive.git`
- **Visibility**: Public Repository

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**

_FlexDrive - Making vehicle discovery simple and intuitive._
