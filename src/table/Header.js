// import { useState, useEffect } from "react";

import HoverTooltip from "./Tooltip";
import { useTableContext } from "../context";

const Header = () => {
  const { header } = useTableContext();

  return (
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
  );
};

export default Header;
