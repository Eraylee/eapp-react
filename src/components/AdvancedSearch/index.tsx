import React, { PropsWithChildren, useState } from "react";
import Form from "antd/lib/form/Form";

export interface AdvancedSearchProps {}

const AdvancedSearch: React.FC<PropsWithChildren<AdvancedSearchProps>> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const buildChildren = () => {
    let components: React.ReactNode = [];
    if (!Array.isArray(children)) {
      return children;
    }
    const len = children.length
    const  colSize  = len / 4
    children.forEach((v,k) =>{

    })
  };
  return (
    <>
      <Form>{buildChildren()}</Form>{" "}
    </>
  );
};
