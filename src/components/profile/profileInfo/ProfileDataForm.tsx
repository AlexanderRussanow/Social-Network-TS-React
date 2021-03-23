import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../types/types";
import {
  createField,
  Input,
  TextArea,
} from "../../common/formControls/formControls";
import s from "./../../common/formControls/FormsControl.module.css";


type ProfileDataFormPropsType = {
  profile: ProfileType
}

type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>
          Change your Full name:
          {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </b>
      </div>
      <div>
        <b>
          Update information about you:
          {createField<ProfileTypeKeys>("About me", "aboutMe", [], TextArea)}
        </b>
      </div>
      {/* <div>
        <b>
          Looking for a job?
          {createField("Looking for a job", "lookingForAJob", [], Input, { type: "checkbox" })}
        </b>
      </div>
      <div>
        <b>
          My professional skils:
          {createField("My professional skils", "lookingForAJobDescription", [], TextArea)}
        </b>
      </div> */}
      <div>
        <b>Contacts:</b>
        <div>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key}>
                <b>
                  {key}: {createField(key, "contacts." + key, [], Input)} 
                </b>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

const ProfileDataFormRedux = reduxForm<ProfileType, ProfileDataFormPropsType>({ form: "editProfile" })(
  ProfileDataForm
);

export default ProfileDataFormRedux;
