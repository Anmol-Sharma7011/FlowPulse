// import { useAppDispatch } from '@/redux/hooks';
// import { Task, updateTaskProgress } from '@/redux/slices/membersSlice';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Progress } from './ui/progress';
// import { Badge } from './ui/badge';
// import { CalendarIcon, Minus, Plus, CheckCircle2 } from 'lucide-react';
// import { format } from 'date-fns';

// interface TaskListProps {
//   tasks: Task[];
//   memberId: string;
// }

// const TaskList = ({ tasks, memberId }: TaskListProps) => {
//   const dispatch = useAppDispatch();

//   const handleProgressChange = (taskId: string, currentProgress: number, delta: number) => {
//     const newProgress = currentProgress + delta;
//     dispatch(updateTaskProgress({ memberId, taskId, progress: newProgress }));
//   };

//   if (tasks.length === 0) {
//     return (
//       <Card className="backdrop-blur-sm bg-card/80 border-border/50">
//         <CardHeader>
//           <CardTitle>Your Tasks</CardTitle>
//           <CardDescription>No tasks assigned yet</CardDescription>
//         </CardHeader>
//       </Card>
//     );
//   }

//   return (
//     <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-lg bg-gradient-info flex items-center justify-center">
//             <CheckCircle2 className="h-4 w-4 text-white" />
//           </div>
//           Your Tasks
//         </CardTitle>
//         <CardDescription>Manage and track your progress</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className={`rounded-xl border border-border/50 p-4 space-y-3 backdrop-blur-sm transition-all duration-300 ${
//               task.completed ? 'bg-muted/30' : 'bg-card/50 hover:bg-card/80 hover:shadow-md'
//             }`}
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div className="flex-1 space-y-1">
//                 <div className="flex items-center gap-2">
//                   <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
//                     {task.title}
//                   </h4>
//                   {task.completed && (
//                     <Badge className="gap-1 bg-success/20 text-success border-success/30 font-semibold">
//                       <CheckCircle2 className="h-3 w-3" />
//                       Completed
//                     </Badge>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                   <CalendarIcon className="h-3 w-3" />
//                   Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="font-medium text-muted-foreground">Progress</span>
//                 <span className="font-bold text-primary">{task.progress}%</span>
//               </div>
//               <Progress value={task.progress} className="h-3" />
//             </div>

//             {!task.completed && (
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleProgressChange(task.id, task.progress, -10)}
//                   disabled={task.progress === 0}
//                   className="rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
//                 >
//                   <Minus className="h-3 w-3" />
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleProgressChange(task.id, task.progress, 10)}
//                   disabled={task.progress === 100}
//                   className="rounded-lg hover:bg-success/10 hover:text-success hover:border-success/50"
//                 >
//                   <Plus className="h-3 w-3" />
//                 </Button>
//                 <span className="text-xs font-medium text-muted-foreground">Adjust by 10%</span>
//               </div>
//             )}
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskList;


import { useAppDispatch } from '@/redux/hooks';
import { Task, updateTaskProgress } from '@/redux/slices/membersSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CalendarIcon, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  memberId: string;
}

const TaskList = ({ tasks, memberId }: TaskListProps) => {
  const dispatch = useAppDispatch();

  const handleProgressChange = (
    taskId: string,
    currentProgress: number,
    delta: number
  ) => {
    const newProgress = Math.min(100, Math.max(0, currentProgress + delta));
    dispatch(updateTaskProgress({ memberId, taskId, progress: newProgress }));
  };

  if (tasks.length === 0) {
    return (
      <Card className="backdrop-blur-sm bg-card/80 border-border/50">
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>No tasks assigned yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => {
        const isCompleted = task.completed && task.progress === 100;
        const isPartiallyCompleted = task.completed && task.progress < 100;

        return (
          <div
            key={task.id}
            className={`rounded-xl border border-border/50 p-5 transition-all duration-300
              ${
                isCompleted
                  ? 'bg-green-50 dark:bg-green-900/30 opacity-80 text-gray-700 dark:text-green-200'
                  : isPartiallyCompleted
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 text-gray-800 dark:text-yellow-200'
                  : 'bg-card/50 dark:bg-card/80 hover:shadow-lg hover:bg-gradient-to-r hover:from-cyan-400/20 hover:via-blue-400/20 hover:to-indigo-500/20 dark:hover:from-cyan-600/20 dark:hover:via-blue-600/20 dark:hover:to-indigo-700/20'
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4
                  className={`font-semibold text-lg ${
                    isCompleted ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.title}
                </h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3" />
                  Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </div>
              </div>

              {isCompleted && (
                <Badge className="gap-1 bg-green-600/20 text-green-400 border-green-500/30 font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </Badge>
              )}

              {isPartiallyCompleted && (
                <Badge className="gap-1 bg-yellow-600/20 text-yellow-400 border-yellow-500/30 font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  Partial
                </Badge>
              )}
            </div>

            {/* Progress visualization */}
            <div className="flex items-center gap-5 mt-4">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={isCompleted ? '#22C55E' : '#06B6D4'}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="176"
                    strokeDashoffset={176 - (176 * task.progress) / 100}
                    strokeLinecap="round"
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                  {task.progress}%
                </div>
              </div>

              <div className="flex-1">
                <Progress value={task.progress} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Update controls */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleProgressChange(task.id, task.progress, -10)}
                disabled={task.progress === 0}
                className="rounded-full border-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-400"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => handleProgressChange(task.id, task.progress, 10)}
                disabled={task.progress === 100}
                className="rounded-xl px-6 py-3 border-cyan-500 text-lg font-semibold hover:bg-cyan-500/20 hover:text-cyan-400"
              >
                + Update Progress
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => handleProgressChange(task.id, task.progress, 10)}
                disabled={task.progress === 100}
                className="rounded-full border-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-400"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
