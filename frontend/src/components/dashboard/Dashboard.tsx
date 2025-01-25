import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Users,
  PieChart
} from 'lucide-react';

// Mock data - replace with actual API calls
const taskData = [
  { name: 'Jan', tasks: 40 },
  { name: 'Feb', tasks: 30 },
  { name: 'Mar', tasks: 50 },
  { name: 'Apr', tasks: 45 },
  { name: 'May', tasks: 60 },
  { name: 'Jun', tasks: 55 },
];

const Dashboard: React.FC = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Total Tasks</h3>
              <p className="text-2xl font-bold text-indigo-600">124</p>
            </div>
            <CheckSquare className="text-indigo-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Time Tracked</h3>
              <p className="text-2xl font-bold text-green-600">86h 30m</p>
            </div>
            <Clock className="text-green-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Productivity</h3>
              <p className="text-2xl font-bold text-blue-600">78%</p>
            </div>
            <TrendingUp className="text-blue-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Overdue Tasks</h3>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <AlertTriangle className="text-red-500 w-8 h-8" />
          </div>
        </div>

        {/* Task Completion Chart */}
        <div className="col-span-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="#8884d8" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <ul className="space-y-3">
            {[
              { title: 'Implement Dashboard', status: 'In Progress' },
              { title: 'Design New Feature', status: 'Pending' },
              { title: 'Code Review', status: 'Completed' },
              { title: 'Team Meeting', status: 'Scheduled' }
            ].map((task, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <span className="text-sm">{task.title}</span>
                <span 
                  className={`
                    text-xs px-2 py-1 rounded-full
                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}
                  `}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="
                bg-indigo-50 text-indigo-600 
                hover:bg-indigo-100 
                p-3 rounded-lg 
                flex flex-col items-center justify-center
              "
            >
              <CheckSquare className="w-6 h-6 mb-2" />
              <span className="text-sm">New Task</span>
            </button>
            <button 
              className="
                bg-green-50 text-green-600 
                hover:bg-green-100 
                p-3 rounded-lg 
                flex flex-col items-center justify-center
              "
            >
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm">Start Timer</span>
            </button>
            <button 
              className="
                bg-blue-50 text-blue-600 
                hover:bg-blue-100 
                p-3 rounded-lg 
                flex flex-col items-center justify-center
              "
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">Add Team</span>
            </button>
            <button 
              className="
                bg-purple-50 text-purple-600 
                hover:bg-purple-100 
                p-3 rounded-lg 
                flex flex-col items-center justify-center
              "
            >
              <PieChart className="w-6 h-6 mb-2" />
              <span className="text-sm">View Report</span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;