import { forwardRef, useState, useImperativeHandle } from "react";

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

export default Togglable;
