
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  phase: string;
  order: number;
}

const InterviewBasic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Mock questions - in production, fetch from API based on selected role
    const mockQuestions: Question[] = [
      {
        id: '1',
        text: 'What development tools and technologies do you use in your daily work?',
        phase: 'basic',
        order: 1
      },
      {
        id: '2',
        text: 'Describe your experience with version control systems like Git.',
        phase: 'basic',
        order: 2
      },
      {
        id: '3',
        text: 'How do you approach debugging when you encounter a complex issue?',
        phase: 'basic',
        order: 3
      },
      {
        id: '4',
        text: 'Explain a challenging project you worked on and how you overcame the difficulties.',
        phase: 'basic',
        order: 4
      },
      {
        id: '5',
        text: 'How do you stay updated with the latest developments in your field?',
        phase: 'basic',
        order: 5
      }
    ];

    setQuestions(mockQuestions);
    setAnswers(new Array(mockQuestions.length).fill(''));

    // Timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast({
        variant: "destructive",
        title: "Answer required",
        description: "Please provide an answer before continuing.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call to submit answer and get next question
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitting answer:', {
        questionId: questions[currentQuestionIndex].id,
        answer: currentAnswer,
        questionNumber: currentQuestionIndex + 1
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswer(answers[currentQuestionIndex + 1] || '');
      } else {
        // Completed basic questions
        localStorage.setItem('basicQuestionsCompleted', 'true');
        toast({
          title: "Basic questions completed!",
          description: "Moving to resume-based questions.",
        });
        navigate('/interview/resume-based');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit answer",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1] || '');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading interview questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
              Basic <span className="aibi-gradient-text">Interview</span>
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(timeElapsed)}</span>
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {currentQuestion?.text}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Answer
                </label>
                <Textarea
                  placeholder="Type your answer here... Be specific and provide examples where possible."
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{currentAnswer.length} characters</span>
                  <span>Recommended: 100-500 words</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips for better answers:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Be specific and provide concrete examples</li>
                  <li>• Explain your thought process and reasoning</li>
                  <li>• Mention relevant technologies or methodologies</li>
                  <li>• Keep your answer focused and organized</li>
                </ul>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLoading || !currentAnswer.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
                >
                  <span>
                    {isLoading 
                      ? 'Submitting...' 
                      : currentQuestionIndex === questions.length - 1 
                        ? 'Complete Phase' 
                        : 'Next Question'
                    }
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Phase Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            Phase 1 of 3: Basic Questions • 
            Next: Resume-based Questions • 
            Final: Follow-up Questions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewBasic;
