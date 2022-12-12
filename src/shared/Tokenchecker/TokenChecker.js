import jwtDecode from "jwt-decode";
import { LoginRedirect } from "shared/LoginRedirect/LoginRedirect";

export function TokenCheck() {
  const storeToken = localStorage.getItem("token");
  if (storeToken === null || "") {
    localStorage.clear();
    LoginRedirect();
  } else {
    const { exp } = jwtDecode(storeToken);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      LoginRedirect();
    }
  }
}
