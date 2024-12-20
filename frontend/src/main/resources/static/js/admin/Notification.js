import { itemNotification } from "./Sidebar.js";
import { fetchUpcomingAppointment, showDefaultAppointment } from "./Appointment/AppointmentScript.js";
import { renderCalendar } from "../CustomCalendar.js";

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
    $("#noti-empty").remove()
    renderCalendar();
    fetchUpcomingAppointment();
    showDefaultAppointment("0_1_2", (new Date().getMonth()+1), new Date().getFullYear())
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

export function sendMessage(destination, title, content, note, apmId, invId) {
  stompClient.publish({
    destination: destination,
    body: JSON.stringify({ 
        title: title,
        content: content,
        note: note ? note : null,
        apmId: apmId ? apmId : null,
        invId: invId ? invId : null
    }),
  });
}

export function clearNotification(id){
  $(`#noti-apm-${id}`).remove();
  $("#noti-new-indicator").addClass('hidden').removeClass('absolute');
  if ($("#noti-list").children().length == 0 ) {
    $("#noti-list").append(`
      <div id="noti-empty" class="w-full h-20 flex items-center justify-center">
        Không có thông báo mới
      </div>
    `)
  }
}

export const $Notification = () => {
  $(() => {
    if (staff){
        connect();
    }
  });
};
