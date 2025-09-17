import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centerContent?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-6 sm:px-6',
  md: 'px-6 py-8 sm:px-8',
  lg: 'px-8 py-12 sm:px-12',
  xl: 'px-10 py-16 sm:px-16',
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  centerContent = false,
}) => {
  return (
    <div className={cn('w-full mx-auto', maxWidthClasses[maxWidth], className)}>
      <div
        className={cn(
          'w-full',
          paddingClasses[padding],
          centerContent && 'flex flex-col items-center text-center'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const PageHeader: React.FC<{
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}> = ({ title, description, actions, className }) => {
  return (
    <div className={cn('border-b border-gray-200 pb-6', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
        {actions && <div className="mt-4 sm:mt-0 sm:ml-4">{actions}</div>}
      </div>
    </div>
  );
};

export const PageContent: React.FC<{
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}> = ({ children, className, padding = 'md' }) => {
  const paddingMap = {
    none: '',
    sm: 'py-4',
    md: 'py-6',
    lg: 'py-8',
  };

  return (
    <div className={cn(paddingMap[padding], className)}>
      <div className="mx-auto">{children}</div>
    </div>
  );
};

export default PageContainer;
