import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.mjs";

function PermissionChecker(props) {
    const user = useRecoilValue(userState);
    console.log("Checking perms with obj " + JSON.stringify({ ...user.permissions }));
    function getPermission(s) {return s.split('.').reduce((o,i)=> o[i], { ...user.permissions })};

    if ((getPermission(props.permission) === true) || (getPermission("admin") === true)) {
        return props.children;
    }

    return null;
}

export default PermissionChecker;