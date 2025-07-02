import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Calendar, 
  BarChart3, 
  Settings, 
  Plus,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  MessageSquare,
  Filter,
  Search,
  Play,
  Pause,
  Edit3,
  Eye
} from 'lucide-react';

const AutomatedUserInterviewSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Power Users Q1 2025",
      status: "active",
      targeting: "Users with >50 tasks created",
      sent: 127,
      responses: 23,
      scheduled: 8,
      responseRate: 18.1,
      createdAt: "2025-01-15"
    },
    {
      id: 2,
      name: "New Feature Feedback",
      status: "draft",
      targeting: "Users who tried AI features",
      sent: 0,
      responses: 0,
      scheduled: 0,
      responseRate: 0,
      createdAt: "2025-01-20"
    },
    {
      id: 3,
      name: "Churn Prevention",
      status: "paused",
      targeting: "Inactive users (30+ days)",
      sent: 89,
      responses: 12,
      scheduled: 3,
      responseRate: 13.5,
      createdAt: "2025-01-10"
    }
  ]);

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      userName: "Sarah Chen",
      userEmail: "sarah@techcorp.com",
      company: "TechCorp",
      industry: "SaaS",
      scheduledTime: "2025-01-28 14:00",
      interviewer: "Alex Kim",
      status: "confirmed",
      userBehavior: {
        tasksCreated: 127,
        featuresUsed: ["AI Clone", "Team Collaboration", "Analytics"],
        lastActive: "2025-01-26",
        engagementScore: 85
      }
    },
    {
      id: 2,
      userName: "Marcus Rodriguez",
      userEmail: "marcus@startup.io",
      company: "StartupCo",
      industry: "Fintech",
      scheduledTime: "2025-01-28 16:00",
      interviewer: "Jamie Park",
      status: "pending",
      userBehavior: {
        tasksCreated: 89,
        featuresUsed: ["Digital Mind", "Monetization"],
        lastActive: "2025-01-25",
        engagementScore: 72
      }
    }
  ]);

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    targeting: '',
    emailTemplate: 'power_user',
    interviewers: []
  });

  const emailTemplates = {
    power_user: {
      subject: "Love to hear about your experience with {{product_name}}",
      body: `Hi {{user_name}},

I noticed you've been incredibly active on {{product_name}} - {{task_count}} tasks created is impressive! 

I'd love to hear about your experience and learn how we can make the product even better for power users like yourself.

Would you be open to a quick 15-minute chat? I can work around your schedule.

Best regards,
{{interviewer_name}}`
    },
    new_feature: {
      subject: "Quick feedback on {{feature_name}}?",
      body: `Hi {{user_name}},

Thanks for trying out our new {{feature_name}} feature! Your early feedback would be incredibly valuable.

Could we chat for 10-15 minutes about your experience? I'd love to understand what's working well and what could be improved.

{{scheduling_link}}

Thanks!
{{interviewer_name}}`
    },
    churn_prevention: {
      subject: "Miss seeing you on {{product_name}}",
      body: `Hi {{user_name}},

I noticed you haven't been as active on {{product_name}} lately. I'd love to understand if there's anything we can do to make the product more valuable for you.

No pressure at all - just wanted to reach out and see if there's anything blocking you or if we can help in any way.

Would you be open to a brief chat?

Best,
{{interviewer_name}}`
    }
  };

  const getDashboardStats = () => {
    const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
    const totalResponses = campaigns.reduce((sum, c) => sum + c.responses, 0);
    const totalScheduled = campaigns.reduce((sum, c) => sum + c.scheduled, 0);
    const avgResponseRate = campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + c.responseRate, 0) / campaigns.length 
      : 0;

    return {
      totalSent,
      totalResponses,
      totalScheduled,
      avgResponseRate: avgResponseRate.toFixed(1)
    };
  };

  const stats = getDashboardStats();

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSent}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Responses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalResponses}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalScheduled}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgResponseRate}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+2.3% from last month</p>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
            <button 
              onClick={() => setShowCreateCampaign(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Targeting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">Created {campaign.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.targeting}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.sent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.responseRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.scheduled}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        {campaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInterviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search interviews..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {interview.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{interview.userName}</h3>
                    <p className="text-sm text-gray-600">{interview.company} • {interview.industry}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Interview Time</p>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(interview.scheduledTime).toLocaleDateString()} at {new Date(interview.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Interviewer</p>
                    <p className="text-sm text-gray-900">{interview.interviewer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      interview.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {interview.status}
                    </span>
                  </div>
                </div>

                {/* User Behavior Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">User Context & Preparation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Activity Level</p>
                      <p className="text-sm text-gray-900">{interview.userBehavior.tasksCreated} tasks created</p>
                      <p className="text-xs text-gray-600">Last active: {interview.userBehavior.lastActive}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Features Used</p>
                      <div className="flex flex-wrap gap-1">
                        {interview.userBehavior.featuresUsed.map((feature, idx) => (
                          <span key={idx} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Engagement Score</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${interview.userBehavior.engagementScore}%`}}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{interview.userBehavior.engagementScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Join Call
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
        <button 
          onClick={() => setShowCreateCampaign(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.targeting}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                <p className="text-sm text-gray-600">Emails Sent</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{campaign.responses}</p>
                <p className="text-sm text-gray-600">Responses</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{campaign.scheduled}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{campaign.responseRate}%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Campaign
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </button>
              <button className={`inline-flex items-center px-4 py-2 rounded-lg ${
                campaign.status === 'active' 
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}>
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateCampaign = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create New Campaign</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Power Users Q1 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Targeting</label>
            <select
              value={newCampaign.targeting}
              onChange={(e) => setNewCampaign({...newCampaign, targeting: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select targeting criteria...</option>
              <option value="power_users">Power Users (50+ tasks created)</option>
              <option value="new_feature_users">Users who tried new features</option>
              <option value="inactive_users">Inactive users (30+ days)</option>
              <option value="high_engagement">High engagement score (80+)</option>
              <option value="enterprise_users">Enterprise customers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
            <select
              value={newCampaign.emailTemplate}
              onChange={(e) => setNewCampaign({...newCampaign, emailTemplate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="power_user">Power User Template</option>
              <option value="new_feature">New Feature Feedback</option>
              <option value="churn_prevention">Churn Prevention</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Preview</label>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="text-sm">
                <p className="font-medium mb-2">Subject: {emailTemplates[newCampaign.emailTemplate]?.subject}</p>
                <div className="whitespace-pre-line text-gray-700">
                  {emailTemplates[newCampaign.emailTemplate]?.body}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interview Team</label>
            <div className="space-y-2">
              {['Alex Kim', 'Jamie Park', 'Morgan Davis', 'Casey Johnson'].map((interviewer) => (
                <label key={interviewer} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{interviewer}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateCampaign(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Interview System</h1>
          <p className="text-sm text-gray-600 mt-1">Automated User Research</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'campaigns'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Target className="h-5 w-5 mr-3" />
              Campaigns
            </button>
            
            <button
              onClick={() => setActiveTab('interviews')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'interviews'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Interviews
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              Analytics
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">JD</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Customer Success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <div className="p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'interviews' && renderInterviews()}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Rate Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Chart showing response rate trends over time</p>
                      <p className="text-sm text-gray-500 mt-2">Integration with analytics tools coming soon</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-sm text-gray-600">{campaign.responseRate}% response rate</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{campaign.scheduled} interviews</p>
                          <p className="text-xs text-gray-500">from {campaign.sent} emails</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Best Performing Templates */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Performing Email Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Power User Template</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">22.3%</p>
                    <p className="text-sm text-gray-600">Response Rate</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">New Feature Template</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">18.7%</p>
                    <p className="text-sm text-gray-600">Response Rate</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Churn Prevention</h4>
                    <p className="text-2xl font-bold text-orange-600 mt-2">13.5%</p>
                    <p className="text-sm text-gray-600">Response Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Integration Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Gmail API</p>
                          <p className="text-sm text-gray-600">Send automated emails</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Calendly</p>
                          <p className="text-sm text-gray-600">Automatic scheduling</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          <BarChart3 className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Amplitude</p>
                          <p className="text-sm text-gray-600">User behavior analytics</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Team Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Team</h3>
                  <div className="space-y-3">
                    {['Alex Kim', 'Jamie Park', 'Morgan Davis', 'Casey Johnson'].map((interviewer) => (
                      <div key={interviewer} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium text-sm">
                              {interviewer.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{interviewer}</p>
                            <p className="text-sm text-gray-600">Customer Success</p>
                          </div>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </div>
                    ))}
                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800">
                      + Add Team Member
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Email Templates */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
                <div className="space-y-4">
                  {Object.entries(emailTemplates).map(([key, template]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">{key.replace('_', ' ')} Template</h4>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Subject: {template.subject}</p>
                      <p className="text-sm text-gray-700 line-clamp-3">{template.body.substring(0, 120)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateCampaign && renderCreateCampaign()}
    </div>
  );
};

export default AutomatedUserInterviewSystem;
