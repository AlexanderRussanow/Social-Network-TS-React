import React from "react";
import Profile from "./profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-Reducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchProfileContainerType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};

type PropsType = MapPropsType &
  MapDispatchProfileContainerType &
  RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorisedId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    if (!userId) {
      console.error("ID should be exist");
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        // saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorisedId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);
