export const Checkbox = ({ inline = false }) => (
  <div className={`form-element ${inline ? "form-element-inline" : ""}`}>
    <div className="form-label">Label</div>
    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="0"
          name="r1"
          className="form-checkbox text-teal-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="1"
          name="r1"
          className="form-checkbox text-teal-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>
    <div className="form-hint">This is a hint</div>
  </div>
);

export const InvalidCheckbox = ({ inline = false }) => (
  <div className={`form-element ${inline ? "form-element-inline" : ""}`}>
    <div className="form-label">First name</div>

    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="0"
          name="r1"
          className="form-checkbox form-checkbox-invalid text-emerald-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="1"
          name="r1"
          className="form-checkbox form-checkbox-invalid text-emerald-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>

    <div className="form-error">First name is required</div>
  </div>
);

export const ValidCheckbox = ({ inline = false }) => (
  <div className={`form-element ${inline ? "form-element-inline" : ""}`}>
    <div className="form-label">First name</div>
    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="0"
          name="r1"
          className="form-checkbox form-checkbox-valid text-green-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          value="1"
          name="r1"
          className="form-checkbox form-checkbox-valid text-green-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>
    <div className="form-success">First name is valid</div>
  </div>
);
