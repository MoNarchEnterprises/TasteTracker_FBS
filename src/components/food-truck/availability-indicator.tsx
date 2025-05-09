import type { AvailabilityStatus } from '@/types';
import { cn } from '@/lib/utils';

interface AvailabilityIndicatorProps {
  status: AvailabilityStatus;
  size?: 'sm' | 'md';
}

export function AvailabilityIndicator({ status, size = 'md' }: AvailabilityIndicatorProps) {
  const statusClasses = {
    available: 'bg-status-green',
    busy: 'bg-status-red',
    promotion: 'bg-status-yellow',
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
  };

  const statusText = {
    available: 'Available',
    busy: 'Busy',
    promotion: 'Promotion',
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={cn(
          'rounded-full',
          statusClasses[status],
          sizeClasses[size]
        )}
        aria-label={statusText[status]}
      />
      <span className={cn("text-xs capitalize", size === 'sm' ? 'hidden sm:inline' : 'inline')}>
        {statusText[status]}
      </span>
    </div>
  );
}
