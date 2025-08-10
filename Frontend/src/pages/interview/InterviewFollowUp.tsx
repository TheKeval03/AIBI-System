
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ArrowRight } from 'lucide-react';

const InterviewFollowUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Follow-up Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                The final phase focuses on clarifying and expanding your previous answers 
                to get a complete picture of your capabilities.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-purple-900 mb-2">Final phase includes:</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Clarification on previous responses</li>
                  <li>• Deeper technical discussions</li>
                  <li>• Scenario-based problem solving</li>
                  <li>• 1-3 targeted follow-up questions</li>
                </ul>
              </div>

              <Button
                onClick={() => navigate('/interview/thankyou')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Complete Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewFollowUp;
