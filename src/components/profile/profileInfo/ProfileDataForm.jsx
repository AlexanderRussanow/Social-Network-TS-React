import React from "react";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  TextArea,
} from "../../common/formControls/formControls";
import s from "./../../common/formControls/FormsControl.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>
          Change your Full name:
          {createField("Full name", "fullname", [], Input)}
        </b>
      </div>
      <div>
        <b>
          Update information about you:
          {createField("About me", "aboutMe", [], TextArea)}
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

const ProfileDataFormRedux = reduxForm({ form: "editProfile" })(
  ProfileDataForm
);

export default ProfileDataFormRedux;
