// import { Status } from '@/redux/slices/membersSlice';
// import { Button } from './ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Coffee, Briefcase, Users, PowerOff } from 'lucide-react';

// interface StatusSelectorProps {
//   currentStatus: Status;
//   onStatusChange: (status: Status) => void;
// }

// const StatusSelector = ({ currentStatus, onStatusChange }: StatusSelectorProps) => {
//   const statuses: { status: Status; icon: any; color: string }[] = [
//     { status: 'Working', icon: Briefcase, color: 'success' },
//     { status: 'Break', icon: Coffee, color: 'warning' },
//     { status: 'Meeting', icon: Users, color: 'info' },
//     { status: 'Offline', icon: PowerOff, color: 'muted' },
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Your Status</CardTitle>
//         <CardDescription>Update your current working status</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 gap-3">
//           {statuses.map(({ status, icon: Icon, color }) => (
//             <Button
//               key={status}
//               variant={currentStatus === status ? 'default' : 'outline'}
//               className={`h-auto flex-col gap-2 py-4 ${
//                 currentStatus === status
//                   ? ''
//                   : color === 'success'
//                   ? 'hover:border-success hover:text-success'
//                   : color === 'warning'
//                   ? 'hover:border-warning hover:text-warning'
//                   : color === 'info'
//                   ? 'hover:border-info hover:text-info'
//                   : 'hover:border-muted-foreground hover:text-muted-foreground'
//               }`}
//               onClick={() => onStatusChange(status)}
//             >
//               <Icon className="h-5 w-5" />
//               <span className="text-sm font-medium">{status}</span>
//             </Button>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatusSelector;

import { Status } from '@/redux/slices/membersSlice';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Coffee, Briefcase, Users, PowerOff } from 'lucide-react';

interface StatusSelectorProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

const StatusSelector = ({ currentStatus, onStatusChange }: StatusSelectorProps) => {
  const statuses: { status: Status; icon: any }[] = [
    { status: 'Working', icon: Briefcase },
    { status: 'Break', icon: Coffee },
    { status: 'Meeting', icon: Users },
    { status: 'Offline', icon: PowerOff },
  ];

 const getButtonClasses = (isActive: boolean) => {
  const base = 'h-auto flex-col gap-2 py-4 font-medium text-sm border rounded-lg transition-colors';
  return isActive
    ? `${base} bg-blue-600 dark:bg-blue-600 text-white border-blue-400 dark:border-blue-500`
    : `${base} bg-transparent text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800`;
};


  return (
    <Card className="bg-white dark:bg-gradient-to-r dark:from-[#0F172A] dark:via-[#111827] dark:to-[#1E293B] border-gray-200 dark:border-gray-800 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Your Status</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-300">
          Update your current working status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statuses.map(({ status, icon: Icon }) => (
            <Button
              key={status}
              onClick={() => onStatusChange(status)}
              className={getButtonClasses(currentStatus === status)}
            >
              <Icon className="h-5 w-5" />
              <span>{status}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusSelector;

