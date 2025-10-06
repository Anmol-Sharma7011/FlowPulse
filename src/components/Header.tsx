// import { Moon, Sun, UserCog, User } from 'lucide-react';
// import { Button } from './ui/button';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { switchRole } from '@/redux/slices/roleSlice';
// import { toggleTheme } from '@/redux/slices/themeSlice';

// const Header = () => {
//   const dispatch = useAppDispatch();
//   const { currentRole, currentUser } = useAppSelector((state) => state.role);
//   const { mode } = useAppSelector((state) => state.theme);

//   const handleRoleToggle = () => {
//     dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'));
//   };

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/80">
//       <div className="container flex h-20 items-center justify-between px-4 sm:px-6">
//         {/* Logo and Title */}
//         <div className="flex items-center gap-3">
//           <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow overflow-hidden">
//             <svg className="h-8 w-8 text-white animate-flow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M6 4V12L10 8L14 12L18 8L22 12V4M6 20H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M6 16L10 12L14 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
//             </svg>
//             <div className="absolute inset-0 bg-gradient-primary opacity-50 blur-lg"></div>
//           </div>
//           <div>
//             <h1 className="text-2xl font-heading font-black bg-gradient-primary bg-clip-text text-transparent">FlowPulse</h1>
//             <p className="text-xs font-medium text-muted-foreground">Empower your team's flow</p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3">
//           {/* User Info */}
//           <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
//             <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
//               {currentRole === 'lead' ? (
//                 <UserCog className="h-4 w-4 text-white" />
//               ) : (
//                 <User className="h-4 w-4 text-white" />
//               )}
//             </div>
//             <div className="text-sm">
//               <p className="font-semibold">{currentUser}</p>
//               <p className="text-xs text-muted-foreground capitalize">{currentRole}</p>
//             </div>
//           </div>

//           {/* Theme Toggle */}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleThemeToggle}
//             className="gap-2 rounded-lg border-border/50 hover:bg-muted/50 backdrop-blur-sm transition-all hover:shadow-md font-medium"
//           >
//             {mode === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
//             <span className="hidden sm:inline">{mode === 'light' ? 'Dark' : 'Light'}</span>
//           </Button>

//           {/* Role Toggle */}
//           <Button
//             onClick={handleRoleToggle}
//             className="gap-2 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
//             variant={currentRole === 'lead' ? 'default' : 'secondary'}
//           >
//             {currentRole === 'lead' ? (
//               <>
//                 <UserCog className="h-4 w-4" />
//                 <span className="hidden sm:inline">Team Lead</span>
//               </>
//             ) : (
//               <>
//                 <User className="h-4 w-4" />
//                 <span className="hidden sm:inline">Team Member</span>
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Moon, Sun, UserCog, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { switchRole } from "@/redux/slices/roleSlice";
import { toggleTheme } from "@/redux/slices/themeSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { currentRole, currentUser } = useAppSelector((state) => state.role);
  const { mode } = useAppSelector((state) => state.theme);

  const handleRoleToggle = () => {
    dispatch(switchRole(currentRole === "lead" ? "member" : "lead"));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow overflow-hidden">
            <svg
              className="h-8 w-8 text-white animate-flow"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4V12L10 8L14 12L18 8L22 12V4M6 20H18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 16L10 12L14 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-primary opacity-50 blur-lg"></div>
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black bg-gradient-primary bg-clip-text text-transparent">
              FlowPulse
            </h1>
            <p className="text-xs font-medium text-muted-foreground">
              Empower your team's flow
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
              {currentRole === "lead" ? (
                <UserCog className="h-4 w-4 text-white" />
              ) : (
                <User className="h-4 w-4 text-white" />
              )}
            </div>
            <div className="text-sm">
              {currentRole === "lead" ? (
                <p className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  Tech Lead
                </p>
              ) : (
                <>
                  <p className="font-semibold">{currentUser}</p>
                  <p className="text-xs font-semibold bg-gradient-primary bg-clip-text text-transparent">
                    Team Member
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleThemeToggle}
            className="
    flex items-center gap-2
    rounded-lg
    border border-border/50
    font-medium
    p-2
    transition-all duration-200
    hover:shadow-md
    hover:bg-gray-200 dark:hover:bg-gray-700
    hover:scale-105
    active:scale-95
  "
          >
            {mode === "light" ? (
              <Moon className="h-4 w-4 text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white" />
            ) : (
              <Sun className="h-4 w-4 text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white" />
            )}
            <span className="hidden sm:inline text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {mode === "light" ? "Dark" : "Light"}
            </span>
          </Button>

          <Button
            onClick={handleRoleToggle}
            className="
    rounded-lg 
    shadow-md 
    transition-all 
    hover:shadow-lg 
    hover:bg-gray-300 dark:hover:bg-gray-700
    flex items-center justify-center
    p-2
  "
            variant={currentRole === "lead" ? "default" : "secondary"}
          >
            {currentRole === "lead" ? (
              <UserCog className="h-4 w-4 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" />
            ) : (
              <User className="h-4 w-4 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
