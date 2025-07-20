# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scout Group Management Application

This is a React-based web application for managing UK Scout groups, including member tracking, badge progression, and session planning.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Run a single test file
npm test -- App.test.js

# Build for production
npm run build
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 19.1.0 (JavaScript, no TypeScript)
- **UI Framework**: Chakra UI v3.16.0 with Framer Motion for animations
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Routing**: React Router v7.5.0
- **State Management**: React Firebase Hooks v5.1.1
- **Build Tool**: Create React App 5.0.1 (not ejected)

### Project Structure
```
src/
├── components/       # React components organized by feature
│   ├── auth/        # Authentication components (login, ProtectedRoute)
│   ├── badges/      # Badge tracking components for different sections
│   ├── common/      # Reusable components (ErrorBoundary, LoadingSpinner)
│   ├── dashboard/   # Modular dashboard components
│   └── [feature].js # Feature-specific components
├── hooks/           # Custom React hooks (useDashboard)
├── pages/           # Page-level components (AdminPage)
├── services/        # Business logic and service layers
├── data/            # Static data files for activities and badges
└── utils/           # Firebase configuration and export functions
```

### Key Features
1. **Authentication**: Firebase Auth with role-based access (GSL, Leader, Group Leader)
2. **Member Management**: Track Scout members across different sections
3. **Badge System**: Progress tracking for badges in Beavers, Cubs, and Scouts sections
4. **Session Planning**: Create and manage Scout meeting sessions
5. **Activity Database**: Activities linked to badge requirements
6. **Export Functionality**: Generate Word/Excel reports using docx and xlsx libraries

### Firebase Integration
The application uses Firebase services configured through environment variables:
- Authentication for user management
- Firestore for data persistence (collections: leaders, sessions, meetings, badges, memberBadges, roles)
- Firebase Storage for file uploads

Required environment variables in `.env`:
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Testing
- Uses Jest with React Testing Library
- Run tests with `npm test`
- Test files should follow `*.test.js` naming convention
- Current test coverage is minimal (only App.test.js exists)

### Code Style
- ESLint configuration extends `react-app` and `react-app/jest`
- CSS modules with `.css` files per component
- Service pattern for data operations in `src/services/`

### Recent Improvements (Phase 1 - Critical Fixes)

#### Refactored Architecture
- **Dashboard Component**: Refactored from 1340-line monolithic component into smaller, focused components:
  - `NavigationHeader` - Header with logo, user info, and navigation
  - `UserDetailsModal` - User profile management modal
  - `CalendarView` - Interactive calendar with event display
  - `QuickActions` - Action cards for common tasks
  - `SessionManager` - Session CRUD operations
  - `MeetingManager` - Meeting CRUD operations
- **Custom Hook**: `useDashboard` hook for centralized state management and data fetching

#### Enhanced Security & Error Handling
- **ProtectedRoute Component**: Centralized authentication protection for all routes
- **ErrorBoundary Component**: Prevents app crashes with graceful error handling
- **Loading States**: Proper loading indicators and skeleton screens
- **Role-based Access**: GSL role restricted to specific email (drsmeade@gmail.com)

#### Improved User Experience
- **Loading Skeleton**: Full dashboard skeleton while data loads
- **Responsive Design**: Better mobile and tablet support with Chakra UI breakpoints
- **Performance**: Reduced re-renders with proper component separation

### Important Implementation Notes
- This is a Create React App project without ejection - no custom webpack configuration
- No TypeScript configuration - use plain JavaScript only
- Badge name matching in data files is case-sensitive (see comments in badge data files)
- The application is specifically designed for UK Scouting sections
- **Dashboard**: Use `DashboardNew.js` for the refactored version (currently in use)
- Date handling uses `date-fns` library for formatting and manipulation
- Export functionality generates client-side files using `file-saver`

### Data Flow Pattern
1. Components fetch data via services or custom hooks
2. Real-time updates through Firestore listeners (react-firebase-hooks)
3. Form state managed locally with React hooks
4. No global state management (Redux/Context) - Firebase is the source of truth