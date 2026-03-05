# Jagan Portfolio

A modern, responsive portfolio website built with Vue.js 3, showcasing skills, experience, and projects.

## Features

- **Responsive Design**: Optimized for all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: CSS transitions and Vue animations
- **Contact Form**: Functional contact form with serverless backend
- **SEO Friendly**: Optimized meta tags and structure

## Tech Stack

- **Frontend**: Vue.js 3, SCSS, TypeScript
- **Build Tool**: Vue CLI
- **Deployment**: Vercel (Serverless Functions)
- **Form Handling**: Custom API routes

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JagadeshwaranK/Jagan-Portfolio.git
cd jagan-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your project.

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

## Project Structure

```
src/
├── assets/           # Static assets (images, styles)
├── components/       # Vue components
│   ├── sections/     # Page sections
│   └── ui/          # Reusable UI components
├── utils/           # Utility functions
└── main.js          # Application entry point

public/              # Static files
vercel.json          # Vercel configuration
```

## Customization

- **Colors**: Update variables in `src/assets/styles/_variables.scss`
- **Content**: Edit component files in `src/components/sections/`
- **Images**: Replace images in `src/assets/images/` and `public/assets/`

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Jagadeshwaran K
- Email: jagadesh.k3008@gmail.com
- LinkedIn: [Jagadeshwaran K](https://www.linkedin.com/in/jagadeshwaran-k-5b504321a/)
- GitHub: [JagadeshwaranK](https://github.com/JagadeshwaranK)
