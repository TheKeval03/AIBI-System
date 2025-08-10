
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, CheckCircle, Home, Download } from 'lucide-react';

const InterviewThankYou = () => {
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate AI evaluation process
    const evaluateInterview = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock score calculation
      const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100
      setScore(mockScore);
      setIsLoading(false);
    };

    evaluateInterview();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Interview <span className="aibi-gradient-text">Complete!</span>
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for completing the AIBI interview assessment
          </p>
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardContent className="py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold mb-2">Evaluating Your Responses</h3>
                <p className="text-gray-600 mb-6">
                  Our AI is analyzing your answers and calculating your score...
                </p>
                <div className="max-w-md mx-auto space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing responses...</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your Interview Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="relative">
                  <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 ${getScoreColor(score)} bg-transparent border`}
                  >
                    {getScoreLabel(score)}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold">Technical Skills</p>
                    <p className="text-sm text-gray-600">85%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">Communication</p>
                    <p className="text-sm text-gray-600">92%</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold">Problem Solving</p>
                    <p className="text-sm text-gray-600">78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>AI Feedback Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Strengths</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Strong technical knowledge and practical experience</li>
                    <li>• Clear communication and well-structured responses</li>
                    <li>• Good understanding of development best practices</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Areas for Improvement</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Consider providing more specific examples in responses</li>
                    <li>• Expand on problem-solving methodologies</li>
                    <li>• Discuss more about scalability considerations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Return Home</span>
              </Button>
              
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
                onClick={() => {
                  // Mock download functionality
                  console.log('Downloading detailed report...');
                }}
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewThankYou;
