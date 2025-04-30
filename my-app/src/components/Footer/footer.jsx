import "./Footer.css";

export default function footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          {/* column1 */}
          <div className="col">
            <h3>Fit Trendz</h3>
            <ul></ul>
          </div>
          {/* column2 */}
          <div className="col">
            <h4>Fit Trendz</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Shop Now</li>
            </ul>
          </div>

          {/* column3 */}
          <div className="col">
            <h4>Contact</h4>
            <ul>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>

          {/* column4 */}
          <div className="col">
            <h3>Join Our News Letter</h3>
          </div>
        </div>
        <hr />
        <div className="rights">
          <p className="rights">
            &copy; {new Date().getFullYear()} FIT TRENDZ INC |
          </p>
          <p className="rights"> All Rights Reserved | </p>
          <p className="rights"> Terms Of Service </p>
          <p className="rights"> | Privacy</p>
        </div>
      </div>
    </div>
  );
}
