import { apiUrl } from "../../apiUrl.js";

const rankingOption = [
    {
        rank: 1,
        color: "#ffc033"
    },
    {
        rank: 2,
        color: "#b4b4b4"
    },
    {
        rank: 3,
        color: "#ad731a"
    },
    {
        rank: 4,
        color: "#505050"
    },

]

export const createTopService = (type) => {
    $.ajax({
        url: `${apiUrl}/api/analysis/topService?type=${type}`,
        method: "GET",
        success: (data) => {
            $("#list-top-service").empty();
            data.forEach((d, index) => {
                const {name, count} = d;
                $("#list-top-service").append(`
                    <div class="bg-green-50 flex justify-between h-12 rounded-lg">
                        <div class="flex items-center">
                            <p
                                class="h-10 w-10 bg-[${rankingOption[index].color}] p-2 text-center rounded-lg font-bold text-white"
                            >
                                ${index+1}
                            </p>
                            <p class="text-center p-3">${name}</p>
                        </div>
                        <p class="text-center p-3 font-bold">${count}</p>
                    </div>
                `)
            });
        }
    })
}

export const createTopCustomer = (type) => {
    $.ajax({
        url: `${apiUrl}/api/analysis/topCustomer?type=${type}`,
        method: "GET",
        success: (data) => {
            $("#list-top-customer").empty();
            data.forEach((d, index) => {
                const {name, count} = d;
                $("#list-top-customer").append(`
                    <div class="bg-green-50 flex justify-between h-12 rounded-lg">
                        <div class="flex items-center">
                            <p
                                class="h-10 w-10 bg-[${rankingOption[index].color}] p-2 text-center rounded-lg font-bold text-white"
                            >
                                ${index+1}
                            </p>
                            <p class="text-center p-3">${name}</p>
                        </div>
                        <p class="text-center p-3 font-bold">${count}</p>
                    </div>
                `)
            });
        }
    })
}