import { Touch } from "@vkontakte/vkui";
import React from "react";
import fastdom from "fastdom";

interface IProps {
  children: (shiftPercent: number) => React.ReactNode;
  onTop: () => void;
  onBottom: () => void;
  onProgress: (value: number) => void;
}

const getValueWithLimit = (value, limit) => {
  return value > limit ? limit : value < -limit ? -limit : value;
};

function SwipeCard({ children, onTop, onBottom, onProgress }: IProps) {
  const touchRef = React.useRef<HTMLElement | null>(null);

  const startY = React.useRef(0);

  const onMove = (e) => {
    const limitY = fastdom.measure(() => touchRef.current?.offsetTop)();

    const shiftY = getValueWithLimit(startY.current + e.shiftY, limitY);

    onProgress(shiftY / limitY);
    fastdom.mutate(() => {
      touchRef.current.style.transform = `translate(0px, ${shiftY}px)`;
      touchRef.current.style.cursor = `grabbing`;
    });
  };

  const onEnd = (e) => {
    const limitY = fastdom.measure(() => touchRef.current?.offsetTop)();
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
  };

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
      {children}
    </Touch>
  );
}

export default SwipeCard;
