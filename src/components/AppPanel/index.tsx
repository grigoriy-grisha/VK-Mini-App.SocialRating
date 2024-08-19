import { Panel } from "@vkontakte/vkui";
import React, { useLayoutEffect, useRef, useState } from "react";

interface IProps {
  id: string;
  className?: string;
  children: (height: number) => React.ReactNode;
  getHeight?: (height: number) => void;
}

function AppPanel({ id, children, getHeight, className }: IProps) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
    getHeight && getHeight(ref.current.offsetHeight);
  }, []);

  return (
    <Panel id={id}>
      <div
        ref={ref}
        className={className}
        style={{ maxWidth: "100vw", minHeight: "calc(100vh - 100px)" }}
      >
        {children(height)}
      </div>
    </Panel>
  );
}

export default AppPanel;
