// components/DailySchedule.tsx
import type { DailySchedule as DailyScheduleType } from '@/types';
import React from 'react';
import SpotlightCard from '@/components/SpotlightCard';

// Match the backend response type


interface DailyScheduleProps {
  daily_schedules: DailyScheduleType[];
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ daily_schedules }) => {
  return (

    <SpotlightCard className="custom-spotlight-card  w-full rounded-lg shadow-md p-6 lg:w-[50%] text-white" spotlightColor="rgba(0, 229, 255, 0.2)">


      <h2 className="text-xl font-semibold mb-4 ">Daily Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100/20 text-white rounded-2xl">
              <th className="py-2 px-4 text-left">Day</th>
              <th className="py-2 px-4 text-left">Driving</th>
              <th className="py-2 px-4 text-left">On Duty</th>
              <th className="py-2 px-4 text-left">Off Duty</th>
              <th className="py-2 px-4 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {daily_schedules.map(day => (
              <tr key={day.id} className="border-b border-gray-200">
                <td className="py-2 px-4">Day {day.day_number}</td>
                <td className="py-2 px-4">{day.driving_hours}h</td>
                <td className="py-2 px-4">{day.on_duty_hours}h</td>
                <td className="py-2 px-4">{day.off_duty_hours}h</td>
                <td className="py-2 px-4">{day.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </SpotlightCard>

  );
};

export default DailySchedule;
