import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Status = "Working" | "Break" | "Meeting" | "Offline";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  completed: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: Status;
  tasks: Task[];
}

interface MembersState {
  members: Member[];
  lastActivity: number;
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    status: "Working",
    tasks: [
      {
        id: "t1",
        title: "Complete Dashboard UI",
        dueDate: "2025-10-10",
        progress: 70,
        completed: false,
      },
      {
        id: "t2",
        title: "Review Pull Requests",
        dueDate: "2025-10-08",
        progress: 100,
        completed: true,
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    status: "Meeting",
    tasks: [
      {
        id: "t3",
        title: "Client Presentation",
        dueDate: "2025-10-09",
        progress: 40,
        completed: false,
      },
    ],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    status: "Break",
    tasks: [
      {
        id: "t4",
        title: "API Integration",
        dueDate: "2025-10-12",
        progress: 30,
        completed: false,
      },
    ],
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "Working",
    tasks: [
      {
        id: "t5",
        title: "Database Optimization",
        dueDate: "2025-10-11",
        progress: 60,
        completed: false,
      },
    ],
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom.brown@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    status: "Offline",
    tasks: [
      {
        id: "t9",
        title: "CI/CD Optimization",
        dueDate: "2025-10-11",
        progress: 60,
        completed: false,
      },
    ],
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "Working",
    tasks: [
      {
        id: "t6",
        title: "Design System Update",
        dueDate: "2025-10-13",
        progress: 85,
        completed: false,
      },
    ],
  },
  {
    id: "7",
    name: "Alex Martinez",
    email: "alex.martinez@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    status: "Meeting",
    tasks: [
      {
        id: "t7",
        title: "Sprint Planning",
        dueDate: "2025-10-07",
        progress: 50,
        completed: false,
      },
    ],
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    status: "Break",
    tasks: [
      {
        id: "t8",
        title: "Code Review",
        dueDate: "2025-10-09",
        progress: 20,
        completed: false,
      },
    ],
  },
];

const initialState: MembersState = {
  members: initialMembers,
  lastActivity: Date.now(),
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    updateMemberStatus: (
      state,
      action: PayloadAction<{ memberId: string; status: Status }>
    ) => {
      const member = state.members.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) {
        member.status = action.payload.status;
        state.lastActivity = Date.now();
      }
    },
    addTask: (
      state,
      action: PayloadAction<{ memberId: string; task: Omit<Task, "id"> }>
    ) => {
      const member = state.members.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) {
        const newTask: Task = {
          ...action.payload.task,
          id: `t${Date.now()}`,
        };
        member.tasks.push(newTask);
      }
    },
    updateTaskProgress: (
      state,
      action: PayloadAction<{
        memberId: string;
        taskId: string;
        progress: number;
      }>
    ) => {
      const member = state.members.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) {
        const task = member.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, action.payload.progress));
          task.completed = task.progress === 100;
        }
      }
    },
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
    resetInactiveStatuses: (state) => {
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
      if (state.lastActivity < tenMinutesAgo) {
        state.members.forEach((member) => {
          if (member.status !== "Offline") {
            member.status = "Offline";
          }
        });
      }
    },
  },
});

export const {
  updateMemberStatus,
  addTask,
  updateTaskProgress,
  updateActivity,
  resetInactiveStatuses,
} = membersSlice.actions;
export default membersSlice.reducer;
