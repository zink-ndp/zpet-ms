import { $CheckLogin } from "../CheckLogin.js";
import { $ServiceDetailUtils } from "./LoadServiceDetail.js";
import { $ShowAddedService } from "../ShowAddedService.js";
import { $ModalToggle } from "../../client/Modal.js";
import { $UserNavButton } from "../../client/UserNavButton.js";
import { $AddAppointment } from "../Appointment/AddAppointment.js";
import { $addHeader } from "../../client/Header.js";

$CheckLogin();
$addHeader();
$ServiceDetailUtils()
$ShowAddedService();
$ModalToggle();
$UserNavButton();
$AddAppointment();

$(() => {
    $("#loading-overlay").addClass("hidden")
})