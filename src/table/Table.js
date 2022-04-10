import { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import Header from "./Header";
import Editable from "./Editable";
import useMockData from "../data/mock-data";


import { useTableContext } from "../context";


const PaleoTable = () => {
  const { data, setData, header, setHeader } = useTableContext();

  const [rawHeader, rawData, exclude] = useMockData();



  useEffect(() => {
    setData(rawData);
    setHeader(rawHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData, rawHeader]);




  const [width, setWidth] = useState("100%");

  useEffect(() => {
    const temp = header.reduce((a, b) => a + parseInt(b.width, 10), 0);
    setWidth(temp);
  }, [header]);

  return (

    <div className="bg-white rounded border m-4">
      <Card.Body>Paleo Table</Card.Body>
      <div className="ofxa w-100 table">

        <table style={{ width }} className="edit-table">
          <Header />

          <tbody>
            {
              data.length > 0 && data.map((obj, i) => (
                <tr key={i} className="border-top align-top">
                  {Object.keys(obj).map((key, j) => <Fragment key={j}>
                    {!exclude.includes(key) && <Editable value={obj[key]} />}
                  </Fragment>)}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaleoTable;

