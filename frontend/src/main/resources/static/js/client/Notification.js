import { itemNotification } from "../admin/Sidebar.js";
import { loadCurrentAppointments } from "./Appointment/AppointmentScript.js";

const customer = JSON.parse(localStorage.getItem("customer"));

const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:8908/zpet-notification",
  debug: function (str) {
    console.log(str);
  },
});

stompClient.onConnect = (frame) => {
  console.log("Connected: " + frame);
  stompClient.subscribe(`/apm/update/${customer.id}`, (response) => {
    console.log(JSON.parse(response.body));
    var { title, content, apmId } = JSON.parse(response.body);
    console.log(title, content);
    $("#noti-new-indicator").addClass("absolute").removeClass("hidden");
    $("#noti-list").prepend(itemNotification(title, content, apmId));
    $("#noti-empty").remove();
    let customer = localStorage.getItem("customer");
    loadCurrentAppointments(customer);
    loadAppointment(customer);
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
    if (customer) {
      connect();
    }
  });
};
