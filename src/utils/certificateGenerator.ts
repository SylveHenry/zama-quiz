export interface CertificateData {
  score: number;
  totalQuestions: number;
  percentage: number;
  completionDate: string;
  difficulty: string;
}

const getScoreMessage = (percentage: number): string => {
  if (percentage >= 90) return '🚀 Zama Privacy Master! Outstanding!';
  if (percentage >= 80) return '💎 Excellent! You are Privacy Grounded!';
  if (percentage >= 70) return '⭐ Great job! You are Privacy Oriented!';
  if (percentage >= 60) return '📈 Good effort! Room for Improvement!';
  return '🎉 Congratulations! You are Privacy Centered!';
};

export const generateCertificate = async (data: CertificateData): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Set canvas dimensions
  canvas.width = 800;
  canvas.height = 600;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#FEF3C7'); // yellow-100
  gradient.addColorStop(0.5, '#FDE68A'); // yellow-200
  gradient.addColorStop(1, '#FBBF24'); // yellow-400
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = '#F59E0B'; // yellow-500
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Inner border
  ctx.strokeStyle = '#D97706'; // yellow-600
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Title
  ctx.fillStyle = '#1F2937'; // gray-800
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 120);

  // Subtitle
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.fillStyle = '#374151'; // gray-700
  ctx.fillText('Zama Privacy Quiz', canvas.width / 2, 170);

  // Difficulty level
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillStyle = '#7C3AED'; // violet-600
  const difficultyText = `${data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)} Level`;
  ctx.fillText(difficultyText, canvas.width / 2, 205);

  // Achievement text
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = '#4B5563'; // gray-600
  ctx.fillText('This certifies that you have successfully completed', canvas.width / 2, 240);
  ctx.fillText('the Zama Privacy Quiz with a score of', canvas.width / 2, 270);

  // Score
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.fillStyle = '#DC2626'; // red-600
  ctx.fillText(`${data.score}/${data.totalQuestions}`, canvas.width / 2, 340);

  // Percentage
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillStyle = '#EA580C'; // orange-600
  ctx.fillText(`(${data.percentage}%)`, canvas.width / 2, 380);

  // Congratulations message
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#059669'; // emerald-600
  const scoreMessage = getScoreMessage(data.percentage);
  ctx.fillText(scoreMessage, canvas.width / 2, 440);

  // Date
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = '#6B7280'; // gray-500
  ctx.fillText(`Completed on ${data.completionDate}`, canvas.width / 2, 480);

  // Powered by
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = '#9CA3AF'; // gray-400
  ctx.fillText('Powered by Zama Protocol', canvas.width / 2, 520);

  // Logo placeholder (we'll add the actual logo later)
  ctx.fillStyle = '#F59E0B'; // yellow-500
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 500, 20, 0, 2 * Math.PI);
  ctx.fill();

  // Convert canvas to data URL
  return canvas.toDataURL('image/png');
};

export const downloadCertificate = (dataUrl: string, filename: string = 'zama-privacy-quiz-certificate.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareToTwitter = async (score: number, totalQuestions: number, percentage: number, difficulty?: string) => {
  const difficultyText = difficulty ? ` (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level)` : '';
  const tweetText = `🎉 Just completed the Zama Privacy Quiz${difficultyText} with a score of ${score}/${totalQuestions} (${percentage}%)! 🔐\n\nTest your privacy knowledge and join the FHE revolution! 🚀\nTest your knowledge: https://zama-quiz.vercel.app/\n\n@zama_fhe @Zeusfi_bit\n#ZamaFHE #PrivacyFirst #Cryptography`;
  
  // Priority 1: Direct Twitter Share Link (text-only)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
  
  // Fallback: Try native share dialog if available (text-only)
  if (navigator.share) {
    try {
      const shareData = {
        title: 'Zama Privacy Quiz Results',
        text: tweetText
      };
      
      // Offer native share as an additional option
      setTimeout(() => {
        navigator.share(shareData).catch(() => {
          console.log('Native share cancelled or failed');
        });
      }, 2000);
    } catch {
      console.log('Native share not available');
    }
  }
};