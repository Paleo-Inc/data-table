import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { Maximize2, Minimize2 } from "react-feather";

import HoverTooltip from "./Tooltip";
import useMockData from "../data/mock-data";
import useClickOutside from "./useOutterClick";

const PaleoTable = () => {
  const [header, data, exclude] = useMockData();
  const [width, setWidth] = useState("100%");

  useEffect(() => {
    const temp = header.reduce((a, b) => a + parseInt(b.width, 10), 0);
    setWidth(`${temp}px`);
  }, [header]);

  return (
    <div className="bg-white rounded border m-4">
      <Card.Body>Paleo Table</Card.Body>
      <div className="ofxa w-100 table">
        <table style={{ width }} className="edit-table">
          <thead>
            <tr>
              {header.map((e, i) => (
                <th key={i} width={e.width || "50px"} className="px-1 py-2">
                  <span className="fw-bold">{e.name}</span>
                  {e.tooltip && <HoverTooltip text={e.tooltip} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((obj, i) => (
              <tr key={i} className="border-top align-top">
                {Object.keys(obj).map((key, j) => (
                  <>
                    {!exclude.includes(key) && (
                      <Editable key={j} value={obj[key]} />
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaleoTable;

const Editable = ({ value }) => {
  const [stateFullValue, setValue] = useState(value);
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const inputRef = useRef();

  const toggleActive = (isActive = false) => {
    setActive(isActive);
    if (isActive) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    } else {
      setExpanded(false);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);

    if (active) {
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
    toggleActive(false);
  };

  // on outside click close the panel
  useClickOutside(inputRef, onBlur);

  return (
    <td className="position-relative">
      <div
        className="d-block w-100 ofh"
        style={{
          padding: "3px 5px",
          fontSize: "1em",
        }}
        onClick={() => toggleActive(true)}
      >
        {stateFullValue}
      </div>

      {!active ? (
        <></>
      ) : (
        <div
          className="position-absolute top-0 start-0 z-10 tr4"
          style={{
            width: expanded ? "220px" : "100%",
            height: expanded ? "200px" : "100%",
            padding: "1px",
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
              backgroundColor: "#f7f9fc",
              color: "inherit",
              border: "unset",
              borderRadius: "4px",
              outline: "none",
              boxShadow: active
                ? "0px 0px 0px 2px #868ea1ba"
                : "0 0 0 0 rgba(0,0,0,0)",
            }}
            onChange={onChange}
            // onBlur={onBlur}
            value={stateFullValue}
          />
          <div
            role="button"
            className="position-absolute bottom-0 end-0 ic ic20 rounded-circle bg-white"
            onClick={toggleExpand}
          >
            {expanded ? <Minimize2 size="12px" /> : <Maximize2 size="12px" />}
          </div>
        </div>
      )}
    </td>
  );
};
