import { useRecoilValue } from "recoil";
import { userPermissionsState } from "../atoms/userPermissionsState.mjs";

function PermissionChecker(props) {
    const permissions = useRecoilValue(userPermissionsState);
    function getPermission(s) {return s.split('.').reduce((o,i)=> o[i], permissions)};

    if ((getPermission(props.permission) === true) || (getPermission("admin") === true)) {
        return props.children;
    }

    return null;
}

export default PermissionChecker;