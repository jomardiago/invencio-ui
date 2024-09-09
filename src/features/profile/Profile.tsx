import { Theme } from "@carbon/react";
import ChangePasswordForm from "./components/changePasswordForm/ChangePasswordForm";
import EditProfileForm from "./components/editProfileForm/EditProfileForm";
import classes from "./Profile.module.scss";

function Profile() {
  return (
    <div className={classes.container}>
      <div>
        <ChangePasswordForm />
      </div>
      <div>
        <Theme theme="white" className={classes.editProfileWrapper}>
          <h3>Edit Profile</h3>
          <EditProfileForm />
        </Theme>
      </div>
    </div>
  );
}

export default Profile;
