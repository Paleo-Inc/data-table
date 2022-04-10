import { useState, useRef } from "react";
import { Maximize2, Minimize2 } from "react-feather";

import useClickOutside from "../hooks/useOutterClick";
import { useTableContext } from "../context";

const Editable = ({ value, isSelected, x, y }) => {
  const { selected, selectRows, mouseDown, ui } = useTableContext();


  const [stateFullValue, setValue] = useState(value);
  // const [active, setActive] = useState(false);
  const [editable, toggleEditable] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const divRef = useRef();
  const inputRef = useRef();

  // const toggleActive = (isActive = false) => {
  //   setActive(isActive);
  //   if (isActive) {
  //     setTimeout(() => {
  //       inputRef.current?.focus();
  //     }, 10);
  //   } else {
  //     setExpanded(false);
  //   }
  // };

  const toggleExpand = () => {
    setExpanded(!expanded);

    if (selected) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    console.log("onBlur", stateFullValue);
    // updateMyData(index, id, value);
    // toggleActive(false);
    toggleEditable(false);
  };





  const onOuterClick = () => {
    // toggleActive(false);
  };




  //on hover if mouse is down the select "to" cordinates
  const onMouseEnter = () => {
    if (!mouseDown) return;
    // console.log("onMouseEnter", mouseDown, x, y);

    // if  coordinates are different
    if (selected.to.x !== x || selected.to.y !== y) {
      selectRows("to", x, y);
    }
  };

  // on mouse down
  const onMouseDown = (event) => {
    if (event.type === "mousedown") {
      selectRows("reset", x, y);

    } else {
      // if "ending" coordinates are different from "starting" coordinates
      if (selected.from.x !== x || selected.from.y !== y) {
        selectRows("mouseup", x, y);
      }
    }
  };


  //on double click activate editor
  const onDoubleClick = () => {
    // toggleActive(false);
    toggleEditable(true);
    setExpanded(false);
  };

  // on outside click close the panel
  // useClickOutside(divRef, onOuterClick);
  useClickOutside(inputRef, onBlur);

  return (
    <td className="position-relative">
      <div className="non-editable o0 usn">{stateFullValue}</div>

      <div
        className="non-editable position-absolute usn"
        style={{
          backgroundColor: isSelected ? "#0085ff21" : "",
          // boxShadow: isSelected ? `0px 0px 0px 1px ${ui.theme}` : "",
          opacity: editable ? 0 : 1
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseDown}
        onMouseEnter={onMouseEnter}

        onDoubleClick={onDoubleClick}
      >
        {stateFullValue}
      </div>


      {editable && (
        <div
          className="pa-100 z-10 tr4"
          style={{
            width: expanded ? "220px" : "100%",
            height: expanded ? "200px" : "100%",
            padding: "0",
          }}
          ref={inputRef}
        >
          <textarea
            className="d-block w-100 tscroll"
            style={{
              resize: "none",
              height: "100%",
              padding: "3px 5px",
              fontSize: "1em",
              backgroundColor: "#fff",
              color: "inherit",
              border: "unset",
              borderRadius: "4px",
              outline: "none",
              boxShadow: `${ui.theme} 0px 0px 0px 1.5px, 0 0 50px 0 rgba(0,0,0,0.2)`,
            }}
            onChange={onChange}
            // onBlur={onBlur}
            value={stateFullValue}
          />
          <div
            role="button"
            className="position-absolute b0 r0 ic ic20 rounded-circle bg-white"
            onClick={toggleExpand}
          >
            {expanded ? <Minimize2 size="12px" /> : <Maximize2 size="12px" />}
          </div>
        </div>
      )}
    </td>
  );
};
export default Editable;
