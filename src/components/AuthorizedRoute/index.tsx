import React, { useEffect, Suspense, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export default ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();
  useEffect(() => {
    const TOKEN = localStorage.getItem("TOKEN");
    if (!TOKEN) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Suspense fallback={<Spin />}>{children} </Suspense>
    </>
  );
};
