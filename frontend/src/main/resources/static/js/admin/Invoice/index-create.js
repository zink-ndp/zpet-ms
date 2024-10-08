import { $CheckLogin } from '../../admin/Login/CheckLogin.js'
import { createSidebar } from '../../admin/Sidebar.js'
import { $ModalToggle } from '../../client/Modal.js'
import { InvoiceCreateScript } from './InvoiceCreateScript.js'

$CheckLogin()
createSidebar("invoice")
$ModalToggle()
InvoiceCreateScript()