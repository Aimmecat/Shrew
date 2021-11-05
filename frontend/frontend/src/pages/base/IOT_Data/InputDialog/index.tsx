/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2021-11-05 21:50:04
 */
import { useEffect } from 'react';
import styles from './index.less';
import { Input, Form, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { TextArea } = Input;
export interface HomepageProps {
  visible: boolean;
  detailData?: defs.Iot_dataDTO;
  onClose: () => void;
  onSubmit: (data: defs.Iot_dataDTO) => void;
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
      title={!!props.detailData ? '修改设备' : '新增设备'}
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
          name="equipmentId"
          rules={[{ required: true, message: '请输入设备名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="位置："
          name="location"
          rules={[{ required: true, message: '请输入设备位置' }]}
        >
          <Input />
        </Form.Item>

    
      </Form>
    </Modal>
  );
}
