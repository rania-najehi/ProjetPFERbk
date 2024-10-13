// src/components/ErrorBoundary.jsx
import React, { useState } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <h1 className="not-found-header">Something went wrong!</h1>
          <p className="not-found-message">
            We are working on fixing the issue.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
