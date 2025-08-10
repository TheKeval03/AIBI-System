import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { FileText, Users, Brain, Shield, ArrowRight } from 'lucide-react';

const Terms = () => {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  // Mock roles - in production, fetch from API
  const roles = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'React, Angular, Vue.js, HTML/CSS, JavaScript',
      icon: '🎨',
      questionsCount: 50
    },
    {
      id: 'backend',
      title: 'Backend Developer', 
      description: 'Node.js, Python, Java, .NET, Database Design',
      icon: '⚙️',
      questionsCount: 50
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description: 'Frontend + Backend technologies, DevOps basics',
      icon: '🔄',
      questionsCount: 50
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      description: 'React Native, Flutter, iOS, Android development',
      icon: '📱',
      questionsCount: 50
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      description: 'AWS, Docker, Kubernetes, CI/CD, Infrastructure',
      icon: '🚀',
      questionsCount: 50
    }
  ];

  const handleProceed = () => {
    console.log('Proceed button clicked', { hasReadTerms, selectedRole });
    
    if (!hasReadTerms) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions",
        description: "Please read and accept the terms and conditions.",
      });
      return;
    }

    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Selection",
        description: "Please select your interview role.",
      });
      return;
    }

    // Store selected role in localStorage for the interview
    localStorage.setItem('selectedRole', selectedRole);
    
    const selectedRoleData = roles.find(r => r.id === selectedRole);
    
    toast({
      title: "Ready to start!",
      description: `Starting interview for ${selectedRoleData?.title}`,
    });

    console.log('Navigating to upload-resume');
    navigate('/upload-resume');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Terms & <span className="aibi-gradient-text">Role Selection</span>
          </h1>
          <p className="text-lg text-gray-600">
            Welcome {user.firstName}! Please review the terms and select your interview role to continue
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Terms & Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 w-full rounded border p-4 bg-gray-50">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">1. Interview Process</h3>
                      <p className="text-gray-700">
                        This AI-powered interview consists of three phases: Basic Questions (5 questions), 
                        Resume-based Questions (2-4 questions), and Follow-up Questions (1-3 questions). 
                        Each answer will be evaluated by our AI system.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">2. Data Collection & Privacy</h3>
                      <p className="text-gray-700">
                        We collect your responses, uploaded resume, and evaluation results for assessment purposes. 
                        Your data will be stored securely and used only for interview evaluation and improving our AI system.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">3. Evaluation Criteria</h3>
                      <p className="text-gray-700">
                        Each question is worth 25 points, evaluated based on technical accuracy, completeness, 
                        and relevance. The AI system provides objective scoring and detailed feedback.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">4. Results & Feedback</h3>
                      <p className="text-gray-700">
                        You will receive your complete evaluation results, including scores per question, 
                        overall percentage, and detailed AI feedback upon completion.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">5. Fair Use Policy</h3>
                      <p className="text-gray-700">
                        This interview should be completed honestly and without external assistance. 
                        The AI system is designed to detect inconsistencies in responses.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">6. Technical Requirements</h3>
                      <p className="text-gray-700">
                        Ensure stable internet connection throughout the interview. The session will be saved 
                        automatically, but we recommend completing it in one sitting for the best experience.
                      </p>
                    </div>
                  </div>
                </ScrollArea>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="accept-terms"
                    checked={hasReadTerms}
                    onCheckedChange={(checked) => {
                      console.log('Terms checkbox changed:', checked);
                      setHasReadTerms(checked === true);
                    }}
                  />
                  <label
                    htmlFor="accept-terms"
                    className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to the terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Select Your Role</span>
                </CardTitle>
                <p className="text-gray-600">Choose the role that best matches your expertise</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <motion.div
                      key={role.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedRole === role.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => {
                          console.log('Role selected:', role.id);
                          setSelectedRole(role.id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{role.icon}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{role.title}</h3>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {/* <div className="text-xs text-gray-500">{role.questionsCount} questions</div> */}
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedRole === role.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedRole === role.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">AI-Powered Evaluation</h4>
                      <p className="text-sm text-blue-800">
                        Our advanced AI will generate role-specific questions based on your selection 
                        and provide detailed technical assessment.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProceed}
                  disabled={!hasReadTerms || !selectedRole}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Start Interview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
