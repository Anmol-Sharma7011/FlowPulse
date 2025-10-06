import { Status } from '@/redux/slices/membersSlice';
import { Badge } from './ui/badge';
import { Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'default' | 'lg';
}

const StatusBadge = ({ status, size = 'default' }: StatusBadgeProps) => {
  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'Working':
        return 'bg-success/20 text-success border-success/30 shadow-glow-success';
      case 'Break':
        return 'bg-warning/20 text-warning border-warning/30 shadow-glow-warning';
      case 'Meeting':
        return 'bg-info/20 text-info border-info/30 shadow-glow-info';
      case 'Offline':
        return 'bg-muted/50 text-muted-foreground border-muted';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <Badge className={`gap-1.5 px-3 py-1 rounded-full font-semibold border backdrop-blur-sm ${getStatusStyle(status)}`}>
      <Circle className={`h-2 w-2 fill-current animate-pulse`} />
      {status}
    </Badge>
  );
};

export default StatusBadge;
