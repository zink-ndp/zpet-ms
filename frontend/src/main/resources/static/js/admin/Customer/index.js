import { $Loading } from "../../admin/Loading.js";
import { $CheckLogin } from "../../admin/Login/CheckLogin.js";
import { createSidebar } from "../../admin/Sidebar.js";
import { $ModalToggle } from "../../client/Modal.js";
import { $CustomerScript } from "./CustomerScript.js";

$CheckLogin(0);
createSidebar("customer");
$Loading();
$ModalToggle();
$CustomerScript();
