import { Member } from '@/redux/slices/membersSlice';
import { Card, CardContent, CardHeader } from './ui/card';
import StatusBadge from './StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const activeTasks = member.tasks.filter((t) => !t.completed).length;
  const completedTasks = member.tasks.filter((t) => t.completed).length;

  return (
    <Card className="group relative overflow-hidden hover:shadow-glow transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-primary/20 ring-2 ring-primary/10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-primary text-white font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-success animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-base">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <StatusBadge status={member.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 backdrop-blur-sm">
            <Circle className="h-3 w-3 text-primary fill-primary" />
            <span className="font-bold text-primary">{activeTasks}</span>
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3 text-success fill-success" />
            <span className="font-bold text-success">{completedTasks}</span>
            <span className="text-muted-foreground">Done</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
