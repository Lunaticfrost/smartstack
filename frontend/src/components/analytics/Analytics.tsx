import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  // Sample data - replace with real API data
  const completionTrends = [
    { date: '2024-01-01', completed: 5, total: 8 },
    { date: '2024-01-02', completed: 7, total: 10 },
    { date: '2024-01-03', completed: 4, total: 6 },
    { date: '2024-01-04', completed: 8, total: 12 },
    { date: '2024-01-05', completed: 6, total: 8 }
  ];

  const tasksByStatus = [
    { name: 'Todo', value: 10 },
    { name: 'In Progress', value: 5 },
    { name: 'Review', value: 3 },
    { name: 'Done', value: 15 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Task Completion Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#8884d8" name="Completed Tasks" />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" name="Total Tasks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Task Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {((tasksByStatus.find(t => t.name === 'Done')?.value || 0) / 
                    tasksByStatus.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {tasksByStatus.find(t => t.name === 'In Progress')?.value || 0}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;