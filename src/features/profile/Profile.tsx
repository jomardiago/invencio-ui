import { Theme } from "@carbon/react";
import ChangePasswordForm from "./components/changePasswordForm/ChangePasswordForm";
import EditProfileForm from "./components/editProfileForm/EditProfileForm";
import useSessionStore from "../../stores/sessionStore";
import { useProfileQuery } from "./apis/useProfileQuery";
import classes from "./Profile.module.scss";

function Profile() {
  const { session } = useSessionStore();
  const profile = useProfileQuery(session?.id);

  return (
    <div className={classes.container}>
      <div className={classes.changePasswordContainer}>
        <ChangePasswordForm />
      </div>
      <div className={classes.editProfileContainer}>
        <Theme theme="white" className={classes.editProfileWrapper}>
          <h3>Edit Profile</h3>
          <EditProfileForm profile={profile.data} />
        </Theme>
      </div>
    </div>
  );
}

export default Profile;
