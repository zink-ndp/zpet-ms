import { $CheckLogin } from '../../admin/Login/CheckLogin.js'
import { createSidebar } from '../../admin/Sidebar.js'
import { $ModalToggle } from '../../client/Modal.js'
import { InvoiceScript } from './InvoiceScript.js'

$CheckLogin()
createSidebar("invoice")
$ModalToggle()
InvoiceScript()