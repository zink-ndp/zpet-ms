import { $appointmentUtils } from './AppointmentScript.js';
import { $CheckLogin } from '../CheckLogin.js';
import { $UserNavButton } from '../UserNavButton.js';
import { $ShowAddedService } from '../ShowAddedService.js';
import { $AddAppointment } from './AddAppointment.js';
import { $ModalToggle } from '../Modal.js';
import { $addHeader } from "../Header.js"
import { $DatePickerConfig } from "../../DatePickerConfig.js";

$addHeader();
$CheckLogin();
$ModalToggle();
$appointmentUtils();
$UserNavButton();
$ShowAddedService();
$AddAppointment();
$DatePickerConfig();
