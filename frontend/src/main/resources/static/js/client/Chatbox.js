import { apiUrl } from "../apiUrl.js";

const chatbotDOM = () => {
    return `
        <button id="chatbot-btn" class="h-16 w-16 fixed bottom-8 right-8 z-40 hover:opacity-75 hover:scale-110 transition-all duration-300 ease">
            <div id="chatbot-tooltip" class="relative">
                <div class="absolute -top-12 -left-8 p-2 animate-bounce bg-white rounded-full shadow-xl w-24">
                    <p class="text-sm font-extrathin">Need help?</p>
                </div>
            </div>
            <img src="../../images/icons/favicon.ico" alt="" class="animate-pulse">
        </button>
        <div id="chatbot" class="w-screen h-screen fixed bottom-0 right-0 z-30 hidden">
            <div class="absolute top-4 right-4 w-1/4 h-[87%] bg-white rounded-md shadow-xl flex flex-col">
                <div id="chatbot-title" class="border-b-[1px] border-gray-200 flex items-center space-x-3 p-4">
                    <img src="../../images/icons/favicon.ico" alt="" class="h-8 w-8">
                    <p class="font-bold">Chatbot ZPet</p>
                </div>
                <div id="chatbot-chat-area" class="flex flex-col-reverse h-full w-full overflow-y-auto space-y-3 p-3">

                </div>
                <div id="chatbot-bottom" class="flex p-3">
                    <input type="text" id="chatbot-input" placeholder="Nhập câu hỏi của bạn..." class="border-[1px] border-gray-200 p-4 w-full rounded-md outline-none">
                    <button id="chatbot-send-btn" class="bg-green-500 text-white p-2 rounded-md ml-2 w-20 hover:opacity-75">Gửi</button>
                </div>
            </div>
        </div>
    `;
}

const customerMessage = (message) => {
    return `
        <div class="flex justify-end space-x-3 w-full h-fit m-2">
            <p class="bg-green-600 text-white rounded-lg p-2 max-w-[60%]">${message}</p>
            <img src="../../images/icons/favicon.ico" alt="" class="h-6 w-6">
        </div>
    `
}

const botMessage = (message) => {
    return `
        <div class="flex space-x-3 w-full h-fit m-2">
            <img src="../../images/icons/favicon.ico" alt="" class="h-6 w-6">
            <p class="bg-gray-100 text-gray-800 rounded-lg p-2 max-w-[60%]">${message}</p>
        </div>
    `
}

const botTyping = () => {
    return `
        <div id="chatbot-bot-typing"  class="flex space-x-3 w-full h-fit m-2">
            <img src="../../images/icons/favicon.ico" alt="" class="h-6 w-6">
            <div class="p-4 bg-gray-100 flex items-center justify-center space-x-1 w-16 rounded-full">
                <div class="rounded-full h-2 w-2 bg-gray-500 animate-bounce">&nbsp;</div>
                <div class="rounded-full h-2 w-2 bg-gray-500 animate-pulse">&nbsp;</div>
                <div class="rounded-full h-2 w-2 bg-gray-500 animate-bounce">&nbsp;</div>
            </div>
        </div>
    `
}

function fetchMessage(customerId){
    $.ajax({
        url: `${apiUrl}/api/chatbot/${customerId}`,
        method: "GET",
        async: false,
        success: function (response) {
            let conservation = response.response
            if (conservation.length > 0) {
                conservation.forEach(message => {
                    $("#chatbot-chat-area").prepend(message.fromCus ? customerMessage(message.content) : botMessage(message.content));
                });
            } else {
                $("#chatbot-chat-area").prepend(botMessage("Tôi là Bot hỗ trợ tự động của ZPet. Tôi có thể giúp gì cho bạn không?"))
            }
            
        }
    })
}

function generateBotMessage (customerId, message) {
    $.ajax({
        url: `${apiUrl}/api/chatbot/generate`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            customerId: customerId,
            prompt: message,
        }),
        dataType: "json",
        processData: false,
        type: "POST",
        async: false,
        success: function (response) {
            let botResponse = response.response;
            botResponse = botResponse.replace(/\*/g, ''); 
            $("#chatbot-chat-area").prepend(botMessage(botResponse));
            $("#chatbot-bot-typing").fadeOut("fast");
        },
        error: function (xhr, status, errorThrown) {
            console.error("Error:", status, errorThrown);
            $("#chatbot-chat-area").prepend(botMessage("Có vẻ đã xảy ra lỗi gì đó, xin hãy thử lại sau..."));
            $("#chatbot-bot-typing").fadeOut("fast");
        }
    })
}

function createMessage(customerId) {
    const message = $("#chatbot-input").val();
    $("#chatbot-chat-area").prepend(customerMessage(message));
    $("#chatbot-chat-area").prepend(botTyping());
    $("#chatbot-input").val("");
    setTimeout(() => {
        generateBotMessage(customerId, message);
    }, 500);
}

export const $Chatbot = () => {

    $(() => {

        const customer = JSON.parse(localStorage.getItem('customer'))
        
        if (!customer) return;
        
        const customerId = customer.id;   

        $("body").prepend(chatbotDOM)

        fetchMessage(customerId)

        $("#chatbot-btn").click(() => {
            $("#chatbot").toggle("hidden")
            $("#chatbot-overlay").toggle("hidden")
            $("#chatbot-tooltip").toggle("hidden")
        })

        $("#chatbot-input").keyup((event) => {
            if (event.keyCode === 13) {
                createMessage(customerId)
            }
        });

        $("#chatbot-send-btn").click(() => {
            createMessage(customerId)
        })

    })

}