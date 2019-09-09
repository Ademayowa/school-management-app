import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
  // These are just properties
  name,
  placeholder,
  value,
  onChange,
  type,
  error
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextFieldGroup;
