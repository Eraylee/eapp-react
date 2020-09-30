import { useState } from "react";
import { OperateType } from "@/types";

export type ModalOk = (
  cb: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<boolean>
) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [operateType, setOperateType] = useState(OperateType.Create);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const open = (type?: OperateType) => {
    if (type) {
      setOperateType(type);
    }
    setVisible(true);
  };

  const ok = (
    cb = (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise.resolve(true)
  ) => async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setConfirmLoading(true);
    const canClose = await cb(e);
    canClose && setVisible(false);
    setConfirmLoading(false);
  };

  const close = () => {
    setVisible(false);
  };

  return { visible, confirmLoading, operateType, open, ok, close };
};
