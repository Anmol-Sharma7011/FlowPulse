import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetInactiveStatuses, updateActivity } from '@/redux/slices/membersSlice';
import Header from '@/components/Header';
import TeamLeadView from '@/components/TeamLeadView';
import TeamMemberView from '@/components/TeamMemberView';

const Index = () => {
  const dispatch = useAppDispatch();
  const { currentRole } = useAppSelector((state) => state.role);

  // Track user activity and reset inactive statuses
  useEffect(() => {
    const handleActivity = () => {
      dispatch(updateActivity());
    };

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Check for inactive users every minute
    const inactivityCheck = setInterval(() => {
      dispatch(resetInactiveStatuses());
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(inactivityCheck);
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentRole === 'lead' ? <TeamLeadView /> : <TeamMemberView />}
      </main>
    </div>
  );
};

export default Index;
