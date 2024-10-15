import { $Loading } from '../../admin/Loading.js'
import { $CheckLogin } from '../../admin/Login/CheckLogin.js'
import { createSidebar } from '../../admin/Sidebar.js'
import { $ModalToggle } from '../../client/Modal.js'
import { $ServiceScript } from './ServiceScript.js'

$CheckLogin(1)
createSidebar("service")
$Loading()
$ModalToggle()
$ServiceScript()