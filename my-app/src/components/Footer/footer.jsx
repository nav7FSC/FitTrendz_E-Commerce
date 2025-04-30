import s from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.container}>
        <div className={s.row}>
          <div className={s.col}>
            <h3>Fit Trendz</h3>
            <ul></ul>
          </div>

          <div className={s.col}>
            <h4>Fit Trendz</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Shop Now</li>
            </ul>
          </div>

          <div className={s.col}>
            <h4>Contact</h4>
            <ul>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>

          <div className={s.col}>
            <h3>Join Our News Letter</h3>
          </div>
        </div>

        <hr />

        <div className={s.rights}>
          <p className={s.rights}>
            &copy; {new Date().getFullYear()} FIT TRENDZ INC |
          </p>
          <p className={s.rights}> All Rights Reserved | </p>
          <p className={s.rights}> Terms Of Service </p>
          <p className={s.rights}> | Privacy</p>
        </div>
      </div>
    </div>
  );
}
