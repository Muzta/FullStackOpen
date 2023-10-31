import { forwardRef, useState, useImperativeHandle } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
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
          {children}
          <button onClick={() => setVisible(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      )}
    </>
  );
});

export default Togglable;
