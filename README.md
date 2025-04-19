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
   git clone https://github.com/your-username/Dream-Journal.git
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
│   ├── App.tsx            # Main App component
│   ├── index.tsx          # Entry point for React app
│   └── ...                # Other project files
├── .github/               # GitHub Actions workflow
│   └── workflows/         # CI/CD pipeline configuration
├── .gitignore             # Files to ignore in GitHub
├── firebase.json          # Firebase Hosting configuration
├── package.json           # npm dependencies and scripts
├── package-lock.json      # Locked versions of npm packages
└── README.md              # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify the `README.md` to better fit the exact details of your project if needed.

### Key Sections Explained:

- **Project Overview**: Describes what the app does.




### **Project Description: Dream Journal**

**Dream Journal** is a web-based application that allows users to record and reflect on their dreams. The app aims to provide a personal space where users can capture their nightly experiences, analyze their emotions through sentiment analysis, and visualize their mental and emotional states through an interactive calendar. The project uses modern web technologies like **React**, **TypeScript**, and **Firebase**, and integrates with the **Sentiment.js** library to analyze the emotional tone of journal entries.

The key features include:

1. **Add & Edit Journal Entries**:
   - Users can add new journal entries with a title and body text.
   - Entries can be edited after creation.
   - The application automatically analyzes the sentiment of the text to categorize each entry as **Positive**, **Neutral**, or **Negative**.

2. **Sentiment Analysis**:
   - The app uses **Sentiment.js**, a sentiment analysis library, to analyze the tone of each journal entry.
   - Based on the sentiment score, each entry is classified as **Positive**, **Neutral**, or **Negative**.
   - These sentiments are color-coded and used to provide visual feedback to the user.

3. **Visual Sentiment Calendar**:
   - Each entry is associated with a specific date, and the sentiment of each entry is displayed as a **colored dot** on a **monthly calendar**.
   - The colors represent the sentiment of the entry: 
     - **Green** for Positive
     - **Gray** for Neutral
     - **Red** for Negative
   - The calendar provides a quick visual overview of the user’s emotional state over time.

4. **Firebase Integration**:
   - **Firebase Firestore** is used to store journal entries, which are retrieved and displayed in the app.
   - Users' entries are stored in the cloud, allowing them to be accessed and edited at any time from any device.

5. **Real-time Updates**:
   - The app automatically fetches the latest journal entries and updates the user interface in real-time.
   - This ensures that users see their changes immediately after submitting or updating an entry.

### **Key Features Summary**:

- **Create and Edit Entries**: Add new journal entries with sentiment analysis, or edit existing entries.
- **Sentiment Analysis**: The app categorizes entries as Positive, Neutral, or Negative based on text analysis.
- **Interactive Calendar**: View your emotional journey over time with color-coded calendar dots.
- **Firebase Cloud Storage**: Data is securely stored and accessible across devices.
- **Modern Web Technologies**: Built with **React**, **TypeScript**, **TailwindCSS**, **Firebase**, and **Sentiment.js**.

### **Technologies Used**:

- **React**: A JavaScript library for building user interfaces, specifically used here to build the frontend of the app.
- **TypeScript**: A superset of JavaScript that adds type safety to the project, making the code easier to maintain.
- **Firebase Firestore**: A NoSQL database provided by Google’s Firebase platform, used to store journal entries.
- **Sentiment.js**: A library used for performing sentiment analysis on the text of journal entries.
- **TailwindCSS**: A utility-first CSS framework used to style the app quickly and responsively.
- **Vite**: A build tool that serves the app during development and bundles it for production.

### **User Experience**:

1. **Simple Interface**: Users can easily navigate the app to add and edit journal entries.
2. **Real-time Feedback**: As soon as a journal entry is submitted, its sentiment is analyzed and displayed in the form of colored dots on a calendar.
3. **Reflective**: The interactive calendar allows users to look back on their emotional state over time, helping them reflect on patterns in their mood and thoughts.

### **Future Improvements**:

- **Search and Filter**: Allow users to search for specific entries or filter by sentiment.
- **User Authentication**: Enable users to log in and have personalized journal entries.
- **Advanced Sentiment Analysis**: Incorporate more advanced AI tools for more nuanced sentiment analysis (e.g., extracting specific emotions like sadness or happiness).
- **Mood Tracking**: Track user’s mood trends over time and provide insights or advice based on their journal data.
