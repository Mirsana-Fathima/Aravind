import { useHistory } from "react-router";
import { useEffect } from "react";
export function LoginRedirect(){
  const navigate = useHistory()
  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate.push("/login")
    }
  },[])
}