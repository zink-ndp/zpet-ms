const customer = JSON.parse(localStorage.getItem("customer"));

const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:8908/zpet-notification",
  debug: function (str) {
    console.log(str);
  },
});

function showGreeting(message) {
  $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

stompClient.onConnect = (frame) => {
  console.log("Connected: " + frame);
  stompClient.subscribe(`/apm/greetings/${customer.id}`, (response) => {
    console.log(JSON.parse(response.body));
    showGreeting(JSON.parse(response.body).content);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

function connect() {
  stompClient.activate();
}

export function disconnect() {
  stompClient.deactivate();
  console.log("Disconnected");
}

export function sendMessage(destination, title, content, note, apmId) {
  stompClient.publish({
    destination: destination,
    body: JSON.stringify({ 
        title: title,
        content: content,
        note: note ? note : null,
        apmId: apmId,
    }),
  });
}

export const $Notification = () => {
  $(() => {
    if (customer){
        connect();
    }
  });
};
