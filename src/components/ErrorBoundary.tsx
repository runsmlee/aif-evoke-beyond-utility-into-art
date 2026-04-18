import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorKey: number;
}

const MAX_RETRIES = 3;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryCount = 0;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorKey: 0 };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorKey: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRetry = (): void => {
    this.retryCount += 1;
    this.setState((prev) => ({
      hasError: false,
      errorKey: prev.errorKey + 1,
    }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      const canRetry = this.retryCount < MAX_RETRIES;
      return (
        <div
          className="flex items-center justify-center min-h-[200px] p-8"
          role="alert"
        >
          <div className="text-center">
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              Something went wrong loading this section.
            </p>
            {canRetry ? (
              <button
                type="button"
                onClick={this.handleRetry}
                className="mt-3 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-2"
              >
                Try again
              </button>
            ) : (
              <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
                Please refresh the page to try again.
              </p>
            )}
          </div>
        </div>
      );
    }

    // Use errorKey as key to force remount of children after retry
    return (
      <div key={this.state.errorKey}>
        {this.props.children}
      </div>
    );
  }
}
