
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import UploadResume from "./pages/UploadResume";
import InterviewBasic from "./pages/interview/InterviewBasic";
import InterviewResumeBased from "./pages/interview/InterviewResumeBased";
import InterviewFollowUp from "./pages/interview/InterviewFollowUp";
import InterviewThankYou from "./pages/interview/InterviewThankYou";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/interview/basic" element={<InterviewBasic />} />
            <Route path="/interview/resume-based" element={<InterviewResumeBased />} />
            <Route path="/interview/follow-up" element={<InterviewFollowUp />} />
            <Route path="/interview/thankyou" element={<InterviewThankYou />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-roles" element={<AdminRoles />} />
            <Route path="/admin/manage-questions" element={<AdminQuestions />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
