import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/ui/accordion';
const SeedGrid = ({ words }) => {
    return (_jsx(Accordion, { type: "single", collapsible: true, children: _jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { className: "flex justify-center text-white", children: "show seed phrase" }), _jsx(AccordionContent, { children: _jsx("div", { className: "grid grid-cols-3 gap-4 blur-lg   hover:blur-none brightness-150", children: words &&
                            words.map(word => (_jsx("div", { className: "border border-green-500 rounded-md text-white", children: _jsxs("div", { className: "mb-2 mt-2", children: [" ", word, " "] }) }))) }) })] }) }));
};
export default SeedGrid;
