// components/DailySchedule.tsx
import React from 'react';
import type { DailySchedule as DailyScheduleType } from '../../types';

interface DailyScheduleProps {
  daily_schedule: DailyScheduleType[];
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ daily_schedule }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 lg:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Daily Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Day</th>
              <th className="py-2 px-4 text-left">Driving</th>
              <th className="py-2 px-4 text-left">On Duty</th>
              <th className="py-2 px-4 text-left">Off Duty</th>
            </tr>
          </thead>
          <tbody>
            {daily_schedule.map(day => (
              <tr key={`${day.day_number}-${day.id}`} className="border-b border-gray-200">
                <td className="py-2 px-4">Day {day.day_number}</td>
                <td className="py-2 px-4">{day.driving_hours}h</td>
                <td className="py-2 px-4">{day.on_duty_hours}h</td>
                <td className="py-2 px-4">{day.off_duty_hours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DailySchedule;