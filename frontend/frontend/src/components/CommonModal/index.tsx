import React, { useState } from 'react';
import { Modal } from 'antd';

interface CommonModalProps {
  title: string;
  width?: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onOK?: () => void;
  children: any;
}

const CommonModal: React.SFC<CommonModalProps> = ({
  title,
  width,
  visible,
  setVisible,
  children,
  onOK = () => {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const ok = async () => {
    setLoading(true);
    await onOK();
    setLoading(false);
  };

  return (
    <Modal
      title={title}
      width={width === undefined ? 650 : width}
      visible={visible}
      centered={true}
      destroyOnClose={true}
      onCancel={() => setVisible(false)}
      onOk={ok}
      confirmLoading={loading}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
