import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        console.error("Noevia Cafe crashed", error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-espresso-950 px-5 text-center">
                    <div className="max-w-lg">
                        <h1 className="font-display text-2xl text-cream">
                            Something went wrong
                        </h1>

                        <p className="mt-4 text-sm leading-relaxed text-latte-200/90">
                            {this.state.error.message ||
                                "An unexpected error occurred"}
                        </p>

                        <p className="mt-4 text-xs text-latte-300/60">
                            Check the browser console for the full error.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}