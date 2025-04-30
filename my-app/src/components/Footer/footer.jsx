import { WEBSITE_NAME } from "../../data/constants";
import CopyRights from "./CopyRights/CopyRights";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.container}>
        <div className={s.row}>
          <div className={s.col}>
            <h3>{WEBSITE_NAME}</h3>
            <ul></ul>
          </div>

          <div className={s.col}>
            <h4>{WEBSITE_NAME}</h4>
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

        <CopyRights />
      </div>
    </div>
  );
}
