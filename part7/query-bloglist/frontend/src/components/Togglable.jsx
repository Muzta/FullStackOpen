import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ buttonLabel, hideLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility() {
        setVisible(!visible);
      },
    };
  });

  return (
    <>
      {visible ? (
        <>
          <button onClick={() => setVisible(false)}>{hideLabel}</button>
          {children}
        </>
      ) : (
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      )}
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
