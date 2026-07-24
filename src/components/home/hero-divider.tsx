import React, { useMemo } from "react";

function HeroDivider() {
  const dividers = useMemo(() => {
    return [
      {
        color: "#344",
      },
      {
        color: "#576A6A",
      },
      {
        color: "#728383",
      },
      {
        color: "#A5AFAF",
      },
      {
        color: "#CFD3CF",
      },
    ];
  }, []);

  return (
    <div className="w-full">
      {dividers.map((divider, index) => (
        <div key={index}>
          <div
            className="w-full h-1.5"
            style={{
              backgroundColor: divider.color,
            }}
          ></div>
          {index !== dividers.length - 1 && (
            <div className="w-full h-0.5 bg-background"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HeroDivider;
