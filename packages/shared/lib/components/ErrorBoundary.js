import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/shell/src/components/ErrorBoundary.tsx
import { Component } from 'react';
import { Button, Container } from '@flowcraft/shared';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import styles from './ErrorBoundary.module.scss';
class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
        };
        this.handleReload = () => {
            window.location.reload();
        };
        this.handleRetry = () => {
            this.setState({ hasError: false, error: undefined, errorInfo: undefined });
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Microfrontend Error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: styles.errorBoundary, children: _jsx(Container, { size: "md", centered: true, children: _jsxs("div", { className: styles.errorContent, children: [_jsx("div", { className: styles.errorIcon, children: _jsx(AlertTriangle, { size: 64 }) }), _jsx("h1", { className: styles.errorTitle, children: "\u51FA\u4E86\u70B9\u95EE\u9898" }), _jsx("p", { className: styles.errorMessage, children: "\u5FAE\u524D\u7AEF\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u8FD9\u53EF\u80FD\u662F\u7F51\u7EDC\u95EE\u9898\u6216\u6A21\u5757\u6682\u65F6\u4E0D\u53EF\u7528\u3002" }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("details", { className: styles.errorDetails, children: [_jsx("summary", { children: "\u9519\u8BEF\u8BE6\u60C5" }), _jsxs("pre", { className: styles.errorStack, children: [this.state.error.toString(), this.state.errorInfo?.componentStack] })] })), _jsxs("div", { className: styles.errorActions, children: [_jsx(Button, { variant: "outline", onClick: this.handleRetry, leftIcon: _jsx(RefreshCw, { size: 16 }), children: "\u91CD\u8BD5" }), _jsx(Button, { variant: "primary", onClick: this.handleReload, children: "\u5237\u65B0\u9875\u9762" })] })] }) }) }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
