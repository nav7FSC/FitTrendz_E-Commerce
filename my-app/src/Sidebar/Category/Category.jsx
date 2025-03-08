import "./Category.css";
import Input from "../../components/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="jeans"
          title="Jeans"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="hoodies"
          title="Hoodies"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="dresses"
          title="Dresses"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="shirts"
          title="Shirts"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
