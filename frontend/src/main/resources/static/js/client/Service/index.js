import { $UserNavButton } from "../UserNavButton.js";
import { $ShowAddedService } from "../ShowAddedService.js";
import { $addHeader } from "../Header.js"
import { $ServiceScript } from "./ServiceScript.js";
import { $CheckLogin } from "../CheckLogin.js";

$CheckLogin(0);
$addHeader();
$UserNavButton();
$ShowAddedService();
$ServiceScript();

