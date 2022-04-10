import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import Header from "./Header";
import Editable from "./Editable";
import useMockData from "../data/mock-data";


import { useTableContext } from "../context";


const PaleoTable = ({ options }) => {
  const { ui, setUi, onMouseDown, selected, data, setData, header, setHeader } = useTableContext();

  const [rawHeader, rawData, exclude] = useMockData();

  useEffect(() => {
    if (options && Object.keys(options).length > 0) {
      setUi({ ui, ...options });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });


  useEffect(() => {
    //remove excluded
    const temp = rawData.map((obj) => {
      exclude.forEach(exc => delete obj[exc]);
      return obj;
    });

    setData(temp);
    setHeader(rawHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData, rawHeader]);




  const [width, setWidth] = useState("100%");

  useEffect(() => {
    const temp = header.reduce((a, b) => a + parseInt(b.width, 10), 0);
    setWidth(temp);
  }, [header]);

  const isSelected = (x, y) => {
    if (selected.from.x === null) {
      return false;
    }


    //CASE I - incase to.x id null, then select a single cell
    if (selected.to.x === null) {
      if (selected.from.x === x && selected.from.y === y) {
        return true;
      }
    }

    //CASE II - (x >= from.x AND x <= to.x) && (y >= from.y AND y <= to.y)
    else {
      let tselected = { ...selected }

      // swap if either of to.x or to.y is smaller then from.x or from.y
      if (tselected.from.x < tselected.to.x || tselected.from.y < tselected.to.y) {
        tselected = {
          from: {
            x: Math.min(selected.from.x, selected.to.x),
            y: Math.min(selected.from.y, selected.to.y),
          },
          to: {
            x: Math.max(selected.from.x, selected.to.x),
            y: Math.max(selected.from.y, selected.to.y),
          }
        }
      }

      if ((x >= tselected.from.x && x <= tselected.to.x)
        &&
        (y >= tselected.from.y && y <= tselected.to.y)) {
        return true;
      }
    }


    return false;
  }


  const isRowSelected = (y) => {
    if (selected.from.y === null) {
      return false;
    }

    if (selected.to.y === null) {
      return (selected.from.y === y)
    }

    if (selected.from.y < selected.to.y) {
      return (y >= selected.from.y && y <= selected.to.y) ? true : false;
    }
    else {
      //reverse selection
      return (y >= selected.to.y && y <= selected.from.y) ? true : false;
    }
  }


  const isColumnSelected = (x, rowSelected) => {
    if (selected.from.x === null) {
      return false;
    }

    if (selected.to.x === null) {
      return (rowSelected && selected.from.x === x);
    }


    if (selected.from.x < selected.to.x) {
      return (rowSelected && x >= selected.from.x && x <= selected.to.x) ? true : false;
    }
    else {
      //reverse selection
      return (rowSelected && x >= selected.to.x && x <= selected.from.x) ? true : false;
    }
  }



  return (

    <div className="bg-white rounded border m-4">
      <Card.Body>Paleo Table</Card.Body>
      <div className="ofxa w-100 table">
        {JSON.stringify(selected)}
        <table style={{ width }} className="edit-table">
          <Header />

          <tbody onMouseDown={onMouseDown} onMouseUp={onMouseDown}>
            {
              data.length > 0 && data.map((obj, y) => (
                <TableRow
                  key={y}
                  rowSelected={isRowSelected(y)}
                  obj={obj}
                  y={y}
                  isColumnSelected={isColumnSelected}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaleoTable;




function TableRow({ rowSelected, isColumnSelected, y, obj }) {
  return (<tr className="border-top align-top" row-selected={rowSelected ? "1" : "0"}>
    {
      Object.keys(obj).map((key, x) => <Editable
        key={x}
        value={obj[key]}
        x={x}
        y={y}
        // isSelected={isSelected(x, y)}
        isSelected={isColumnSelected(x, rowSelected)}
      />)
    }
  </tr>);
}


