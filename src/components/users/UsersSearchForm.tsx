import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-Reducers";
import { getUsersFilterSelector } from "../../redux/usersSelectors";
import { useSelector } from "react-redux";

const userSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type UsersFormSearchPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null"

type FormType = {
  term: string
  friend: FriendFormType
}

const UsersSearchForm: React.FC<UsersFormSearchPropsType> = React.memo(
  (props) => {

    const filter = useSelector(getUsersFilterSelector )

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
          enableReinitialize
          initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
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
