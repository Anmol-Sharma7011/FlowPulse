import { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatusChart = () => {
  const members = useAppSelector((state) => state.members.members);

  const chartData = useMemo(() => {
    const statusCounts = members.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Working', value: statusCounts.Working || 0, color: 'hsl(var(--chart-2))' },
      { name: 'Break', value: statusCounts.Break || 0, color: 'hsl(var(--chart-3))' },
      { name: 'Meeting', value: statusCounts.Meeting || 0, color: 'hsl(var(--chart-4))' },
      { name: 'Offline', value: statusCounts.Offline || 0, color: 'hsl(var(--muted-foreground))' },
    ];
  }, [members]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Team Status Distribution</CardTitle>
        <CardDescription>Real-time overview of team availability</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatusChart;
