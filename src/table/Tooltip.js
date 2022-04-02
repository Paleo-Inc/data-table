import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function HoverTooltip({ children, text }) {
  const SelectStyle = "text-primary ms-1";

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip>{text}</Tooltip>}
    >
      <span role="button" style={{ height: "14px", lineHeight: "18px" }}>
        {children}
        <FontAwesomeIcon className={SelectStyle} icon={faInfoCircle} size="sm" />
      </span>
    </OverlayTrigger>
  );
}
