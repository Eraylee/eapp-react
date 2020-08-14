import React, { memo, useState, useRef, useEffect } from "react";
import { Modal } from "antd";

export interface EModalOption {
  onOk?(): void;
  onCancel?(): void;
}

export type EModalType = React.NamedExoticComponent & {
  show(component: JSX.Element, eModalOption: EModalOption): void;
};

const EModal: EModalType = memo(
  (_props, ref) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const eModalOptionRef = useRef<EModalOption>({});
    const componentRef = useRef(<></>);
    useEffect(() => {
      const defaultShowFN = EModal.show;
      EModal.show = (component: JSX.Element, eModalOption: EModalOption) => {
        componentRef.current = component;
        setVisible(true);
        eModalOptionRef.current = eModalOption;
      };
      return () => {
        EModal.show = defaultShowFN;
      };
    }, []);

    const wrapWithClose = (method = () => {}) => async () => {
      setConfirmLoading(true);
      await method();
      setConfirmLoading(false);
      setVisible(false);
    };

    return (
      <Modal
        title="方案四"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={wrapWithClose(eModalOptionRef.current.onOk)}
        onCancel={wrapWithClose(eModalOptionRef.current.onCancel)}
      >
        {componentRef.current}
      </Modal>
    );
  },
  () => true
) as any;

EModal.show = (component: JSX.Element, eModalOption: EModalOption) =>
  console.log("EModal is not mounted.");

export { EModal };
