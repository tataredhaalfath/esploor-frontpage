import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ArrowDown from "public/images/icon-arrow-down.svg";

export default function Item({ name, id, child, active, toggle, children }) {
  const [Height, setHeight] = useState(() => 0);

  function calcHeight(e) {
    console.log(e.offsetHeight);
    setHeight(e.offsetHeight);
  }
  return (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <div className="meta pl-4-cus py-2 relative flex justify-between items-center">
        <span className="text-gray-600">{name}</span>
        <button
          className="link-wrapped pr-5-cus focus:outline-none"
          onClick={() => toggle(id)}
        >
          {child && child.length > 0 && (
            <ArrowDown
              className={[
                "transition-all duration-300 transform",
                active === id ? "rotate-180-cus" : "rotate-0-cus",
              ].join(" ")}
            ></ArrowDown>
          )}
        </button>
      </div>
      <div
        className="transition-all duration-500"
        style={{ height: active === id ? Height : 0 }}
      >
        <CSSTransition
          in={active === id}
          timeout={500}
          onEnter={calcHeight}
          classNames="accordion-item"
        >
          <div className="accortion-ite">
            <div className="py-2 bg-gray-100-cus">{children}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
