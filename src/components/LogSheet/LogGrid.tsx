import React from 'react';
import LogSegment from './LogSegment';
import type { LogSegment as LogSegmentType } from '../../types/trip';

interface LogGridProps {
  segments: LogSegmentType[];
  dayIndex: number;
}

const LogGrid: React.FC<LogGridProps> = ({ segments, dayIndex }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Create a mapping of hours to segments for easier rendering
  const hourSegments = Array(24).fill(null);
  
  segments.forEach(segment => {
    for (let i = 0; i < segment.duration; i++) {
      const hour = (segment.startHour + i) % 24;
      hourSegments[hour] = {
        ...segment,
        isStart: i === 0,
        isEnd: i === segment.duration - 1,
        isContinuation: i > 0,
      };
    }
  });

  return (
    <div className="contents">
      {hours.map((hour) => {
        const segment = hourSegments[hour];
        const key = `hour-${dayIndex}-${hour}`;
        
        if (!segment) {
          return (
            <div 
              key={key} 
              className="h-10 border-r border-gray-100 last:border-r-0"
              data-hour={hour}
            />
          );
        }

        return (
          <div key={key} className="h-10 border-r border-gray-100 last:border-r-0">
            <LogSegment
              type={segment.type}
              isStart={segment.isStart}
              isEnd={segment.isEnd}
              isContinuation={segment.isContinuation}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LogGrid;
