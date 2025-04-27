# Journey Planner Application Documentation

## Project Structure

The project follows a modern React application structure built with Vite, TypeScript, and Tailwind CSS:

```
/src
  /components      - Reusable UI components
    /ui            - Basic UI elements like Button
  /contexts        - React context providers
  /pages           - Main application pages/routes
  index.css        - Global styles
  main.tsx         - Application entry point
  App.tsx          - Main routing component
```

### Key Technologies
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Vite as the build tool

## Component Hierarchy

```
App
├── JourneyPlanner (page)
│   ├── Navbar
│   ├── TravelerTypeButton (multiple)
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

### Main Components

1. **Pages:**
   - `JourneyPlanner`: Initial page for collecting trip details
   - `Dashboard`: Main application dashboard showing trip information

2. **Layout Components:**
   - `Navbar`: App header with navigation controls
   - `BottomNavigation`: Mobile-style bottom nav bar

3. **Feature Components:**
   - `TripSummary`: Overview of the planned journey
   - `FlightDetails`: Flight information display
   - `AccommodationSection`: Hotel and lodging information
   - `ActivitiesSection`: Activities and attractions
   - `ExpandedPane`: Expandable detailed view for different sections

4. **UI Components:**
   - `Button`: Reusable button component
   - `TravelerTypeButton`: Specialized button for traveler selection

5. **Context Providers:**
   - `ThemeContext`: Handles dark/light mode functionality

## User Flow

1. User enters destination, duration, and traveler type on the JourneyPlanner page
2. After clicking "Continue", user is navigated to the Dashboard
3. Dashboard displays trip details across multiple sections
4. User can interact with the BottomNavigation to expand different panes for more options

## Challenges and Solutions

### Responsive Design
- **Challenge**: Creating a UI that works well on both mobile and desktop
- **Solution**: Used Tailwind CSS's responsive utilities and a mobile-first approach

### Theme Toggling
- **Challenge**: Implementing a smooth dark/light mode transition
- **Solution**: Created a ThemeContext provider with state management for theme preference

### Component Organization
- **Challenge**: Structuring components for reusability without overengineering
- **Solution**: Created a hierarchy with specialized components for specific features while keeping common UI elements in a separate directory

### State Management
- **Challenge**: Managing user selections across the application flow
- **Solution**: Used component state for page-specific data and could expand to context or a state management library for more complex data needs

### Performance
- **Challenge**: Ensuring smooth animations and transitions
- **Solution**: Utilized Framer Motion for optimized animations and kept component re-renders minimal 