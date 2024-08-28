import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
export default function FullTextCard({ id, wallet }) {
    console.log(wallet, 'wallet');
    return (_jsxs(HoverCard, { children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { className: "text-white", variant: "link", children: id }) }), _jsx(HoverCardContent, { className: "w-100 bg-gray-700", children: _jsx("div", { className: "flex justify-between ", children: _jsxs("div", { className: "space-y-5 text-white", children: [_jsx("h3", { className: "text-sm font-semibold", children: id }), _jsx("p", { className: "text-sm break-words block", children: wallet })] }) }) })] }));
}
