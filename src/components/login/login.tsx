import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validarot";
import { createField, Input } from "../common/formControls/formControls";
import { login } from "../../redux/auth-reducer";
import s from "./../../components/common/formControls/FormsControl.module.css";
import { AppStateType } from "../../redux/redux-store";


type LoginFormOwnPropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
      {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password"})}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
  form: "login",
})(LoginForm);

type MapStatePropsLoginType = {
  isAuth: boolean
  captchaUrl: string | null

}

type MapDispatchLoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
  email: string,
   password: string, 
   rememberMe: boolean, 
   captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>



const Login: React.FC<MapStatePropsLoginType & MapDispatchLoginPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsLoginType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});
export default connect(mapStateToProps, { login })(Login);
