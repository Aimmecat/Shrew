/*
 * @Author: your name
 * @Date: 2021-04-16 11:03:16
 * @LastEditTime: 2021-04-17 20:58:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\pages\base\myhw\InputDialog\index.tsx
 */

import { useEffect } from 'react';
import styles from './index.less';
import { Input, Form, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface HomepageProps {
  visible: boolean;
  detailData?: defs.MyhwDTO;
  onClose: () => void;
  onSubmit: (data: defs.MyhwDTO) => void;
}

export default function InputForm(props: HomepageProps) {
  const [form] = useForm();
  useEffect(() => {
    console.dir(props.detailData);
    if (props.detailData) {
      form.setFieldsValue(props.detailData);
    } else {
      form.resetFields();
    }
  }, [props.detailData, props.visible]);

  const onFinish = (values: any) => {
    props.onSubmit(values);
  };
  return (
    <Modal
      title={!!props.detailData ? '修改名称' : '新增名称'}
      visible={props.visible}
      width={500}
      okText="确定"
      centered
      getContainer={false}
      onCancel={() => {
        props.onClose();
      }}
      onOk={form.submit}
    >
      <Form
        {...layout}
        name="basic"
        form={form}
        className={styles.form}
        onFinish={onFinish}
      >
        <Form.Item
          label="设备名称："
          name="equipmentName"
          rules={[{ required: true, message: '请输入设备名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="使用人："
          name="userPeople"
          rules={[{ required: true, message: '请输入使用人' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="价格"
          name="equipmentValue"
          rules={[{ required: true, message: '请输入设备价格' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="房间号："
          name="homeId"
          rules={[{ required: true, message: '请输入房间号' }]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
}



