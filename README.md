# Sw3t@nK Portfolio

A dynamic, interactive portfolio website for a Senior DevOps Engineer featuring a dual-mode experience: a professional corporate interface and an immersive "hackerverse" mode.

## 🚀 Features

### Dual Experience Modes
- **Corporate Mode**: Clean, professional interface showcasing DevOps expertise
- **Hackerverse Mode**: Immersive cyberpunk experience with interactive terminal and glitch effects

### Interactive Elements
- Glitch effects on profile image and name
- Interactive terminal with command-line interface
- Digital rain animations
- Sound effects and audio controls
- Responsive design across all devices

### Professional Sections
- Skills showcase with animated progress bars
- Project portfolio with detailed descriptions
- Infrastructure visualizations
- Experience timeline
- Contact form with secure protocols

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Audio**: Custom sound context with Web Audio API
- **Deployment**: Firebase Hosting ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🎮 Usage

### Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### AI Integration
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## 🎨 Customization

### Profile Image
The profile image can be updated by modifying the `src` attribute in `src/components/shared/blue-pill-page.tsx`:

```tsx
<GlitchImage
  src="your-image-url"
  alt="Profile Picture"
  width={200}
  height={200}
  data-ai-hint="professional portrait"
/>
```

### Colors and Themes
The project uses a dual color scheme:
- **Corporate**: Clean whites and blues
- **Hackerverse**: Dark backgrounds with electric lime (#BFFF00) accents

### Fonts
- **Corporate**: Inter, Space Grotesk
- **Hackerverse**: Share Tech Mono, Space Grotesk

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── layout/            # Header, footer, main layout
│   ├── sections/          # Portfolio sections
│   ├── shared/            # Reusable components
│   └── ui/               # Radix UI components
├── context/              # React contexts
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🌐 Deployment

### GitHub Pages (Recommended)

The project is configured for static export and GitHub Pages deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"
   - The site will be automatically deployed on every push to main

3. **Your site will be available at**
   ```
   https://[your-username].github.io/[repository-name]
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using gh-pages**
   ```bash
   npx gh-pages -d out
   ```

### Firebase Hosting (Alternative)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
# Add any environment variables here
```

### Next.js Configuration
The project uses custom Next.js configuration in `next.config.ts` for:
- TypeScript build optimization
- Image optimization
- Remote image domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by Sw3t@nK**
