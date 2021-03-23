import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


let mapStateToPropsRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to={"/login"} />;
      return <Component {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};

//======code below does't works with Error "JSX element type '' does not have any construct or call signatures"

// let mapStateToPropsRedirect = (state: AppStateType) => ({
//   isAuth: state.auth.isAuth,
// });

// type MapPropsType = {
//   isAuth: boolean;
// };

// type DispatchPropsType = {
// }


// export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

//   const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
//       let {isAuth, ...restProps} = props

//       if (!isAuth) return <Redirect to='/login'/>

//       return <WrappedComponent {...restProps as WCP}/>
//   }

//   let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
//     mapStateToPropsRedirect, {})
//   (RedirectComponent)

//   return ConnectedAuthRedirectComponent;
// }