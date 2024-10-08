import { $Loading } from '../../admin/Loading.js'
import { $CheckLogin } from '../../admin/Login/CheckLogin.js'
import { createSidebar } from '../../admin/Sidebar.js'
import { $ModalToggle } from '../../client/Modal.js'
import { PetScript } from './PetScript.js'

$CheckLogin()
createSidebar("pet")
$Loading()
$ModalToggle()
PetScript()