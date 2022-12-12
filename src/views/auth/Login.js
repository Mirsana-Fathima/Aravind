import { useState, useEffect,React } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "assets/img/Flexkart.png";
import "assets/styles/index.css";
import axios from "axios";
import { TokenCheck } from "shared/Tokenchecker/TokenChecker";
import { Login_Url } from "shared/Url/Url";



export default function Login() {
  const history = useHistory();
  const initialValues = { EmailId: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [Errors, setError] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i;

    if (!values.EmailId) {
      errors.EmailId = "Email is required!";
    } else if (!regex.test(values.EmailId)) {
      errors.EmailId = "Invalid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };
  const handleApi = () => {
    console.log({ formValues });
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(
    () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        axios({
          url: Login_Url,
          method: "POST",
          data: { EmailId: formValues.EmailId, password: formValues.password },
        })
        .then((result) => {
          if (result.data.success===true){
          localStorage.setItem("token", result.data.token);
          TokenCheck();
          history.push("/admin/Dashboard");
          }
          else{
            setError(true);
          }
        })
        .catch((error) => {
          //setError(true);
          console.log(error);
        });
      }
    },
    [formErrors]
  );
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="logos" style={{ display: "flex" }}>
                  <img alt="..." className="Logo" src={logo} />
                  <h1 className="Title">FlexKart</h1>
                </div>
                {Errors &&<p className="error-msg">Invalid Email or Password</p>}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      name="EmailId"
                      type="email"
                      value={formValues.EmailId}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  {formErrors.EmailId && (
                    <div className="error-msg">{formErrors.EmailId}</div>
                  )}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formValues.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  {formErrors.password && (
                    <div className="error-msg">{formErrors.password}</div>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleApi}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="Forgot">
                    <Link to="/auth/register" className="text-blueGray-200 ">
                      <small className="Forgot">Forgot password ?</small>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
