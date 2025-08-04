# 14th Willesden Scouts Management Application

A comprehensive web application for managing UK Scout groups, including member tracking, badge progression, and session planning.

## Features

- **Authentication & Authorization**: Secure login with role-based access control
- **Member Management**: Track Scout members across different sections (Beavers, Cubs, Scouts, Explorers)
- **Badge Progress Tracking**: Monitor badge completion for all sections
- **Session Planning**: Create and manage Scout meeting sessions
- **Activity Database**: Activities linked to badge requirements
- **Export Functionality**: Generate Word/Excel reports for members and sessions
- **Dashboard**: Overview of upcoming sessions, meetings, and quick actions

## Technology Stack

- **Frontend**: React 19.1.0
- **UI Framework**: Chakra UI v3.16.0 with Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Routing**: React Router v7.5.0
- **State Management**: React Firebase Hooks v5.1.1
- **Build Tool**: Create React App 5.0.1

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account with a configured project

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scouts-app.git
cd scouts-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - **Note: this is a one-way operation. Once you eject, you can't go back!**

## Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── auth/           # Authentication components
│   ├── badges/         # Badge tracking components
│   ├── common/         # Reusable components
│   ├── dashboard/      # Modular dashboard components
│   └── [feature].js    # Feature-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page-level components
├── services/           # Business logic and service layers
├── data/               # Static data files for activities and badges
├── utils/              # Firebase configuration and utilities
└── assets/             # Images and static assets
```

## User Roles

- **GSL (Group Scout Leader)**: Full admin access, can manage all leaders and sections
- **Group Leader**: Can manage sessions and meetings for their section
- **Section Leader**: Can manage members and badge progress for their section
- **Assistant Leader**: View-only access with limited management capabilities

## Firebase Collections

- `leaders` - Store leader information and profiles
- `sessions` - Scout meeting sessions
- `meetings` - Regular meeting schedules
- `badges` - Badge definitions and requirements
- `memberBadges` - Track member badge progress
- `roles` - User role assignments

## Security Considerations

- All routes are protected with authentication
- Role-based access control for sensitive operations
- Firebase API keys are stored as environment variables
- GSL access is restricted to authorized email addresses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software for the 14th Willesden Scout Group.

## Support

For support or questions, please contact your Group Scout Leader.

## Acknowledgments

- Built for the 14th Willesden Scout Group
- Follows UK Scouting badge and section structure
- Icons and branding property of The Scout Association
