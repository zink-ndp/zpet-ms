import { $ToggleHamburger } from "../js/client/script.js";
import { $CheckLogin } from "../js/client/CheckLogin.js";
import { $ShowService } from "./client/ShowServices.js";
import { $ShowAddedService } from "./client/ShowAddedService.js";
import { $ModalToggle } from "./client/Modal.js";
import { $UserNavButton } from "./client/UserNavButton.js";
import { $AddAppointment } from "./client/Appointment/AddAppointment.js";
import { $addHeader } from "./client/Header.js";
import { $DatePickerConfig } from "./DatePickerConfig.js";
import { $Chatbot } from "./client/Chatbox.js";
import { $Notification, sendMessage } from "./client/Notification.js";

$addHeader();
$ToggleHamburger();
$CheckLogin();
$DatePickerConfig();
$ShowService();
$ShowAddedService();
$ModalToggle();
$Chatbot();
$UserNavButton();
$AddAppointment();
$Notification();

$(() => {
  $("#loading-overlay").addClass("hidden");
});
