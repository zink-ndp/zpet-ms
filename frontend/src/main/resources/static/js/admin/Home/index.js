import { $CheckLogin } from '../Login/CheckLogin.js';
import { createSidebar } from '../Sidebar.js'
import { $Loading } from '../Loading.js'
import { $ModalToggle } from '../../client/Modal.js'
import { $HomeScript } from './HomeScript.js';
import { $Notification } from '../Notification.js';

$Loading()
$CheckLogin(1);
createSidebar("home");
$ModalToggle();
$HomeScript();
$Notification();