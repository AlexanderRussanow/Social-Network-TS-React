import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-Reducers";

const userSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type UsersFormSearchPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string
  friend: "true" | "false" | "null"
}

const UsersSearchForm: React.FC<UsersFormSearchPropsType> = React.memo(
  (props) => {
    const submit = (
      values: FormType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      const filter: FilterType = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false
      }
      props.onFilterChanged(filter);
      setSubmitting(false);
    };

    return (
      <div>
        <Formik
          initialValues={{ term: "", friend: "null" }}
          validate={userSearchFormValidate}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="term" />
              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only following</option>
                <option value="false">Only unfollowing</option>
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Find
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);
export default UsersSearchForm;
