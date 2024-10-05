import {nonEmpty} from "../js/utils.js";
import {$ToggleHamburger} from "../js/client/script.js";
import {$CheckLogin} from "../js/client/CheckLogin.js";
import {$ShowService} from "./client/ShowServices.js";
import {$ShowAddedService} from "./client/ShowAddedService.js";
import {$CloseModal} from "./client/Modal.js";
import {$UserNavButton} from "./client/UserNavButton.js";
import {$AddAppointment} from "./client/AddAppointment.js";
nonEmpty();

$(()=>{
    $ToggleHamburger();
    $CheckLogin();
    $ShowService();
    $ShowAddedService();
    $CloseModal();
    $UserNavButton();
    $AddAppointment();
})

