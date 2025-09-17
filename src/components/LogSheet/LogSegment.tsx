import React from 'react';

type LogSegmentType = 'driving' | 'onDuty' | 'offDuty' | 'sleeper';

interface LogSegmentProps {
  type: LogSegmentType;
  isStart: boolean;
  isEnd: boolean;
  isContinuation: boolean;
}

const typeColors = {
  driving: 'bg-blue-500',
  onDuty: 'bg-green-500',
  offDuty: 'bg-gray-300',
  sleeper: 'bg-purple-500',
};

const LogSegment: React.FC<LogSegmentProps> = ({
  type,
  isStart,
  isEnd,
  isContinuation,
}) => {
  const getSegmentClasses = () => {
    const baseClasses = 'h-full w-full relative';
    const colorClass = typeColors[type];
    
    // Handle rounded corners for start/end of segments
    let roundedClasses = '';
    if (isStart && isEnd) {
      roundedClasses = 'rounded';
    } else if (isStart) {
      roundedClasses = 'rounded-l';
    } else if (isEnd) {
      roundedClasses = 'rounded-r';
    }
    
    // Add a subtle border for better visibility between segments
    const borderClass = isContinuation ? 'border-l border-white border-opacity-30' : '';
    
    return [
      baseClasses,
      colorClass,
      roundedClasses,
      borderClass,
      'transition-opacity hover:opacity-80',
    ].join(' ');
  };

  const getTitle = () => {
    const typeMap: Record<LogSegmentType, string> = {
      driving: 'Driving',
      onDuty: 'On Duty',
      offDuty: 'Off Duty',
      sleeper: 'Sleeper Berth',
    };
    
    return typeMap[type];
  };

  return (
    <div 
      className={getSegmentClasses()}
      title={getTitle()}
      data-type={type}
    >
      {isStart && (
        <span className="absolute -top-5 left-0 text-xs text-gray-500 truncate w-full px-1">
          {getTitle()}
        </span>
      )}
    </div>
  );
};

export default LogSegment;
