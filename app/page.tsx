'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Stethoscope, 
  Brain, 
  Pill,  
  Send,
  Loader2,
  AlertTriangle,
  Clock,
  Menu,
  X,
  User,
  Shield,
  Apple,
  UserPlus,
  ChevronRight,
  ChevronDown,
  Check,
  Plus
} from 'lucide-react';
import {  ChatMessage, mediMateAPI, AVAILABLE_AGENTS } from './utils/api';
import './utils/test-api'; // Auto-run API tests in development

// TypewriterText Component for AI responses
interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 30, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Variable speed for more natural typing
      const char = text[currentIndex];
      let currentSpeed = speed;
      
      // Slower typing for punctuation and line breaks
      if (char === '.' || char === ',' || char === '!' || char === '?') {
        currentSpeed = speed * 3;
      } else if (char === '\n') {
        currentSpeed = speed * 2;
      } else if (char === ' ') {
        currentSpeed = speed * 0.5;
      }

      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  // Function to render text with basic markdown formatting
  const renderFormattedText = (text: string) => {
    // Split text by ** for bold formatting
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-purple-700">
            {content}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={className}>
      <span className="whitespace-pre-wrap">
        {renderFormattedText(displayedText)}
      </span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-0.5 h-5 bg-purple-600 ml-1 rounded-full"
        />
      )}
    </div>
  );
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('Welcome Agent');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [emergencyData, setEmergencyData] = useState({
    patient_name: '',
    condition: ''
  });
  const [medicineData, setMedicineData] = useState({
    phone: '',
    medicine_name: '',
    reminder_time: ''
  });

  const categories = ['General', 'Diagnosis', 'Treatment', 'Emergency', 'Records', 'Analysis'];

  // Medical services for the sidebar
  const medicalServices = [
    {
      name: 'Welcome Agent',
      description: 'General health information and service overview',
      icon: <User className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      sampleQuery: 'Hello, can you help me with my health?'
    },
    {
      name: 'Health Check Agent',
      description: 'Symptoms analysis and health assessments',
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      sampleQuery: 'I have a headache and feeling unwell'
    },
    {
      name: 'Mental Health Agent',
      description: 'Emotional support and mental wellness',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      sampleQuery: 'I feel anxious and need emotional support'
    },
    {
      name: 'Emergency Agent',
      description: 'Immediate emergency assistance',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      sampleQuery: 'This is an emergency medical situation'
    },
    {
      name: 'Medicine Reminder Agent',
      description: 'Medication schedules and prescriptions',
      icon: <Pill className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      sampleQuery: 'Help me with my medication schedule'
    },
    {
      name: 'Diet Agent',
      description: 'Nutrition advice and dietary guidance',
      icon: <Apple className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      sampleQuery: 'What should I eat for better health?'
    },
    {
      name: 'COVID-19 Agent',
      description: 'COVID-19 information and guidance',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      sampleQuery: 'I have COVID-19 symptoms, what should I do?'
    },
    {
      name: 'Registration Agent',
      description: 'Patient registration and medical records',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      sampleQuery: 'Help me register as a new patient'
    },
    {
      name: 'Emergency WhatsApp Alert',
      description: 'Send emergency alerts via WhatsApp instantly',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      sampleQuery: 'emergency-alert'
    },
    {
      name: 'Medicine Reminder Setup',
      description: 'Schedule daily medicine reminders',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      sampleQuery: 'medicine-reminder'
    }
  ];

  // Smart agent selection based on message content
  const selectBestAgent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Emergency keywords
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help immediately')) {
      return 'Emergency Agent';
    }
    
    // Mental health keywords
    if (lowerMessage.includes('emotional') || lowerMessage.includes('depression') || lowerMessage.includes('anxiety') || 
        lowerMessage.includes('stress') || lowerMessage.includes('mental') || lowerMessage.includes('mood') ||
        lowerMessage.includes('mind') || lowerMessage.includes('feeling') || lowerMessage.includes('sad')) {
      return 'Mental Health Agent';
    }
    
    // COVID-19 keywords
    if (lowerMessage.includes('covid') || lowerMessage.includes('coronavirus') || lowerMessage.includes('pandemic')) {
      return 'COVID-19 Agent';
    }
    
    // Medicine/medication keywords
    if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('pill') || 
        lowerMessage.includes('drug') || lowerMessage.includes('prescription') || lowerMessage.includes('dose')) {
      return 'Medicine Reminder Agent';
    }
    
    // Diet/nutrition keywords
    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') || 
        lowerMessage.includes('eating') || lowerMessage.includes('weight') || lowerMessage.includes('meal')) {
      return 'Diet Agent';
    }
    
    // Health symptoms keywords
    if (lowerMessage.includes('headache') || lowerMessage.includes('pain') || lowerMessage.includes('symptom') || 
        lowerMessage.includes('fever') || lowerMessage.includes('cough') || lowerMessage.includes('sick') ||
        lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
      return 'Health Check Agent';
    }
    
    // Default to currently selected agent or Welcome Agent
    return selectedAgent || 'Welcome Agent';
  };

  const features = [
    {
      title: 'Medical Health Check',
      description: 'Symptom analysis and health assessments',
      icon: <Stethoscope className="w-8 h-8" />,
      gradient: 'from-blue-500 to-purple-600',
      onClick: () => {
        setSelectedAgent('Health Check Agent');
        setInputValue('I have symptoms that I need help diagnosing...');
      }
    },
    // {
    //   title: 'Mental Health Support',
    //   description: 'Emotional support and mental wellness guidance',
    //   icon: <Heart className="w-8 h-8" />,
    //   gradient: 'from-pink-500 to-purple-600',
    //   onClick: () => {
    //     setSelectedAgent('Mental Health Agent');
    //     setInputValue('I need help with my mental health and emotional wellbeing...');
    //   }
    // },
    // {
    //   title: 'Medicine Reminders',
    //   description: 'Medication schedules and prescription guidance',
    //   icon: <Pill className="w-8 h-8" />,
    //   gradient: 'from-green-500 to-blue-600',
    //   onClick: () => {
    //     setSelectedAgent('Medicine Reminder Agent');
    //     setInputValue('I need help with my medication schedule...');
    //   }
    // },
    // {
    //   title: 'Emergency Medical Help',
    //   description: 'Immediate emergency assistance and critical care',
    //   icon: <AlertTriangle className="w-8 h-8" />,
    //   gradient: 'from-red-500 to-orange-600',
    //   onClick: () => {
    //     setSelectedAgent('Emergency Agent');
    //     setInputValue('This is an emergency medical situation...');
    //   }
    // },
    {
      title: 'Emergency WhatsApp Alert',
      description: 'Send emergency alerts via WhatsApp instantly',
      icon: <AlertTriangle className="w-8 h-8" />,
      gradient: 'from-red-600 to-pink-600',
      onClick: () => {
        setShowEmergencyModal(true);
      }
    },
    {
      title: 'Medicine Reminder Setup',
      description: 'Schedule daily medicine reminders',
      icon: <Clock className="w-8 h-8" />,
      gradient: 'from-blue-500 to-indigo-600',
      onClick: () => {
        setShowMedicineModal(true);
      }
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowChat(true);
    
    const currentInput = inputValue;
    setInputValue('');

    try {
      // Use selected agent or auto-select if needed
      const bestAgent = selectBestAgent(currentInput);
      const agentToUse = selectedAgent || bestAgent;
      
      // Update selected agent if auto-selected
      if (agentToUse !== selectedAgent) {
        setSelectedAgent(agentToUse);
      }
      
      const response = await mediMateAPI.sendQuery(currentInput, agentToUse);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: `👨‍⚕️ **${agentToUse}**\n\n${response.response}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to the medical AI service. Please check your connection and try again. If the issue persists, please contact support.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureClick = (feature: { onClick: () => void }) => {
    feature.onClick();
  };

  const handleEmergencyModalSubmit = async () => {
    if (!emergencyData.patient_name.trim() || !emergencyData.condition.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await mediMateAPI.sendEmergencyAlert(emergencyData.patient_name, emergencyData.condition);
      console.log('Emergency alert sent:', response);
      
      // Show success message
      const successMessage: ChatMessage = {
        role: 'assistant',
        content: '🚨 Emergency alert sent successfully via WhatsApp! Help is on the way. Please stay calm and follow any instructions given by emergency services.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage]);
      setShowChat(true);
      setShowEmergencyModal(false);
      setEmergencyData({
        patient_name: '',
        condition: ''
      });
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ Failed to send emergency alert. Please try calling emergency services directly at 911 or your local emergency number.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMedicineReminderSubmit = async () => {
    if (!medicineData.medicine_name.trim() || !medicineData.phone.trim() || !medicineData.reminder_time.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await mediMateAPI.setMedicineReminder(medicineData);
      console.log('Medicine reminder set:', response);
      
      // Show success message
      const successMessage: ChatMessage = {
        role: 'assistant',
        content: `💊 Medicine reminder set successfully!\n\nMedicine: ${medicineData.medicine_name}\nPhone: ${medicineData.phone}\nTime: ${medicineData.reminder_time}\n\nYou will receive daily reminders for your medication.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage]);
      setShowChat(true);
      setShowMedicineModal(false);
      setMedicineData({
        phone: '',
        medicine_name: '',
        reminder_time: ''
      });
    } catch (error) {
      console.error('Error setting medicine reminder:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ Failed to set medicine reminder. Please try again later or contact support.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelect = (service: { name: string; sampleQuery: string }) => {
    setSidebarOpen(false);
    
    // Handle special services
    if (service.sampleQuery === 'emergency-alert') {
      setShowEmergencyModal(true);
      return;
    }
    
    if (service.sampleQuery === 'medicine-reminder') {
      setShowMedicineModal(true);
      return;
    }
    
    // Handle regular agent services
    setSelectedAgent(service.name);
    setInputValue(service.sampleQuery);
    if (!showChat) {
      setShowChat(true);
    }
  };

  const handleResetToWelcome = () => {
    // Reset all state to initial values
    setMessages([]);
    setShowChat(false);
    setInputValue('');
    setSelectedAgent('Welcome Agent');
    setIsLoading(false);
    setSidebarOpen(false);
    setDropdownOpen(false);
    setShowEmergencyModal(false);
    setShowMedicineModal(false);
    setEmergencyData({
      patient_name: '',
      condition: ''
    });
    setMedicineData({
      phone: '',
      medicine_name: '',
      reminder_time: ''
    });
  };

  // Keyboard shortcuts and click outside handling
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is typing in an input field, textarea, or other form element
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable ||
                      target.closest('input') ||
                      target.closest('textarea');
      
      // Don't trigger shortcuts when user is typing
      if (isTyping) {
        return;
      }

      // Toggle sidebar with 'S' key or Escape key
      if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        setSidebarOpen(prev => !prev);
      } else if (event.key === 'Escape') {
        setSidebarOpen(false);
        setDropdownOpen(false);
        setShowEmergencyModal(false);
        setShowMedicineModal(false);
      } else if ((event.key === 'n' || event.key === 'N') && showChat) {
        // Reset to welcome screen with 'N' key (New Chat)
        event.preventDefault();
        handleResetToWelcome();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown when clicking outside
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex flex-col relative">
      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-3 sm:top-4 left-3 sm:left-4 z-50 bg-white/70 backdrop-blur-sm border cursor-pointer border-white/20 rounded-xl p-2 sm:p-3 shadow-lg hover:bg-white/80 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        )}
      </motion.button>

      {/* New Chat Button (Plus Icon) - Only show when chat is active */}
      {showChat && (
        <motion.button
          onClick={handleResetToWelcome}
          className="fixed top-16 sm:top-20 left-3 sm:left-4 z-50 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-2 sm:p-3 shadow-lg hover:bg-white/80 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="New Chat"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </motion.button>
      )}

            {/* Collapsible Sidebar */}
      <motion.div
        initial={{ x: -412 }}
        animate={{ x: sidebarOpen ? 0 : -412 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full w-full sm:w-80 md:w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 z-40 shadow-2xl"
      >
        <div className="p-4 sm:p-6">
          {/* Sidebar Header */}
          <div className="mb-4 sm:mb-6 ml-10 sm:ml-14">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 flex items-center justify-start">
              <span>
                <Image 
                  src="/logo.png" 
                  alt="NeuroNest AI Logo" 
                  width={40} 
                  height={40} 
                  className="w-8 h-8 sm:w-10 sm:h-10 mr-2" 
                />
              </span>
              Neuro Nest
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">Select a specialist for your needs</p>
          </div>

          {/* Services List */}
          <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            {medicalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleServiceSelect(service)}
                className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border border-white/20 ${
                  selectedAgent === service.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/70 text-gray-700'
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${
                    selectedAgent === service.name ? 'bg-white/20' : service.bgColor
                  }`}>
                    <div className={selectedAgent === service.name ? 'text-white' : service.color}>
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm mb-1">{service.name.replace(' Agent', '')}</h3>
                    <p className={`text-xs mb-1 sm:mb-2 ${
                      selectedAgent === service.name ? 'text-white/80' : 'text-gray-600'
                    } w-full`}>
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs ${
                        selectedAgent === service.name ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        Quick start
                      </span>
                      <ChevronRight className={`w-3 h-3 ${
                        selectedAgent === service.name ? 'text-white/70' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                NeuroNest AI - Medical Assistant
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {medicalServices.length} Specialists Available
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}

      {/* Chat Messages */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 max-w-4xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 overflow-y-auto"
        >
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : ' backdrop-blur-sm text-gray-800 border border-white/20'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                  ) : (
                    <TypewriterText 
                      text={message.content}
                      speed={20}
                      className="min-h-[1.2em] text-sm sm:text-base"
                    />
                  )}
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span className="text-gray-600 text-sm sm:text-base">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 ${showChat ? 'hidden' : ''}`}>
        {/* Current Agent Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-2 sm:right-4 bg-white/70 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-lg"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {selectedAgent.replace(' Agent', '')}
            </span>
          </div>
        </motion.div>
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6 sm:mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="NeuroNest AI Logo"
              width={128}
              height={128}
              className="w-20 h-20 sm:w-32 sm:h-32 object-contain drop-shadow-2xl transition-all duration-300"
              priority
            />
          </motion.div>
          
          {/* Subtle glow effect */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-purple-600/20 blur-xl -z-10"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
            Hi there, <span className="text-purple-600">Doctor</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            How can I <span className="text-purple-600">help you today?</span>
          </p>
          <p className="text-sm text-gray-500 mt-2 px-4">
            Our AI will automatically select the best medical specialist for your needs
          </p>
          <p className="text-xs text-gray-400 mt-1 px-4">
            💡 Use the menu button (top-left) to browse all available medical services
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFeatureClick(feature)}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-3 sm:mb-4`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Input Field */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-2xl px-2 sm:px-0"
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about medical conditions, treatments, or health..."
              className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-14 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-500 text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-1.5 sm:p-2 rounded-xl hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Fixed Input (when chat is shown) */}
      {showChat && (
        <div className="backdrop-blur-sm p-2 sm:p-4">
          <div className="max-w-4xl mx-auto">
            {/* Agent Selector */}
            <div className="mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Current Agent:</span>
                
                {/* Custom Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-200 text-xs sm:text-sm min-w-[180px] sm:min-w-[200px] ${
                      dropdownOpen 
                        ? 'bg-white/90 border-purple-300 ring-2 ring-purple-500/20' 
                        : 'bg-white/70 border-white/20 hover:bg-white/80 hover:border-purple-200'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {/* Agent Icon */}
                      <div className={`p-1 rounded-lg ${medicalServices.find(s => s.name === selectedAgent)?.bgColor || 'bg-blue-100'}`}>
                        <div className={medicalServices.find(s => s.name === selectedAgent)?.color || 'text-blue-600'}>
                          {medicalServices.find(s => s.name === selectedAgent)?.icon || <User className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                      </div>
                      
                      {/* Agent Name */}
                      <span className="font-medium text-gray-700 truncate">
                        {selectedAgent.replace(' Agent', '')}
                      </span>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 w-72 sm:w-80 mb-2 bg-white backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden"
                    >
                      {/* Dropdown Header */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/20 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Select Medical Specialist
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {medicalServices.length} specialists available
                        </p>
                      </div>
                      
                      {/* Services List */}
                      <div className="max-h-64 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
                        {medicalServices.map((service, index) => (
                        <motion.button
                          key={service.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => {
                            setSelectedAgent(service.name);
                            setDropdownOpen(false);
                          }}
                                                     className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 hover:bg-purple-50/30 transition-all duration-200 border-b border-white/10 last:border-b-0 first:rounded-t-xl last:rounded-b-xl ${
                             selectedAgent === service.name ? 'bg-purple-100/50 border-purple-200/30' : ''
                           }`}
                        >
                          {/* Service Icon */}
                          <div className={`p-1.5 sm:p-2 rounded-lg ${service.bgColor}`}>
                            <div className={service.color}>
                              {service.icon}
                            </div>
                          </div>
                          
                          {/* Service Info */}
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-800 text-xs sm:text-sm">
                              {service.name.replace(' Agent', '')}
                            </div>
                            <div className="text-xs text-gray-600 w-full">
                              {service.description}
                            </div>
                          </div>
                          
                          {/* Selected Indicator */}
                          {selectedAgent === service.name && (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                          )}
                                                 </motion.button>
                       ))}
                       </div>
                     </motion.div>
                  )}
                </div>
                
                <span className="text-xs text-gray-500">
                  (Auto-selected based on your message)
                </span>
              </div>
              
              {/* Quick Agent Buttons */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {AVAILABLE_AGENTS.slice(0, 4).map((agent) => (
                  <button
                    key={agent}
                    onClick={() => setSelectedAgent(agent)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedAgent === agent
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/50 text-gray-700 hover:bg-white/70'
                    }`}
                  >
                    {agent.replace(' Agent', '')}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Continue the conversation..."
                className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-14 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-1.5 sm:p-2 rounded-xl hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center py-4 sm:py-6 text-gray-500 text-xs sm:text-sm px-4"
      >
        <p>NeuroNest AI - Your Medical Assistant • Powered by NeuroNest Team</p>
      </motion.div>

      {/* Emergency Alert Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 max-w-md w-full border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Emergency WhatsApp Alert</h3>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Send an emergency alert via WhatsApp to notify emergency contacts immediately.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={emergencyData.patient_name}
                  onChange={(e) => setEmergencyData(prev => ({...prev, patient_name: e.target.value}))}
                  placeholder="Enter patient name..."
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Emergency Condition
                </label>
                <textarea
                  value={emergencyData.condition}
                  onChange={(e) => setEmergencyData(prev => ({...prev, condition: e.target.value}))}
                  placeholder="Describe the emergency condition..."
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm sm:text-base"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmergencyModalSubmit}
                  disabled={isLoading || !emergencyData.patient_name.trim() || !emergencyData.condition.trim()}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      Send Alert
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Medicine Reminder Modal */}
      {showMedicineModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 max-w-md w-full border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Medicine Reminder Setup</h3>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Set up daily reminders for your medications.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={medicineData.phone}
                  onChange={(e) => setMedicineData(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Enter phone number (e.g., 923059974821)"
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  value={medicineData.medicine_name}
                  onChange={(e) => setMedicineData(prev => ({...prev, medicine_name: e.target.value}))}
                  placeholder="Enter medicine name..."
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={medicineData.reminder_time}
                  onChange={(e) => setMedicineData(prev => ({...prev, reminder_time: e.target.value}))}
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowMedicineModal(false)}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMedicineReminderSubmit}
                  disabled={isLoading || !medicineData.medicine_name.trim() || !medicineData.phone.trim() || !medicineData.reminder_time.trim()}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting...
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4" />
                      Set Reminder
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
