import React, { ErrorInfo, ReactNode } from "react";

interface ErrorState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<unknown, ErrorState> {
  state: ErrorState = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): ReactNode {
    const { error, errorInfo } = this.state;

    if (errorInfo === null && error === null) {
      return this.props.children;
    }

    if (process.env.NODE_ENV === "production") {
      return (
        <div className="column-container">
          <h1>{"Something went wrong =)"}</h1>
          <button onClick={() => (window.location.href = "/")}>
            Try again
          </button>
        </div>
      );
    }

    return (
      <div className="column-container">
        <h1 style={{ color: "red" }}>It's a f****** bull***t !!!</h1>
        <div className="column-container">
          <div>{error?.toString()}</div>
          <div>{errorInfo?.componentStack}</div>
        </div>
      </div>
    );
  }
}
