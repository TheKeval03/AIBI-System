
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { resumeAPI } from '@/services/api';
import { config } from '@/config/environment';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type (only PDF as per backend requirement)
      if (!config.ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only PDF files are allowed.",
        });
        return;
      }

      // Validate file size
      if (selectedFile.size > config.MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Start progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      // Call the actual backend API
      const response = await resumeAPI.parseResume(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setIsUploaded(true);
      setExtractedText(response.extracted_text);
      
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume has been processed and analyzed.",
      });

      // Store upload status and extracted text
      localStorage.setItem('resumeUploaded', 'true');
      localStorage.setItem('extractedResumeText', response.extracted_text);
      
      setTimeout(() => {
        navigate('/interview/basic');
      }, 1500);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      
      let errorMessage = "Please try again or contact support.";
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.detail || "Invalid file format or content.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error occurred while processing your resume.";
      }
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setIsUploaded(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Upload Your <span className="aibi-gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume to personalize the interview questions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-center">Resume Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file && (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop your resume here</h3>
                  <p className="text-gray-600 mb-4">or click to browse files</p>
                  <p className="text-sm text-gray-500">
                    Supports PDF only (max 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}

              {file && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    {!isUploading && !isUploaded && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {isUploaded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center space-x-2 text-green-600 py-4"
                    >
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-semibold">Resume uploaded successfully!</span>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Why do we need your resume?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Generate personalized questions based on your experience</li>
                  <li>• Tailor difficulty level to match your background</li>
                  <li>• Focus on technologies and tools you've mentioned</li>
                  <li>• Provide more relevant and targeted assessment</li>
                </ul>
              </div>

              {file && !isUploaded && (
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isUploading ? 'Processing Resume...' : 'Upload & Continue'}
                </Button>
              )}

              {!file && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/interview/basic')}
                  className="w-full h-12"
                >
                  Skip & Continue Without Resume
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadResume;
