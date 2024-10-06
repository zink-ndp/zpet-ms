import { $ShowAddedService } from "../ShowAddedService";
import { $UserNavButton } from "../UserNavButton.js";
import { $CheckLogin } from "../CheckLogin.js";
import { $ModalToggle } from "../Modal.js";
import { $AddAppointment } from "../Appointment/AddAppointment";

$CheckLogin()
$ShowAddedService();
$UserNavButton();
$ModalToggle();
$AddAppointment();
