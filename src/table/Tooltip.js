import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Info } from "react-feather";

export default function HoverTooltip({ children, text }) {

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip>{text}</Tooltip>}
    >
      <span role="button" style={{ height: "14px", lineHeight: "18px" }}>
        {children}
        <Info size="22px" className="p-1" />
      </span>
    </OverlayTrigger>
  );
}
