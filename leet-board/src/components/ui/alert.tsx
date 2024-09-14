import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon, XCircle, AlertTriangle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'destructive';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  onClose?: () => void;
}

interface AlertTitleProps {
  children: React.ReactNode;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  destructive: 'bg-red-100 border-red-400 text-red-900',
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  info: <InfoIcon className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  destructive: <AlertTriangle className="w-5 h-5" />,
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  onClose,
}) => {
  return (
    <div
      className={`${variantStyles[variant]} border rounded-md p-4 mb-4 flex items-start`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">{variantIcons[variant]}</div>
      <div className="flex-grow">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-500 focus:outline-none"
          aria-label="Close"
        >
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => {
  return <h3 className="font-semibold mb-1">{children}</h3>;
};

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};

export default Alert;