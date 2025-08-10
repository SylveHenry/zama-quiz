# 🚀 Zama Ai Quiz - Test Your Privacy Knowledge

A modern, responsive Zama Ai Privacy quiz application built with Next.js 15. Test your knowledge of Zama Protocol. Inspired by Zama.ai's design aesthetic with beautiful gradients and micro-animations.

## ✨ Features

### 🎯 Quiz Functionality
- **20 Comprehensive Questions** covering Zama Protocol and privacy fundamentals
- **Single Question Display** with smooth transitions
- **Multiple Choice Format** with 4 options per question
- **Real-time Scoring** and progress tracking
- **30-second Timer** per question with visual countdown
- **Detailed Explanations** for each answer
- **Final Score Summary** with performance feedback

### 🎨 Design & UX
- **Zama.ai Inspired Theme** with purple/indigo gradients
- **Privacy Themed** icons and animations
- **Micro-animations** including float, pulse-glow, and slide-in effects
- **Fully Responsive** design for all device sizes
- **Dark Theme** with glassmorphism effects
- **Custom Scrollbar** with gradient styling

### 🏗️ Architecture
- **Modular Components** (Header, Footer, Quiz)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next.js 15** with App Router
- **Client-side State Management** with React hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zama
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile devices** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1440px+)

## 🎮 How to Play

1. **Start the Quiz** - Click on any question to begin
2. **Read Carefully** - Each question has 4 multiple-choice options
3. **Select Answer** - Click on your chosen option
4. **Submit** - Click "Submit Answer" to confirm your choice
5. **Learn** - Read the explanation for each question
6. **Continue** - Click "Next Question" to proceed
7. **Complete** - View your final score and performance summary
8. **Retry** - Take the quiz again to improve your score

## 🎨 Color Scheme

Inspired by Zama.ai's design:
- **Primary**: Purple (#6366f1) to Indigo (#8b5cf6) gradients
- **Background**: Dark navy (#0f0f23) to deep purple (#2d1b69)
- **Accent**: Gold (#f59e0b) for highlights
- **Success**: Emerald (#10b981)
- **Error**: Red (#ef4444)

## 🔧 Technical Stack

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom SVG cryptocurrency icons
- **Animations**: CSS keyframes with Tailwind classes

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with links and stats
│   └── Quiz.tsx             # Main quiz component
public/
└── crypto-icons.svg         # Custom cryptocurrency icons
```

## 🎯 Quiz Topics Covered

- **Fully Homomorphic Encryption** (FHE Fundamentals, Encryption Types)
- **Zama Protocol** (FHEVM, Zama Network, Privacy Solutions)
- **Privacy Technology** (Confidential Computing, Zero-Knowledge Proofs)
- **Blockchain Privacy** (Encrypted Smart Contracts, Private Transactions)
- **Cryptographic Concepts** (Homomorphic Operations, Key Management)
- **Privacy Applications** (Confidential DeFi, Private Voting, Secure Analytics)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
# Deploy to Vercel
```

Or deploy to any platform that supports Next.js applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and inspired by Zama.ai's beautiful design**
