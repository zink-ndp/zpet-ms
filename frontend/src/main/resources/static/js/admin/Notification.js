const staff = JSON.parse(localStorage.getItem("staff"));

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
  stompClient.subscribe('/apm/news', function(messageOutput) {
    var notification = JSON.parse(messageOutput.body);
    console.log(notification);
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

export function sendMessage(staffId, name) {
  stompClient.publish({
    destination: "/zpet-noti/new-apm",
    body: JSON.stringify({ 
        staffId: staffId,
        name: name
    }),
  });
}

export const $Notification = () => {
  $(() => {
    if (staff){
        connect();
    }
  });
};
