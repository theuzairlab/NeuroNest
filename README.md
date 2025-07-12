# 🏥 NeuroNest AI - Advanced Medical Assistant

<div align="center">

![NeuroNest AI Logo](public/logo.png)

**A comprehensive AI-powered medical assistant with specialized healthcare agents, emergency services, and intelligent patient care features.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?logo=framer)](https://www.framer.com/motion/)

[🚀 Live Demo](https://your-demo-link.vercel.app) • [📚 Documentation](#documentation) • [🔧 Setup](#setup) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 Overview

NeuroNest AI is a cutting-edge medical assistant application that provides specialized healthcare support through multiple AI agents. Built with modern web technologies, it offers emergency services, medicine reminders, health consultations, and comprehensive medical guidance through an intuitive, responsive interface.

### ✨ Key Highlights

- **8 Specialized Medical Agents** for different healthcare domains
- **Emergency WhatsApp Integration** for instant alerts
- **Smart Medicine Reminder System** with scheduled notifications
- **Intelligent Agent Selection** based on user queries
- **Professional Glassmorphism UI** with smooth animations
- **Fully Responsive Design** for all devices
- **Real-time Typewriter Effects** for AI responses
- **Advanced Sidebar Navigation** with medical services
- **Keyboard Shortcuts** for enhanced productivity

---

## 🏗️ Architecture & Technology Stack

### **Frontend Technologies**
- **Framework**: Next.js 15.3.5 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom responsive design
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for medical symbols
- **Image Optimization**: Next.js Image component

### **Backend Integration**
- **API**: FastAPI backend with medical AI agents
- **Live Backend**: [MediMate Backend](https://medimate-backend-coral.vercel.app)
- **Repository**: [Backend Source](https://github.com/Ubaid2116/hackfest-3.0-backend)
- **WhatsApp Integration**: WhatsApp Web API for emergency alerts
- **Notification System**: Scheduled medicine reminders

### **Development Tools**
- **Package Manager**: npm
- **Code Quality**: ESLint + TypeScript strict mode
- **Build System**: Next.js with Webpack optimization
- **Deployment**: Vercel (recommended)

---

## 🎯 Features

### 🩺 **Medical AI Agents**
- **Welcome Agent**: General health information and service overview
- **Health Check Agent**: Symptoms analysis and health assessments
- **Mental Health Agent**: Emotional support and mental wellness
- **Emergency Agent**: Immediate emergency assistance
- **Medicine Reminder Agent**: Medication schedules and prescriptions
- **Diet Agent**: Nutrition advice and dietary guidance
- **COVID-19 Agent**: COVID-19 information and guidance
- **Registration Agent**: Patient registration and medical records

### 🚨 **Emergency Services**
- **WhatsApp Emergency Alerts**: Instant emergency notifications
- **Patient Information Collection**: Name and condition details
- **Real-time WhatsApp Integration**: Opens WhatsApp Web automatically
- **Emergency Contact Notification**: Immediate alert dispatch

### 💊 **Medicine Reminder System**
- **Phone-based Reminders**: SMS/WhatsApp medication alerts
- **Flexible Scheduling**: Custom reminder times
- **Medication Tracking**: Medicine name and dosage management
- **Daily Notifications**: Automated reminder system

### 🎨 **User Interface**
- **Glassmorphism Design**: Modern transparent design elements
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered transitions
- **Typewriter Effect**: ChatGPT-style text rendering
- **Professional Color Scheme**: Purple/pink medical gradients

### 🔧 **Advanced Features**
- **Smart Agent Selection**: Automatic agent routing based on keywords
- **Collapsible Sidebar**: Easy access to all medical services
- **Custom Dropdown**: Professional agent selection interface
- **Keyboard Shortcuts**: 'S' for sidebar, 'N' for new chat, 'Escape' to close
- **New Chat Functionality**: Reset button for fresh conversations
- **Auto-scroll Chat**: Smooth conversation flow

---

## 🚀 Setup

### **Prerequisites**
- Node.js 18+ and npm
- Modern web browser
- Internet connection for API integration

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/neuronest-ai.git
   cd neuronest-ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create environment file
   cp .env.example .env.local
   
   # Configure API URL
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" >> .env.local
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔌 API Integration

### **Backend Endpoints**

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/api/query` | Send message to AI agent | `agent_name`, `message` |
| `POST` | `/api/emergency` | Trigger emergency alert | `patient_name`, `condition` |
| `POST` | `/api/medicine-reminder` | Schedule medication reminder | `phone`, `medicine_name`, `reminder_time` |
| `POST` | `/api/register` | Register new patient | Patient details |
| `GET` | `/api/services` | Get available services | None |

### **Example API Calls**

**Chat with AI Agent:**
```typescript
const response = await mediMateAPI.sendQuery(
  "I have a headache and feel unwell",
  "Health Check Agent"
);
```

**Emergency Alert:**
```typescript
const alert = await mediMateAPI.sendEmergencyAlert(
  "John Doe",
  "Severe chest pain and difficulty breathing"
);
```

**Medicine Reminder:**
```typescript
const reminder = await mediMateAPI.setMedicineReminder({
  phone: "923059974821",
  medicine_name: "Paracetamol",
  reminder_time: "08:00"
});
```

---

## 📱 Usage Guide

### **Starting a Conversation**
1. **Select a Medical Service**: Use the sidebar (menu button) or feature cards
2. **Ask Your Question**: Type your health concern in the input field
3. **Auto-Agent Selection**: The system automatically selects the best specialist
4. **View AI Response**: Watch the typewriter effect as the AI responds

### **Emergency Features**
1. **Emergency Alert**: Click "Emergency WhatsApp Alert" → Fill patient details → Send alert
2. **Medicine Reminder**: Click "Medicine Reminder Setup" → Enter details → Schedule reminder

### **Navigation**
- **Sidebar**: Click menu button or press 'S' to access all medical services
- **Agent Selection**: Use the dropdown to manually switch between specialists
- **New Chat**: Click the '+' button or press 'N' to start fresh
- **Quick Access**: Use feature cards on the welcome screen

### **Keyboard Shortcuts**
- `S` - Toggle sidebar
- `N` - New chat (reset conversation)
- `Escape` - Close modals and dropdowns

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple (#9333EA) to Pink (#EC4899) gradients
- **Background**: Slate (#0F172A) with glassmorphism effects
- **Text**: White (#FFFFFF) primary, Gray (#94A3B8) secondary
- **Accent**: Cyan (#06B6D4) for highlights and actions
- **Success**: Green (#10B981) for positive actions
- **Warning**: Amber (#F59E0B) for alerts
- **Error**: Red (#EF4444) for errors and emergencies

### **Typography**
- **Primary Font**: Inter (system font stack)
- **Headings**: Font weights 600-700, responsive scaling
- **Body Text**: Font weight 400, 16px base size
- **Code**: JetBrains Mono for code snippets

### **Component Design**
- **Glassmorphism**: `backdrop-blur-md` with `bg-white/10`
- **Borders**: Subtle `border-white/20` for definition
- **Shadows**: Soft `shadow-lg` for depth
- **Rounded Corners**: `rounded-xl` for modern appearance
- **Hover States**: Smooth `transition-all duration-300`

### **Responsive Breakpoints**
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

---

## 📁 Project Structure

```
AI_agent/
├── app/                          # Next.js App Router
│   ├── favicon.ico              # Application favicon
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── public/                       # Static assets
│   ├── logo.png                 # NeuroNest AI logo
│   ├── file.svg                 # File icon
│   ├── globe.svg                # Globe icon
│   ├── next.svg                 # Next.js logo
│   ├── vercel.svg               # Vercel logo
│   └── window.svg               # Window icon
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration
```

---

## 🔧 Development

### **Available Scripts**
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### **Code Quality**
- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (recommended)

### **Performance Optimizations**
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: `npm run analyze` for bundle size analysis
- **Caching**: Static assets cached with Next.js optimization

---

## 🧪 Testing

### **Test Structure**
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### **Recommended Testing Tools**
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **MSW**: API mocking for tests

---

## 📦 Deployment

### **Vercel (Recommended)**
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel auto-detects Next.js configuration
3. **Set Environment Variables**: Add production API URLs
4. **Deploy**: Automatic deployment on every push

### **Other Platforms**
- **Netlify**: Static site hosting with serverless functions
- **AWS Amplify**: Full-stack deployment with backend integration
- **Docker**: Containerized deployment for any platform

### **Environment Variables**
```bash
# Production API URL
NEXT_PUBLIC_API_URL=https://medimate-backend-coral.vercel.app

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=923059974821

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 🤝 Contributing

### **How to Contribute**
1. **Fork the Repository**: Click the fork button on GitHub
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**: Submit your changes for review

### **Development Guidelines**
- Follow the existing code style and conventions
- Add tests for new features and bug fixes
- Update documentation for API changes
- Ensure all tests pass before submitting
- Use descriptive commit messages

### **Code Standards**
- **TypeScript**: Use strict typing, avoid `any` types
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes
- **Performance**: Optimize for Core Web Vitals

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Backend Team**: [Ubaid2116](https://github.com/Ubaid2116) for the comprehensive medical AI API
- **Design Inspiration**: Modern medical interfaces and glassmorphism design trends
- **Open Source**: Built with love using open-source technologies
- **Community**: Thanks to all contributors and users

---

## 📞 Support

### **Getting Help**
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs on [GitHub Issues](https://github.com/your-username/neuronest-ai/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/your-username/neuronest-ai/discussions)
- **Email**: Contact us at support@neuronest.ai

### **Common Issues**
- **API Connection**: Ensure backend is running and accessible
- **Build Errors**: Check Node.js version and dependencies
- **Responsive Issues**: Test on different screen sizes
- **Performance**: Monitor Core Web Vitals and optimize accordingly

---

## 🚧 Roadmap

### **Upcoming Features**
- [ ] **Voice Commands**: Speech-to-text integration
- [ ] **Video Consultations**: Real-time video calling
- [ ] **Health Records**: Patient history management
- [ ] **Prescription System**: Digital prescription generation
- [ ] **Appointment Booking**: Schedule medical appointments
- [ ] **Multi-language Support**: Internationalization
- [ ] **Offline Mode**: PWA with offline capabilities
- [ ] **Advanced Analytics**: Health trend analysis

### **Technical Improvements**
- [ ] **Testing**: Comprehensive test coverage
- [ ] **Performance**: Further optimization
- [ ] **Security**: Enhanced data protection
- [ ] **Accessibility**: WCAG compliance
- [ ] **Mobile App**: React Native version

---

<div align="center">

**Made with ❤️ by the NeuroNest AI Team**

*Advancing healthcare through intelligent technology*

</div>
