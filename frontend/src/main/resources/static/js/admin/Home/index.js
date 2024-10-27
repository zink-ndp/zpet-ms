import { $CheckLogin } from '../Login/CheckLogin.js';
import { createSidebar } from '../Sidebar.js'
import { $Loading } from '../Loading.js'
import { $ModalToggle } from '../../client/Modal.js'
import { $HomeScript } from './HomeScript.js';
import { $Notification } from '../Notification.js';

$Loading()
setTimeout(() => {
    $CheckLogin(1);
}, 500);
createSidebar("home");
$ModalToggle();
$HomeScript();
$Notification();