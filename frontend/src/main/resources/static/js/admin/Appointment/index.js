import { createSidebar } from '../Sidebar.js'
import { $CheckLogin } from '../Login/CheckLogin.js'
import { $ModalToggle } from '../../client/Modal.js'
import { $Loading } from '../Loading.js'
import { $AppointmentUtils } from './AppointmentUtils.js'
import { $DatePickerConfig } from "../../DatePickerConfig.js";

$Loading()
$CheckLogin()
$ModalToggle()
createSidebar("appointment")
$AppointmentUtils()
$DatePickerConfig()