import React, { Component, ErrorInfo } from "react"

interface Props {
}

interface State {
    hasError: boolean;
}

export default class FallbackErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    // TODO: Update boundary UI
    render() {
        return (
            <div>
                An unexpected Error has occured
            </div>
        )
    }
}
