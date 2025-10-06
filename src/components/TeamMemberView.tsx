// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { updateMemberStatus } from "@/redux/slices/membersSlice";
// import { setUser } from "@/redux/slices/roleSlice"; // ✅ import setUser
// import StatusSelector from "./StatusSelector";
// import TaskList from "./TaskList";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import StatusBadge from "./StatusBadge";
// import { CheckCircle2, Circle, TrendingUp } from "lucide-react";
// import { useMemo, useState, useEffect } from "react";

// const TeamMemberView = () => {
//   const dispatch = useAppDispatch();
//   const { members } = useAppSelector((state) => state.members);

//   // Initialize selectedMemberId to first member if exists
//   const [selectedMemberId, setSelectedMemberId] = useState<string>(
//     members.length > 0 ? members[0].id : ""
//   );

//   // Update global currentUser in Redux whenever selectedMemberId changes
//   useEffect(() => {
//     const selectedMember = members.find((m) => m.id === selectedMemberId);
//     if (selectedMember) {
//       dispatch(setUser(selectedMember.name)); // updates header globally
//     }
//   }, [selectedMemberId, members, dispatch]);

//   const currentMember = members.find((m) => m.id === selectedMemberId);

//   const stats = useMemo(() => {
//     if (!currentMember) return { active: 0, completed: 0, avgProgress: 0 };

//     const activeTasks = currentMember.tasks.filter((t) => !t.completed);
//     const completedTasks = currentMember.tasks.filter((t) => t.completed);
//     const avgProgress =
//       activeTasks.length > 0
//         ? activeTasks.reduce((sum, t) => sum + t.progress, 0) /
//           activeTasks.length
//         : 0;

//     return {
//       active: activeTasks.length,
//       completed: completedTasks.length,
//       avgProgress: Math.round(avgProgress),
//     };
//   }, [currentMember]);

//   return (
//     <div className="space-y-6">
//       {/* Member Selector */}
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">
//             Select Team Member
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <select
//             className="w-full border p-4 rounded-lg bg-background text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
//             value={selectedMemberId}
//             onChange={(e) => setSelectedMemberId(e.target.value)}
//           >
//             {members.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </CardContent>
//       </Card>

//       {!currentMember ? (
//         <div className="flex items-center justify-center min-h-[400px]">
//           <p className="text-muted-foreground">Member not found</p>
//         </div>
//       ) : (
//         <>
//           {/* Profile Card */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-start gap-4">
//                 <Avatar className="h-20 w-20">
//                   <AvatarImage
//                     src={currentMember.avatar}
//                     alt={currentMember.name}
//                   />
//                   <AvatarFallback>
//                     {currentMember.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <CardTitle className="text-2xl">
//                     {currentMember.name}
//                   </CardTitle>
//                   <CardDescription className="text-base">
//                     {currentMember.email}
//                   </CardDescription>
//                   <div className="mt-2">
//                     <StatusBadge status={currentMember.status} />
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
//           </Card>

//           {/* Stats */}
//           <div className="grid gap-4 md:grid-cols-3">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Active Tasks
//                 </CardTitle>
//                 <Circle className="h-4 w-4 text-primary" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.active}</div>
//                 <p className="text-xs text-muted-foreground">In progress</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Completed</CardTitle>
//                 <CheckCircle2 className="h-4 w-4 text-success" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.completed}</div>
//                 <p className="text-xs text-muted-foreground">Tasks finished</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Avg Progress
//                 </CardTitle>
//                 <TrendingUp className="h-4 w-4 text-info" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.avgProgress}%</div>
//                 <p className="text-xs text-muted-foreground">Of active tasks</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Status and Tasks */}
//           <div className="grid gap-6 lg:grid-cols-3">
//             <div>
//               <StatusSelector
//                 currentStatus={currentMember.status}
//                 onStatusChange={(status) =>
//                   dispatch(
//                     updateMemberStatus({ memberId: currentMember.id, status })
//                   )
//                 }
//               />
//             </div>
//             <div className="lg:col-span-2">
//               <TaskList
//                 tasks={currentMember.tasks}
//                 memberId={currentMember.id}
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TeamMemberView;

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { updateMemberStatus } from "@/redux/slices/membersSlice";
// import { setUser } from "@/redux/slices/roleSlice";
// import StatusSelector from "./StatusSelector";
// import TaskList from "./TaskList";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import StatusBadge from "./StatusBadge";
// import { CheckCircle2, TrendingUp, Loader2 } from "lucide-react";
// import { useMemo, useState, useEffect } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Cell,
// } from "recharts";

// const TeamMemberView = () => {
//   const dispatch = useAppDispatch();
//   const { members } = useAppSelector((state) => state.members);

//   const [selectedMemberId, setSelectedMemberId] = useState<string>(
//     members.length > 0 ? members[0].id : ""
//   );

//   useEffect(() => {
//     const selectedMember = members.find((m) => m.id === selectedMemberId);
//     if (selectedMember) {
//       dispatch(setUser(selectedMember.name));
//     }
//   }, [selectedMemberId, members, dispatch]);

//   const currentMember = members.find((m) => m.id === selectedMemberId);

//   const stats = useMemo(() => {
//     if (!currentMember) return { total: 0, active: 0, completed: 0 };

//     const activeTasks = currentMember.tasks.filter((t) => !t.completed);
//     const completedTasks = currentMember.tasks.filter((t) => t.completed);

//     return {
//       total: currentMember.tasks.length,
//       active: activeTasks.length,
//       completed: completedTasks.length,
//     };
//   }, [currentMember]);

//   // Prepare chart data
//   const chartData = useMemo(() => {
//     if (!currentMember) return [];
//     return currentMember.tasks.map((task) => ({
//       name: task.title,
//       completion: task.completed ? 100 : task.progress || 0,
//       isCompleted: task.completed,
//     }));
//   }, [currentMember]);

//   // Detect dark mode for theme-aware chart
//   const isDarkMode = document.documentElement.classList.contains("dark");
//   const textColor = isDarkMode ? "#F3F4F6" : "#111827"; // axis text
//   const gridColor = isDarkMode ? "#374151" : "#E5E7EB"; // grid lines
//   const tooltipBg = isDarkMode ? "#1F2937" : "#F9FAFB"; // tooltip background
//   const tooltipText = isDarkMode ? "#F3F4F6" : "#111827"; // tooltip text

//   return (
//     <div className="space-y-8">
//       {/* Member Selector */}
//       <Card className="w-full shadow-md rounded-xl border border-gray-700 dark:border-gray-600 bg-gray-100 dark:bg-gray-900">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//             Select Team Member
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <select
//             className="w-full border p-4 rounded-lg bg-background text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100"
//             value={selectedMemberId}
//             onChange={(e) => setSelectedMemberId(e.target.value)}
//           >
//             {members.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </CardContent>
//       </Card>

//       {!currentMember ? (
//         <div className="flex items-center justify-center min-h-[400px]">
//           <p className="text-muted-foreground dark:text-gray-400">Member not found</p>
//         </div>
//       ) : (
//         <>
//           {/* Profile Card */}
//           <Card className="shadow-md rounded-xl border border-gray-700 dark:border-gray-600 bg-gray-100 dark:bg-gray-900">
//             <CardHeader>
//               <div className="flex items-start gap-4">
//                 <Avatar className="h-20 w-20">
//                   <AvatarImage
//                     src={currentMember.avatar}
//                     alt={currentMember.name}
//                   />
//                   <AvatarFallback>
//                     {currentMember.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">{currentMember.name}</CardTitle>
//                   <CardDescription className="text-base text-gray-700 dark:text-gray-300">
//                     {currentMember.email}
//                   </CardDescription>
//                   <div className="mt-2">
//                     <StatusBadge status={currentMember.status} />
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
//           </Card>

//           {/* Stats Cards */}
//           <div className="grid gap-6 md:grid-cols-3">
//             {/* Total Tasks */}
//             <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
//               <CardHeader className="flex items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Tasks</CardTitle>
//                 <TrendingUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
//               </CardHeader>
//               <CardContent className="pt-1">
//                 <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</div>
//                 <p className="text-xs text-gray-600 dark:text-gray-400">All tasks</p>
//               </CardContent>
//             </Card>

//             {/* Active Tasks */}
//             <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-blue-200 dark:border-blue-600">
//               <CardHeader className="flex items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Tasks</CardTitle>
//                 <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
//               </CardHeader>
//               <CardContent className="pt-1">
//                 <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.active}</div>
//                 <p className="text-xs text-gray-600 dark:text-gray-400">Work in progress</p>
//               </CardContent>
//             </Card>

//             {/* Completed Tasks */}
//             <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-green-200 dark:border-green-600">
//               <CardHeader className="flex items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Completed Tasks</CardTitle>
//                 <CheckCircle2 className="h-6 w-6 text-green-500" />
//               </CardHeader>
//               <CardContent className="pt-1">
//                 <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completed}</div>
//                 <p className="text-xs text-gray-600 dark:text-gray-400">Tasks finished</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Task Progress Chart */}
//           <Card className="w-full shadow-md rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                 Your Task Process
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-2">
//               <div style={{ width: "100%", height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={chartData}
//                     margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
//                     <XAxis
//                       dataKey="name"
//                       angle={-30}
//                       textAnchor="end"
//                       height={80}
//                       interval={0}
//                       tick={{ fill: textColor, fontSize: 14, fontWeight: 500 }}
//                     />
//                     <YAxis
//                       tick={{ fill: textColor, fontSize: 14 }}
//                       unit="%"
//                       domain={[0, 100]}
//                     />
//                     <Tooltip
//                       formatter={(value: number) => `${value}%`}
//                       contentStyle={{
//                         backgroundColor: tooltipBg,
//                         color: tooltipText,
//                         borderRadius: 6,
//                       }}
//                     />
//                     <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={entry.isCompleted ? "#10B981" : "#3B82F6"}
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Status and Task List */}
//           <div className="grid gap-6 lg:grid-cols-3">
//             <div>
//               <StatusSelector
//                 currentStatus={currentMember.status}
//                 onStatusChange={(status) =>
//                   dispatch(
//                     updateMemberStatus({ memberId: currentMember.id, status })
//                   )
//                 }
//               />
//             </div>
//             <div className="lg:col-span-2">
//               <TaskList tasks={currentMember.tasks} memberId={currentMember.id} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TeamMemberView;

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateMemberStatus } from "@/redux/slices/membersSlice";
import { setUser } from "@/redux/slices/roleSlice";
import StatusSelector from "./StatusSelector";
import TaskList from "./TaskList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import StatusBadge from "./StatusBadge";
import { CheckCircle2, TrendingUp, Loader2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const TeamMemberView = () => {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state) => state.members);

  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    members.length > 0 ? members[0].id : ""
  );

  useEffect(() => {
    const selectedMember = members.find((m) => m.id === selectedMemberId);
    if (selectedMember) {
      dispatch(setUser(selectedMember.name));
    }
  }, [selectedMemberId, members, dispatch]);

  const currentMember = members.find((m) => m.id === selectedMemberId);

  const stats = useMemo(() => {
    if (!currentMember) return { total: 0, active: 0, completed: 0 };

    const activeTasks = currentMember.tasks.filter((t) => !t.completed);
    const completedTasks = currentMember.tasks.filter((t) => t.completed);

    return {
      total: currentMember.tasks.length,
      active: activeTasks.length,
      completed: completedTasks.length,
    };
  }, [currentMember]);

  // Chart data
  const chartData = useMemo(() => {
    if (!currentMember) return [];
    return currentMember.tasks.map((task) => ({
      name: task.title,
      completion: task.completed ? 100 : task.progress || 0,
      isCompleted: task.completed,
    }));
  }, [currentMember]);

  // Theme-aware colors
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#F3F4F6" : "#111827";
  const gridColor = isDarkMode ? "#374151" : "#E5E7EB";
  const tooltipBg = isDarkMode ? "#1F2937" : "#F9FAFB";
  const tooltipText = isDarkMode ? "#F3F4F6" : "#111827";

  return (
    <div className="space-y-8">
      {/* Member Selector */}
      <Card className="w-full shadow-md rounded-xl border border-gray-700 dark:border-gray-600 bg-gray-100 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Select Team Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <select
            className="w-full border p-4 rounded-lg bg-background text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100"
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* If no member selected */}
      {!currentMember ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground dark:text-gray-400">
            Member not found
          </p>
        </div>
      ) : (
        <>
          {/* 1️⃣ PROFILE CARD */}
          <Card className="shadow-md rounded-xl border border-gray-700 dark:border-gray-600 bg-gray-100 dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={currentMember.avatar}
                    alt={currentMember.name}
                  />
                  <AvatarFallback>
                    {currentMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                    {currentMember.name}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {currentMember.email}
                  </CardDescription>

                  <div className="mt-2">
                    <StatusBadge status={currentMember.status} />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 2️⃣ YOUR STATUS SECTION (Clean, full width, theme-matched) */}
          {/* <div className="mt-6 w-full rounded-xl p-6 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#1E293B] shadow-lg border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Your Status
            </h2>
            <StatusSelector
              currentStatus={currentMember.status}
              onStatusChange={(status) =>
                dispatch(
                  updateMemberStatus({
                    memberId: currentMember.id,
                    status,
                  })
                )
              }
            />
          </div> */}

          <StatusSelector
            currentStatus={currentMember.status}
            onStatusChange={(status) =>
              dispatch(
                updateMemberStatus({
                  memberId: currentMember.id,
                  status,
                })
              )
            }
          />
          
          {/* 3️⃣ STATS CARDS */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            {/* Total Tasks */}
            <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Total Tasks
                </CardTitle>
                <TrendingUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </CardHeader>
              <CardContent className="pt-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.total}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  All tasks
                </p>
              </CardContent>
            </Card>

            {/* Active Tasks */}
            <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-blue-200 dark:border-blue-600">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Active Tasks
                </CardTitle>
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
              </CardHeader>
              <CardContent className="pt-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.active}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Work in progress
                </p>
              </CardContent>
            </Card>

            {/* Completed Tasks */}
            <Card className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-green-200 dark:border-green-600">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Completed Tasks
                </CardTitle>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent className="pt-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.completed}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Tasks finished
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 4️⃣ TASK PROGRESS CHART */}
          <Card className="w-full mt-6 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Task Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis
                      dataKey="name"
                      angle={-30}
                      textAnchor="end"
                      height={80}
                      interval={0}
                      tick={{
                        fill: textColor,
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    />
                    <YAxis
                      tick={{ fill: textColor, fontSize: 14 }}
                      unit="%"
                      domain={[0, 100]}
                    />
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        color: tooltipText,
                        borderRadius: 6,
                      }}
                    />
                    <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isCompleted ? "#10B981" : "#3B82F6"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 5️⃣ TASK LIST */}
          <div className="mt-6">
            <TaskList tasks={currentMember.tasks} memberId={currentMember.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default TeamMemberView;
