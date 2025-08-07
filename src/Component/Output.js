import { useEffect, useRef } from 'react';

function Output({ value }) {
  const outputRef = useRef();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.style.opacity = 0;
      setTimeout(() => {
        outputRef.current.style.opacity = 1;
      }, 50);
    }
  }, [value]);

  return (
    <div
      ref={outputRef}
      className="output"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default Output;
