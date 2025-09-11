# Sw3t@nK - DevOps Engineer Portfolio

This repository contains the source code for a unique, dual-theme portfolio website for a DevOps engineer. The site features a clean, professional "corporate" view that can transform into a hidden, immersive "hackerverse" experience, complete with an interactive terminal and AI-generated content.

This project was built within Firebase Studio.

## Features

- **Dual-Theme Interface**: Seamlessly switch between a polished, professional corporate portfolio and a sci-fi, hacker-themed interface.
- **Interactive Terminal**: The "hackerverse" features a fully interactive terminal where visitors can run commands to learn about skills, projects, and experience.
- **AI-Generated Content**: Utilizes Firebase Genkit to dynamically generate creative "mission logs" for projects.
- **Responsive Design**: Fully responsive layout that works on all devices, from desktops to mobile phones.
- **Themed Sound Design**: Includes interactive sound effects for a more immersive user experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

To run this project locally, you'll need Node.js and npm installed.

### 1. Install Dependencies

First, clone the repository and install the necessary dependencies:

```bash
git clone <repository_url>
cd <repository_directory>
npm install
```

### 2. Set Up Environment Variables

This project uses Firebase Genkit, which requires a Google AI (Gemini) API key.

1.  Create a `.env` file in the root of the project.
2.  Add your API key to the `.env` file:

```env
GEMINI_API_KEY=your_google_ai_api_key_here
```

### 3. Run the Development Servers

This project requires two development servers to be running simultaneously: one for the Next.js frontend and another for the Genkit AI flows.

- **Terminal 1: Run the Next.js App**

  This command starts the main web application.

  ```bash
  npm run dev
  ```

  The application will be available at [http://localhost:9002](http://localhost:9002).

- **Terminal 2: Run the Genkit Flows**

  This command starts the Genkit development server, which makes the AI flows available to the frontend.

  ```bash
  npm run genkit:dev
  ```

Once both servers are running, you can open your browser to experience the full application.
