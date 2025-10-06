import { useState, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Status } from '@/redux/slices/membersSlice';
import MemberCard from './MemberCard';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import StatusChart from './StatusChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Users, CheckCircle2, Circle } from 'lucide-react';

const TeamLeadView = () => {
  const members = useAppSelector((state) => state.members.members);
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'tasks'>('name');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('all');

  const statusCounts = useMemo(() => {
    return members.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {} as Record<Status, number>);
  }, [members]);

  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members];

    if (filterStatus !== 'all') {
      result = result.filter((m) => m.status === filterStatus);
    }

    if (sortBy === 'tasks') {
      result.sort((a, b) => {
        const aActiveTasks = a.tasks.filter((t) => !t.completed).length;
        const bActiveTasks = b.tasks.filter((t) => !t.completed).length;
        return bActiveTasks - aActiveTasks;
      });
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [members, filterStatus, sortBy]);

  const totalActiveTasks = members.reduce(
    (sum, m) => sum + m.tasks.filter((t) => !t.completed).length,
    0
  );
  const totalCompletedTasks = members.reduce(
    (sum, m) => sum + m.tasks.filter((t) => t.completed).length,
    0
  );

  const selectedMember = selectedMemberId !== 'all' ? members.find((m) => m.id === selectedMemberId) : undefined;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-glow transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Total Members</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">{members.length}</div>
            <p className="text-xs font-medium text-muted-foreground mt-1">
              {statusCounts.Working || 0} Working · {statusCounts.Meeting || 0} Meeting
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-glow transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-info opacity-10 rounded-full blur-3xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Active Tasks</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-gradient-info flex items-center justify-center shadow-glow-info">
              <Circle className="h-5 w-5 text-white fill-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-info">{totalActiveTasks}</div>
            <p className="text-xs font-medium text-muted-foreground mt-1">Tasks in progress</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-glow transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-success opacity-10 rounded-full blur-3xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Completed</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-gradient-success flex items-center justify-center shadow-glow-success">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-success">{totalCompletedTasks}</div>
            <p className="text-xs font-medium text-muted-foreground mt-1">Tasks finished</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-glow transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-accent opacity-5"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-success/10">
                <span className="font-semibold text-success">Working</span>
                <span className="font-bold text-success">{statusCounts.Working || 0}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
                <span className="font-semibold text-warning">Break</span>
                <span className="font-bold text-warning">{statusCounts.Break || 0}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-info/10">
                <span className="font-semibold text-info">Meeting</span>
                <span className="font-bold text-info">{statusCounts.Meeting || 0}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/10">
                <span className="font-semibold text-muted-foreground">Offline</span>
                <span className="font-bold text-muted-foreground">{statusCounts.Offline || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Task Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StatusChart />
        </div>
        <div>
          <TaskForm />
        </div>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Monitor team status and task progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Select Member</Label>
              <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                <SelectTrigger>
                  <SelectValue placeholder="All members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Filter by Status</Label>
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as Status | 'all')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Break">Break</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort by</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'tasks')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="tasks">Active Tasks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Member Grid or Selected Member */}
          {selectedMember ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Member Details</h3>
              </div>
              <MemberCard member={selectedMember} />
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>
                    {selectedMember.name}'s task list
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList tasks={selectedMember.tasks} memberId={selectedMember.id} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadView;
