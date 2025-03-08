import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Comfort" title="Comfort" />
          <Button onClickHandler={handleClick} value="Athletic" title="Athletic" />
          <Button onClickHandler={handleClick} value="Professional" title="Professional" />
          <Button onClickHandler={handleClick} value="Other" title="Other" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
