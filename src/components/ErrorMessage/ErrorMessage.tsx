import React from "react";
import "./error-message.scss";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__icon">⚠️</div>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
