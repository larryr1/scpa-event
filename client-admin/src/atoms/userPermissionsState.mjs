import { atom } from "recoil";

export const userPermissionsState = atom({
    key: "userPermissions",
    default: {},
});