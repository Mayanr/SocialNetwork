import React, { Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";
import ProfileTop from "../profile/ProfileTop";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileGithub from "../profile/ProfileGithub";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading} }) =>{
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    //if the profile is still loading and is null, then show the spinner...else <Fragment>
    return loading && profile === null ? (
    <Spinner /> 
    ) : ( 
    <Fragment>
     <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
        {/* has an account */}
          <DashboardActions />
          {/*<Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div> 
            */}
        <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )} 
          </div>
        </Fragment>
      ) : (
        <Fragment>
        {/* doesn't have an account */}
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
            </Link> 
        </Fragment>
      )}
    </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);