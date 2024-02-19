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
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => setVisible(false)}
          >
            {hideLabel}
          </button>
          {children}
        </>
      ) : (
        <button
          className="like-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 text-center"
          onClick={() => setVisible(true)}
        >
          {buttonLabel}
        </button>
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
