import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState.mjs";

export const AccountPage = () => {

  const user = useRecoilValue(userState);

  function goToPassChange() {
    location.href = "/auth/passchange";
  }

  return (
    <div>
      <h1>Account for <code>{user.username}</code></h1>
      <p className="fw-bold">Edit your account settings here.</p>
      <button className="btn btn-danger" onClick={goToPassChange}>Change Password</button>
    </div>
  );
}