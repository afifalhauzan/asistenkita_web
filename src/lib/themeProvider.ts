import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    button: {
        color: {
            primary: "bg-blue-500 hover:bg-blue-600 text-gray-50",
            secondary: "bg-slate-500 hover:bg-slate-400 text-gray-50",
        },
        size: {
            lg: "px-6 py-3 text-lg",
        },
        text: {
            primary: "text-white",
            secondary: "text-gray-800",
        },
    },
    modal: {
        content: {
            base: 'relative rounded-2xl h-full w-full p-4 md:h-auto text-gray-900',
            inner: 'relative rounded-2xl flex max-h-[90dvh] flex-col rounded-lg bg-gray-50 shadow-lg', // Applied bg-gray-50 and rounded-lg here
        },
        header: {
            base: 'flex items-center justify-center bg-gray-50 p-4',
            title: 'text-xl font-semibold text-gray-900',
        },
        body: {
            base: 'p-6 text-center bg-gray-50 flex-grow',
            title: 'text-lg font-medium text-gray-900',
        },
        footer: {
            base: 'flex items-center justify-center space-x-2 p-6 bg-gray-50',
        },
    },
});