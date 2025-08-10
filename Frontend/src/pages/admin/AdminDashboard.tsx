import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Settings, BarChart3, TrendingUp, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    navigate('/');
    return null;
  }

  const getUserDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.username || user.email || 'Admin';
  };

  const stats = [
    { title: 'Total Interviews', value: '248', change: '+12%', icon: FileText },
    { title: 'Active Users', value: '89', change: '+5%', icon: Users },
    { title: 'Avg Score', value: '78%', change: '+3%', icon: TrendingUp },
    { title: 'Completion Rate', value: '94%', change: '+2%', icon: UserCheck },
  ];

  const quickActions = [
    {
      title: 'Manage Roles',
      description: 'Add, edit, or remove interview roles',
      icon: Settings,
      path: '/admin/manage-roles',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Questions',
      description: 'Edit question banks for each role',
      icon: FileText,
      path: '/admin/manage-questions',
      color: 'bg-green-500'
    },
    {
      title: 'View Users',
      description: 'Review candidate results and analytics',
      icon: Users,
      path: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed performance metrics',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Admin <span className="aibi-gradient-text">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {getUserDisplayName()}. Here's your platform overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <Badge variant="secondary" className="text-green-600 bg-green-50 mt-1">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      className="h-auto p-4 flex flex-col items-start space-y-2 w-full text-left hover:bg-gray-50"
                      onClick={() => navigate(action.path)}
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Recent Interview Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Smith', role: 'Frontend Developer', score: '92%', status: 'completed' },
                  { name: 'Sarah Johnson', role: 'Backend Developer', score: '85%', status: 'completed' },
                  { name: 'Mike Wilson', role: 'Full Stack Developer', score: 'In Progress', status: 'active' },
                  { name: 'Emma Davis', role: 'UI/UX Designer', score: '78%', status: 'completed' },
                ].map((candidate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-600">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={candidate.status === 'completed' ? 'default' : 'secondary'}
                        className={candidate.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {candidate.score}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
