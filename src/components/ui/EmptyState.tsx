import { Icon } from './Icon';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = 'SearchX', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 bg-planning-gray-100 rounded-xl flex items-center justify-center mb-4">
        <Icon name={icon} size={24} className="text-planning-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-planning-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-planning-gray-500 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
