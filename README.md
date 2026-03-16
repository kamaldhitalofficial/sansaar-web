# Sansaar Web (Attendee)

This is the **Attendee** facing web application for the Sansaar Event Universe. It serves as the primary portal for users to discover events, register, buy tickets, and engage with the community.

## Scope & Features

This application covers the following core functionalities:

- **Authentication & Onboarding**
  - User Login / Registration
  - Home / Landing Page

- **Event Discovery**
  - Browse and search events
  - Detailed event pages (info, location, schedule)

- **Registration & Ticketing**
  - Event registration flow
  - Checkout and payment processing
  - "My Tickets" management

- **User Profile**
  - Manage personal information
  - View booking history

- **Community & Engagement**
  - Community forums or feeds
  - Notifications center

- **Volunteering**
  - Volunteer opportunities and application pages

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Library**: Ant Design (customized with Shadcn-like theme)
- **Routing**: React Router

## Project Structure

This project follows a feature-based architecture:

- `src/core`: Shared logic, providers, and global components.
- `src/features`: Feature-specific modules (e.g., `auth`, `events`, `tickets`).

## Getting Started

1.  **Install Dependencies**
    ```bash
    yarn install
    ```

2.  **Run Development Server**
    ```bash
    yarn dev
    ```

3.  **Build for Production**
    ```bash
    yarn build
    ```
