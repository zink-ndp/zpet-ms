import { itemNotification } from "./Sidebar.js";
import { fetchUpcomingAppointment, showDefaultAppointment } from "./Appointment/AppointmentScript.js";

const staff = JSON.parse(localStorage.getItem("staff"));

const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:8908/zpet-notification",
  debug: function (str) {
    console.log(str);
  },
});

stompClient.onConnect = (frame) => {
  console.log("Connected: " + frame);
  stompClient.subscribe('/apm/news', function(messageOutput) {
    var {title, content, apmId } = JSON.parse(messageOutput.body);
    console.log(title, content);
    $("#noti-new-indicator").addClass('absolute').removeClass('hidden');
    $("#noti-list").prepend(itemNotification(title, content, apmId))
    $("#noti-empty").addClass("hidden")
    fetchUpcomingAppointment();
    showDefaultAppointment();
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