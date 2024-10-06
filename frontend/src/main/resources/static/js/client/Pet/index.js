import { $CheckLogin } from "../CheckLogin.js";
import { $UserNavButton } from "../UserNavButton.js";
import { $ShowAddedService } from "../ShowAddedService.js";
import { $AddAppointment } from "../Appointment/AddAppointment.js";
import { $ModalToggle } from "../Modal.js";
import { $PetScript } from "./PetScript.js";
import { $addHeader } from "../Header.js"

$addHeader();
$CheckLogin();
$ModalToggle();
$UserNavButton();
$ShowAddedService();
$AddAppointment();
$PetScript();

