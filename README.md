# EXAMFUSION

A comprehensive study materials platform for competitive exam preparation, featuring a modern React frontend and Node.js backend.

## 🚀 Features

- **Premium Study Materials**: Handwritten notes, question banks, and digital resources
- **Exam Categories**: NEET, JEE, and other competitive exams
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Book Management**: Browse, purchase, and access study materials

## 🛠️ Tech Stack

### Frontend
- **React 18**: Stable React with modern patterns
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication and authorization
- **Multer**: File upload handling

## 📁 Project Structure

```
examfusion/
├── public/
│   ├── backend/           # Node.js backend
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── frontend/          # React frontend
│       ├── src/
│       │   ├── components/ # Reusable components
│       │   ├── pages/      # Page components
│       │   ├── context/    # React context
│       │   └── utils/      # Utility functions
│       ├── public/         # Static assets
│       └── dist/           # Build output
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (18+ recommended)
- npm or yarn
- MongoDB (for backend)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd public/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd public/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env` file):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## 📱 Pages & Features

### Home Page
- Hero section with call-to-action
- Featured books showcase
- Statistics and features
- Tabbed navigation for different exam types

### Authentication
- User registration with email/password
- Google OAuth integration
- Secure login system
- Password recovery

### Book Management
- Browse books by category (NEET, JEE)
- Book details with pricing
- Purchase functionality
- My Books section for purchased materials

### User Dashboard
- View purchased books
- Access study materials
- Reading progress tracking

## 🎨 Design System

### Colors
- **Primary**: Blue gradient theme
- **Secondary**: Yellow/Orange accents
- **Neutral**: Gray scale for text and backgrounds

### Typography
- Clean, readable fonts
- Consistent heading hierarchy
- Responsive text sizing

### Components
- Reusable UI components
- Consistent spacing and layout
- Smooth animations and transitions

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run test` - Run tests

## 🌐 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Configure environment variables

### Backend (Vercel/Railway)
1. Set up environment variables
2. Deploy to your preferred platform
3. Configure CORS for frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@examfusion.com
- **Website**: https://examfusion.com
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first approach
- All contributors and supporters

---

Made with ❤️ by the ogsuryansh team
