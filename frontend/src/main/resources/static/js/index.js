import { $ToggleHamburger } from "../js/client/script.js";
import { $CheckLogin } from "../js/client/CheckLogin.js";
import { $ShowService, addToAppointment } from "./client/ShowServices.js";
import { $ShowAddedService } from "./client/ShowAddedService.js";
import { $ModalToggle } from "./client/Modal.js";
import { $UserNavButton } from "./client/UserNavButton.js";
import { $AddAppointment } from "./client/Appointment/AddAppointment.js";
import { $addHeader } from "./client/Header.js";

$addHeader()
$ToggleHamburger();
$CheckLogin();
$ShowService();
$ShowAddedService();
$ModalToggle();
$UserNavButton();
$AddAppointment();

$(() => {
    $("#loading-overlay").addClass("hidden");
})
