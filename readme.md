# Journey Planner - Travel Planning Application

A modern travel planning application built with React, TypeScript, and Tailwind CSS. This application helps users plan their trips by selecting destinations, travel duration, and travel companions.

## ✨ Features

- Interactive journey planning interface
- Dark/light mode toggle
- Destination search with autocomplete
- Trip duration selection
- Traveler type selection (solo, couple, family, friends)
- Dashboard view with trip details
- Mobile-friendly responsive design
- Multiple API integrations for travel data

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Project Structure

```
/src
  /components      - Reusable UI components
    /ui            - Basic UI elements like Button
  /contexts        - React context providers
  /pages           - Main application pages/routes
  /services        - API service integrations
  index.css        - Global styles
  main.tsx         - Application entry point
  App.tsx          - Main routing component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/journey-planner.git
   cd journey-planner
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔌 API Integrations

The application includes mock integrations with the following APIs:

### 1. Google Maps API
- Location search and autocomplete
- Geolocation features
- Distance calculation between locations
- Credit-based usage system (200 free credits)

### 2. Weather API
- Current weather conditions for destinations
- Weather forecasts for trip duration
- Weather alerts for severe conditions
- Credit-based usage system (50 free credits)

### 3. Flight Search API
- Flight availability between destinations
- Price comparison across airlines
- Booking functionality
- Credit-based usage system (100 free credits)

These integrations demonstrate how to work with external APIs while managing rate limits and usage restrictions through a credit system.

## 📱 User Flow

1. User enters destination, duration, and traveler type on the JourneyPlanner page
2. User can test API integrations to check weather and flight information
3. After clicking "Continue", user is navigated to the Dashboard
4. Dashboard displays trip details across multiple sections
5. User can interact with the BottomNavigation to expand different features

## 🏗️ Component Hierarchy

```
App
├── JourneyPlanner (page)
│   ├── Navbar
│   ├── TravelerTypeButton (multiple)
│   ├── IntegrationDemo
│   └── Button
│
└── Dashboard (page)
    ├── Navbar
    ├── TripSummary
    ├── FlightDetails
    ├── AccommodationSection
    ├── ActivitiesSection
    ├── BottomNavigation
    └── ExpandedPane (conditional)
```

## 📦 Build for Production

To build the application for production:

```
npm run build
```

This will generate optimized assets in the `dist` directory.

## 🧪 Key Technical Challenges and Solutions

### Responsive Design
- **Challenge**: Creating a UI that works well on both mobile and desktop
- **Solution**: Used Tailwind CSS's responsive utilities and a mobile-first approach

### Theme Toggling
- **Challenge**: Implementing a smooth dark/light mode transition
- **Solution**: Created a ThemeContext provider with state management for theme preference

### External API Integration
- **Challenge**: Managing multiple API dependencies with rate limits
- **Solution**: Created service abstraction layers with credit systems to simulate usage limits

### State Management
- **Challenge**: Managing user selections across the application flow
- **Solution**: Used component state for page-specific data and React Context for global state

### Performance
- **Challenge**: Ensuring smooth animations and transitions
- **Solution**: Utilized Framer Motion for optimized animations and kept component re-renders minimal 