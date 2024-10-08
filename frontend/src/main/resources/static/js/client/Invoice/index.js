import { $InvoiceUtils } from "./InvoiceUtils.js";
import { $ShowAddedService } from "../ShowAddedService.js";
import { $UserNavButton } from "../UserNavButton.js";
import { $CheckLogin } from "../CheckLogin.js";
import { $ModalToggle } from "../Modal.js";
import { $AddAppointment } from "../Appointment/AddAppointment.js";
import { $addHeader } from "../Header.js";
import { PrintDialog } from "../../PrintDialog.js";

$addHeader();
$CheckLogin();
$ShowAddedService();
$UserNavButton();
$ModalToggle();
$AddAppointment();
$InvoiceUtils();

$(() => {

  $("#btn-print").click(() => {
    PrintDialog();
  });
});
