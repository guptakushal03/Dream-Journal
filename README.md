# Dream Journal

Dream Journal is a web application where users can record and manage their dreams in a digital journal. The application includes sentiment analysis to gauge the emotional tone of the entries, and visualizes the entries on a calendar with different color-coded dots for positive, negative, or neutral sentiments.

## Features

- **Create and Edit Entries**: Add new journal entries and update existing ones.
- **Sentiment Analysis**: Analyze the sentiment (positive, neutral, negative) of your journal entries.
- **Calendar View**: A visual representation of your journal entries with color-coded dots based on sentiment for each day of the month.
- **Firebase Integration**: Store and retrieve journal entries from Firebase Firestore.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Firebase Firestore
- **Sentiment Analysis**: Sentiment.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting with GitHub Actions

## Setup Instructions

### Prerequisites

Before setting up the project, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/guptakushal03/Dream-Journal.git
   cd Dream-Journal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Install Firebase CLI:

     ```bash
     npm install -g firebase-tools
     ```

   - Initialize Firebase in your project:

     ```bash
     firebase init
     ```

   - Choose **Firestore** and **Hosting** options, and set up your Firebase project by following the prompts.

4. Configure Firebase:

   - In the `src/firebase/firebase.ts` file, set up your Firebase credentials and configuration by following the [Firebase docs](https://firebase.google.com/docs/web/setup).

5. Run the application locally:

   ```bash
   npm run dev
   ```

   This will start the development server and you can access the app at `http://localhost:3000`.

### Deployment

1. Build the project for production:

   ```bash
   npm run build
   ```

2. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

   This will deploy your app to Firebase Hosting. After deployment, your app will be live on your Firebase Hosting URL.

## GitHub Actions CI/CD Setup

This project uses GitHub Actions to automate the deployment process. When you push code to the main branch, the following steps occur:

1. The `firebase deploy` command is triggered, deploying the app to Firebase Hosting.
2. Before deployment, the app is built using the `npm run build` command.

### Setting up GitHub Actions

1. Follow the steps in the Firebase documentation to set up Firebase Hosting with GitHub Actions.
2. Add your `FIREBASE_AUTH_TOKEN` secret to your GitHub repository for authentication during deployment.

## File Structure

```
.
├── dist/                  # Production build folder (auto-generated)
├── public/                # Public assets (index.html, etc.)
├── src/
│   ├── components/        # React components
│   ├── firebase/          # Firebase config and utilities
│   ├── utils/             # Utils    
│   └── App.tsx            # Main App component
├── .github/               # GitHub Actions workflow
│   └── workflows/         # CI/CD pipeline configuration
├── .gitignore             # Files to ignore in GitHub
├── firebase.json          # Firebase Hosting configuration
├── package.json           # npm dependencies and scripts
├── package-lock.json      # Locked versions of npm packages
└── README.md              # Project documentation
```
