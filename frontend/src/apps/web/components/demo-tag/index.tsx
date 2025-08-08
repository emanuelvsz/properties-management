import { css } from "@emotion/react";
import { Tag } from "antd";

const greenTagStyle = css`
  border-radius: 4px;
  height: 19px !important;
  font-size: 12px;
  display: flex;
`;

const DemoTag = () => {
  return <Tag css={greenTagStyle} color="success">DEMO</Tag>;
};

export default DemoTag;
