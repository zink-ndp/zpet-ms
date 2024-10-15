import { $CheckLogin } from '../../admin/Login/CheckLogin.js'
import { createSidebar } from '../../admin/Sidebar.js'
import { $ModalToggle } from '../../client/Modal.js'
import { InvoiceCreateScript } from './InvoiceCreateScript.js'
import { $Loading } from "../Loading.js";

$CheckLogin()
createSidebar("invoice")
$ModalToggle()
$Loading()
InvoiceCreateScript()