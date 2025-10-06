// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { addTask } from '@/redux/slices/membersSlice';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Calendar } from './ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
// import { CalendarIcon, Plus } from 'lucide-react';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { toast } from 'sonner';

// const TaskForm = () => {
//   const dispatch = useAppDispatch();
//   const members = useAppSelector((state) => state.members.members);

//   const [selectedMember, setSelectedMember] = useState<string>('');
//   const [taskTitle, setTaskTitle] = useState('');
//   const [dueDate, setDueDate] = useState<Date>();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedMember || !taskTitle || !dueDate) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     dispatch(
//       addTask({
//         memberId: selectedMember,
//         task: {
//           title: taskTitle,
//           dueDate: format(dueDate, 'yyyy-MM-dd'),
//           progress: 0,
//           completed: false,
//         },
//       })
//     );

//     toast.success('Task assigned successfully!');
//     setSelectedMember('');
//     setTaskTitle('');
//     setDueDate(undefined);
//   };

//   return (
//     <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
//             <Plus className="h-4 w-4 text-white" />
//           </div>
//           Assign New Task
//         </CardTitle>
//         <CardDescription>Assign tasks to team members</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="member">Team Member</Label>
//             <Select value={selectedMember} onValueChange={setSelectedMember}>
//               <SelectTrigger id="member">
//                 <SelectValue placeholder="Select member" />
//               </SelectTrigger>
//               <SelectContent>
//                 {members.map((member) => (
//                   <SelectItem key={member.id} value={member.id}>
//                     {member.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="title">Task Title</Label>
//             <Input
//               id="title"
//               placeholder="Enter task title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Due Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     'w-full justify-start text-left font-normal',
//                     !dueDate && 'text-muted-foreground'
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={dueDate}
//                   onSelect={setDueDate}
//                   initialFocus
//                   className="pointer-events-auto"
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           <Button type="submit" className="w-full gap-2 font-semibold shadow-md hover:shadow-lg">
//             <Plus className="h-4 w-4" />
//             Assign Task
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskForm;

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTask } from "@/redux/slices/membersSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members.members);

  const [selectedMember, setSelectedMember] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMember || !taskTitle || !dueDate) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(
      addTask({
        memberId: selectedMember,
        task: {
          title: taskTitle,
          dueDate: format(dueDate, "yyyy-MM-dd"),
          progress: 0,
          completed: false,
        },
      })
    );

    toast.success("Task assigned successfully!");
    setSelectedMember("");
    setTaskTitle("");
    setDueDate(undefined);
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
          Assign New Task
        </CardTitle>
        <CardDescription>Assign tasks to team members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Member Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="member">Team Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger id="member">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>

              <SelectContent 
                side="bottom" 
                className="max-h-[300px] overflow-y-auto !h-[300px] z-50" 
                // We are setting both max-height and height explicitly.
              >
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2 font-semibold shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Assign Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
