import React from "react";

import { Modal, Button } from "antd";

interface DetailProps {
  onClose: () => void;
  onOk: () => void;
  visible: boolean;
}

const Detail = ({ onClose, onOk, visible }: DetailProps) => {
  return (
    <>
      <Modal
        title='Basic Modal'
        visible={visible}
        onOk={onOk}
        onCancel={onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
Detail.defaultProps = {
  onClose: () => {},
  onOk: () => {},
  visible: false,
} as DetailProps;
export default Detail;
