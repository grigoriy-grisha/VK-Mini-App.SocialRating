import { Touch } from "@vkontakte/vkui";
import React, { useLayoutEffect } from "react";
import fastdom from "fastdom";

interface IProps {
  children: (shiftPercent: number) => React.ReactNode;
  onTop: () => void;
  onBottom: () => void;
  onProgress: (value: number) => void;
  heightContainer: number;
}

const getValueWithLimit = (value, limit) => {
  return value > limit ? limit : value < -limit ? -limit : value;
};

function SwipeCard({
  children,
  heightContainer,
  onTop,
  onBottom,
  onProgress,
}: IProps) {
  const touchRef = React.useRef<HTMLElement>(null);

  const [shiftY, setShiftY] = React.useState(0);
  const [limitY, setLimitY] = React.useState(heightContainer);

  const startY = React.useRef(0);

  const onMove = (e) => {
    const shiftY = getValueWithLimit(startY.current + e.shiftY, limitY);

    setShiftY(shiftY);
    onProgress(shiftY / limitY);
    fastdom.mutate(() => {
      touchRef.current.style.transform = `translate(0px, ${shiftY}px)`;
      touchRef.current.style.cursor = `grabbing`;
    });
  };

  const onEnd = (e) => {
    const shiftY = startY.current + e.shiftY;

    if (shiftY < -limitY) {
      onTop();
    }

    if (shiftY > limitY) {
      onBottom();
    }

    fastdom.mutate(() => {
      touchRef.current.style.transform = `translate(0px, ${startY.current}px)`;
      touchRef.current.style.cursor = `grab`;
    });
    onProgress(startY.current / limitY);
    setShiftY(startY.current);
  };

  useLayoutEffect(() => setLimitY(touchRef.current.offsetTop), []);

  return (
    <Touch
      style={{
        cursor: "grab",
        width: "100%",
        willChange: "transform",
        transition: "transform 100ms",
      }}
      getRootRef={touchRef}
      onMove={onMove}
      onEnd={onEnd}
    >
      {children(shiftY / limitY)}
    </Touch>
  );
}

export default SwipeCard;
