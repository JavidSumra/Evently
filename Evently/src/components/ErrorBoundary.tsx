import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}
interface Props {
  children?: ReactNode;
}
class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("ErrorBoundary caught an Error:", error, errorInfo);
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return <div>Something went Wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
