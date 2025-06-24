import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Input, Modal, Layout, Header, Sidebar, Main, Footer, Container, Grid, GridItem, ThemeProvider, useModal, } from '../components';
import { Search, User, Bell, Menu } from 'lucide-react';
const TestPage = () => {
    const [theme, setTheme] = useState('light');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const modal = useModal();
    const formModal = useModal();
    // 表单数据
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    // 主题切换
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    // 表单验证
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const handleInputChange = (value) => {
        setInputValue(value);
        if (value && !validateEmail(value)) {
            setInputError('请输入有效的邮箱地址');
        }
        else {
            setInputError('');
        }
    };
    const handleFormSubmit = () => {
        if (!formData.username || !formData.email || !formData.password) {
            alert('请填写所有必填字段');
            return;
        }
        if (!validateEmail(formData.email)) {
            alert('请输入有效的邮箱地址');
            return;
        }
        alert('表单提交成功！');
        formModal.close();
        setFormData({ username: '', email: '', password: '' });
    };
    return (_jsx(ThemeProvider, { children: _jsxs(Layout, { minHeight: "100vh", children: [_jsxs(Header, { sticky: true, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSidebarCollapsed(!sidebarCollapsed), children: _jsx(Menu, { size: 20 }) }), _jsx("h1", { style: { margin: 0, fontSize: '20px', fontWeight: '600' }, children: "FlowCraft \u7EC4\u4EF6\u6D4B\u8BD5" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: toggleTheme, children: [theme === 'light' ? '🌙' : '☀️', " ", theme === 'light' ? '暗色' : '亮色'] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Bell, { size: 20 }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(User, { size: 20 }) })] })] }), _jsxs("div", { style: { display: 'flex', flex: 1, overflow: 'hidden' }, children: [_jsx(Sidebar, { width: 280, collapsible: true, collapsed: sidebarCollapsed, background: "secondary", children: _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { style: {
                                            margin: '0 0 16px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#6b7280'
                                        }, children: "\u7EC4\u4EF6\u6D4B\u8BD5" }), _jsxs("nav", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("a", { href: "#buttons", style: {
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    textDecoration: 'none',
                                                    color: '#3b82f6',
                                                    backgroundColor: '#eff6ff'
                                                }, children: !sidebarCollapsed && '按钮组件' }), _jsx("a", { href: "#inputs", style: {
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    textDecoration: 'none',
                                                    color: '#6b7280'
                                                }, children: !sidebarCollapsed && '输入框组件' }), _jsx("a", { href: "#modals", style: {
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    textDecoration: 'none',
                                                    color: '#6b7280'
                                                }, children: !sidebarCollapsed && '模态框组件' }), _jsx("a", { href: "#layout", style: {
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    textDecoration: 'none',
                                                    color: '#6b7280'
                                                }, children: !sidebarCollapsed && '布局组件' })] })] }) }), _jsx(Main, { background: "secondary", children: _jsxs(Container, { size: "full", padding: "lg", children: [_jsxs("section", { id: "buttons", style: { marginBottom: '48px' }, children: [_jsx("h2", { children: "\uD83D\uDD18 Button \u7EC4\u4EF6\u6D4B\u8BD5" }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { children: "\u53D8\u4F53\u6D4B\u8BD5" }), _jsxs("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "primary", children: "Primary" }), _jsx(Button, { variant: "secondary", children: "Secondary" }), _jsx(Button, { variant: "outline", children: "Outline" }), _jsx(Button, { variant: "ghost", children: "Ghost" }), _jsx(Button, { variant: "danger", children: "Danger" })] })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { children: "\u5C3A\u5BF8\u6D4B\u8BD5" }), _jsxs("div", { style: { display: 'flex', gap: '12px', alignItems: 'center' }, children: [_jsx(Button, { size: "sm", children: "Small" }), _jsx(Button, { size: "md", children: "Medium" }), _jsx(Button, { size: "lg", children: "Large" })] })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { children: "\u72B6\u6001\u6D4B\u8BD5" }), _jsxs("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: [_jsx(Button, { children: "Normal" }), _jsx(Button, { loading: true, children: "Loading" }), _jsx(Button, { disabled: true, children: "Disabled" }), _jsx(Button, { leftIcon: _jsx(User, { size: 16 }), children: "With Icon" })] })] })] }), _jsxs("section", { id: "inputs", style: { marginBottom: '48px' }, children: [_jsx("h2", { children: "\uD83D\uDCDD Input \u7EC4\u4EF6\u6D4B\u8BD5" }), _jsxs(Grid, { columns: 2, gap: "lg", children: [_jsx(GridItem, { children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Input, { label: "\u57FA\u7840\u8F93\u5165\u6846", placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9..." }), _jsx(Input, { label: "\u5E26\u56FE\u6807\u8F93\u5165\u6846", placeholder: "\u641C\u7D22...", leftIcon: _jsx(Search, { size: 16 }) }), _jsx(Input, { label: "\u90AE\u7BB1\u9A8C\u8BC1", type: "email", placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1", value: inputValue, onChange: (e) => handleInputChange(e.target.value), errorMessage: inputError, successMessage: inputValue && !inputError ? '邮箱格式正确' : undefined }), _jsx(Input, { label: "\u5BC6\u7801\u8F93\u5165", type: "password", placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", leftIcon: _jsx(User, { size: 16 }) })] }) }), _jsx(GridItem, { children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Input, { label: "\u53EF\u6E05\u9664\u8F93\u5165\u6846", placeholder: "\u53EF\u4EE5\u6E05\u9664\u5185\u5BB9", clearable: true, defaultValue: "\u53EF\u4EE5\u6E05\u9664\u7684\u5185\u5BB9" }), _jsx(Input, { label: "\u5B57\u7B26\u8BA1\u6570", placeholder: "\u6700\u591A100\u5B57\u7B26", maxLength: 100, showCount: true }), _jsx(Input, { label: "\u7981\u7528\u72B6\u6001", placeholder: "\u7981\u7528\u72B6\u6001", disabled: true, defaultValue: "\u4E0D\u53EF\u7F16\u8F91" }), _jsx(Input, { label: "\u63D2\u69FD\u529F\u80FD", placeholder: "domain", leftAddon: "https://", rightAddon: ".com" })] }) })] })] }), _jsxs("section", { id: "modals", style: { marginBottom: '48px' }, children: [_jsx("h2", { children: "\uD83D\uDD32 Modal \u7EC4\u4EF6\u6D4B\u8BD5" }), _jsxs("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: [_jsx(Button, { onClick: modal.open, children: "\u57FA\u7840\u6A21\u6001\u6846" }), _jsx(Button, { onClick: formModal.open, children: "\u8868\u5355\u6A21\u6001\u6846" })] }), _jsx(Modal, { isOpen: modal.isOpen, onClose: modal.close, title: "\u57FA\u7840\u6A21\u6001\u6846\u6D4B\u8BD5", size: "md", children: _jsxs("div", { children: [_jsx("p", { children: "\u8FD9\u662F\u4E00\u4E2A\u57FA\u7840\u7684\u6A21\u6001\u6846\u793A\u4F8B\u3002" }), _jsx("p", { children: "\u4F60\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u5173\u95ED\u6A21\u6001\u6846\uFF1A" }), _jsxs("ul", { children: [_jsx("li", { children: "\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u5173\u95ED\u6309\u94AE" }), _jsx("li", { children: "\u70B9\u51FB\u80CC\u666F\u906E\u7F69" }), _jsx("li", { children: "\u6309 ESC \u952E" })] }), _jsxs("div", { style: {
                                                                padding: '16px',
                                                                backgroundColor: '#f0fdf4',
                                                                borderRadius: '8px',
                                                                marginTop: '16px'
                                                            }, children: [_jsx("strong", { children: "\u6D4B\u8BD5\u8981\u70B9\uFF1A" }), _jsx("br", {}), "\u2705 \u52A8\u753B\u8FC7\u6E21\u6548\u679C", _jsx("br", {}), "\u2705 \u80CC\u666F\u6A21\u7CCA\u6548\u679C", _jsx("br", {}), "\u2705 \u952E\u76D8\u5BFC\u822A\u652F\u6301", _jsx("br", {}), "\u2705 \u54CD\u5E94\u5F0F\u8BBE\u8BA1"] })] }) }), _jsx(Modal, { isOpen: formModal.isOpen, onClose: formModal.close, title: "\u7528\u6237\u6CE8\u518C", size: "md", showFooter: true, confirmText: "\u6CE8\u518C", cancelText: "\u53D6\u6D88", onConfirm: handleFormSubmit, onCancel: formModal.close, children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Input, { label: "\u7528\u6237\u540D", placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", value: formData.username, onChange: (e) => setFormData(prev => ({ ...prev, username: e.target.value })), required: true }), _jsx(Input, { label: "\u90AE\u7BB1", type: "email", placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), required: true }), _jsx(Input, { label: "\u5BC6\u7801", type: "password", placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })), required: true })] }) })] }), _jsxs("section", { id: "layout", style: { marginBottom: '48px' }, children: [_jsx("h2", { children: "\uD83D\uDCD0 Layout \u7EC4\u4EF6\u6D4B\u8BD5" }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { children: "\u7F51\u683C\u7CFB\u7EDF\u6D4B\u8BD5" }), _jsx(Grid, { columns: 12, gap: "md", children: Array.from({ length: 12 }, (_, i) => (_jsx(GridItem, { span: 1, children: _jsx("div", { style: {
                                                                    padding: '8px',
                                                                    backgroundColor: '#eff6ff',
                                                                    borderRadius: '4px',
                                                                    textAlign: 'center',
                                                                    fontSize: '12px',
                                                                    color: '#3b82f6'
                                                                }, children: i + 1 }) }, i))) })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { children: "\u54CD\u5E94\u5F0F\u7F51\u683C\u6D4B\u8BD5" }), _jsxs(Grid, { columns: 3, gap: "lg", responsive: true, children: [_jsx(GridItem, { children: _jsxs("div", { style: {
                                                                        padding: '24px',
                                                                        backgroundColor: '#f0fdf4',
                                                                        borderRadius: '8px',
                                                                        textAlign: 'center'
                                                                    }, children: [_jsx("h4", { style: { margin: '0 0 8px' }, children: "\u5361\u7247 1" }), _jsx("p", { style: { margin: 0, fontSize: '14px', color: '#6b7280' }, children: "\u5728\u79FB\u52A8\u7AEF\u4F1A\u53D8\u6210\u5355\u5217\u5E03\u5C40" })] }) }), _jsx(GridItem, { children: _jsxs("div", { style: {
                                                                        padding: '24px',
                                                                        backgroundColor: '#fef3c7',
                                                                        borderRadius: '8px',
                                                                        textAlign: 'center'
                                                                    }, children: [_jsx("h4", { style: { margin: '0 0 8px' }, children: "\u5361\u7247 2" }), _jsx("p", { style: { margin: 0, fontSize: '14px', color: '#6b7280' }, children: "\u5C1D\u8BD5\u7F29\u653E\u6D4F\u89C8\u5668\u7A97\u53E3\u67E5\u770B\u6548\u679C" })] }) }), _jsx(GridItem, { children: _jsxs("div", { style: {
                                                                        padding: '24px',
                                                                        backgroundColor: '#fee2e2',
                                                                        borderRadius: '8px',
                                                                        textAlign: 'center'
                                                                    }, children: [_jsx("h4", { style: { margin: '0 0 8px' }, children: "\u5361\u7247 3" }), _jsx("p", { style: { margin: 0, fontSize: '14px', color: '#6b7280' }, children: "\u54CD\u5E94\u5F0F\u65AD\u70B9\uFF1A768px" })] }) })] })] })] }), _jsxs("section", { style: {
                                            padding: '24px',
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0'
                                        }, children: [_jsx("h2", { children: "\u2705 \u6D4B\u8BD5\u68C0\u67E5\u6E05\u5355" }), _jsxs(Grid, { columns: 2, gap: "lg", children: [_jsxs(GridItem, { children: [_jsx("h3", { children: "\u529F\u80FD\u6D4B\u8BD5" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '20px' }, children: [_jsx("li", { children: "\u2705 \u6309\u94AE\u70B9\u51FB\u54CD\u5E94" }), _jsx("li", { children: "\u2705 \u8F93\u5165\u6846\u5B9E\u65F6\u9A8C\u8BC1" }), _jsx("li", { children: "\u2705 \u6A21\u6001\u6846\u4EA4\u4E92" }), _jsx("li", { children: "\u2705 \u4FA7\u8FB9\u680F\u6298\u53E0" }), _jsx("li", { children: "\u2705 \u4E3B\u9898\u5207\u6362" }), _jsx("li", { children: "\u2705 \u8868\u5355\u63D0\u4EA4" })] })] }), _jsxs(GridItem, { children: [_jsx("h3", { children: "\u6837\u5F0F\u6D4B\u8BD5" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '20px' }, children: [_jsx("li", { children: "\u2705 \u54CD\u5E94\u5F0F\u5E03\u5C40" }), _jsx("li", { children: "\u2705 \u52A8\u753B\u8FC7\u6E21" }), _jsx("li", { children: "\u2705 \u4E3B\u9898\u8272\u5F69" }), _jsx("li", { children: "\u2705 \u5B57\u4F53\u6392\u7248" }), _jsx("li", { children: "\u2705 \u95F4\u8DDD\u7CFB\u7EDF" }), _jsx("li", { children: "\u2705 \u9634\u5F71\u6548\u679C" })] })] })] })] })] }) })] }), _jsx(Footer, { bordered: true, children: _jsxs("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: '#6b7280',
                            fontSize: '14px'
                        }, children: [_jsx("span", { children: "\u00A9 2024 FlowCraft. \u7EC4\u4EF6\u5E93\u6D4B\u8BD5\u9875\u9762" }), _jsxs("span", { children: ["\u5F53\u524D\u4E3B\u9898: ", theme] })] }) })] }) }));
};
export default TestPage;
