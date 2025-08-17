# EXAMFUSION Frontend

A modern React-based frontend for EXAMFUSION, a premium study materials platform for competitive exam preparation.

## Features

- **Modern UI/UX**: Clean, professional design optimized for study platforms
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Toggle between dark and light modes
- **Book Management**: Browse and purchase study materials
- **Authentication**: User registration and login system
- **Performance**: Optimized with Vite and React 19

## Tech Stack

- **React 18**: Stable React with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ (18+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd examfusion/frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── MyBooks.jsx     # User's purchased books
├── context/            # React context providers
│   └── ThemeContext.jsx # Theme management
├── utils/              # Utility functions
├── assets/             # Static assets
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Key Components

### Home Page
- Hero section with call-to-action
- Featured books showcase
- Statistics and features
- Tabbed navigation for different exam types (NEET, JEE)

### Book Cards
- Display book information (title, author, price, format)
- Purchase/Read buttons
- Responsive grid layout
- Hover animations

### Navigation
- Responsive navbar with mobile menu
- Theme toggle functionality
- Active route highlighting

## Styling

The project uses Tailwind CSS with custom utilities:

- **Primary Colors**: Blue gradient theme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing system
- **Animations**: Smooth transitions and hover effects

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@examfusion.com or create an issue in the repository.
