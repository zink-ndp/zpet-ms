export const Timeline = (title, subtitle, content ) => {
    return `
        <div
            class="flex items-center p-2 space-x-3 h-16 relative"
        >
            <div class="w-[2px] h-16 bg-gray-300 absolute left-[30px]"></div>
            <img
            src="./images/icons/favicon.ico"
            class="w-6 h-6 z-20"
            alt=""
            />
            <p class="font-bold text-green-500 text-sm whitespace-nowrap">${title}</p>
            <p class="text-gray-400">-</p>
            <p class="font-bold text-orange-500 text-sm whitespace-nowrap">${subtitle}</p>
            <p class="text-gray-400">-</p>
            <p class="text-gray-700 text-xs line-clamp-2">${content}</p>
        </div>
    `
}