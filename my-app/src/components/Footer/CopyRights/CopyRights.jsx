import s from "./CopyRights.module.css";

const CopyRights = () => {
  return (
    <div className={s.rights}>
      <p className={s.rights}>
        &copy; {new Date().getFullYear()} FIT TRENDZ INC |
      </p>
      <p className={s.rights}> All Rights Reserved | </p>
      <p className={s.rights}> Terms Of Service </p>
      <p className={s.rights}> | Privacy</p>
    </div>
  );
};

export default CopyRights;
