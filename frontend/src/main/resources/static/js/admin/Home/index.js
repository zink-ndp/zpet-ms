import { createSidebar } from '../Sidebar.js'
import { $CheckLogin } from '../Login/CheckLogin.js';
import { $Loading } from '../Loading.js'
import { $ModalToggle } from '../../client/Modal.js'
import { $HomeScript } from './HomeScript.js';

$Loading()
$CheckLogin(1);
createSidebar("home");
$ModalToggle();
$HomeScript();