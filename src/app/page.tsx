import Header from '../components/Header';
import Footer from '../components/Footer';
import Quiz from '../components/Quiz';
import FlowingText from '../components/FlowingText';
import { QuizProvider } from '../contexts/QuizContext';

export default function Home() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex flex-col relative">
        <FlowingText />
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          <Quiz />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
