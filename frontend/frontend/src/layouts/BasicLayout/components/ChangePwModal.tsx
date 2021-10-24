/*
 * @文件描述: 修改密码modal
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-05-27 14:40:55
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-06-22 10:57:36
 */
import { Modal, Form, Input, Button } from 'antd';

interface Iprops {
  visible: boolean;
  cancel: () => void;
  submit: (values: any) => void;
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

function ChangePwModal(props: Iprops) {
  // form表单
  const [form] = Form.useForm();

  // 父级props
  const { visible, cancel, submit } = props;

  // 确定
  function handleSubmit() {
    form
      .validateFields()
      .then(({ oldPassword, newPassword }) => {
        submit({
          oldPassword,
          newPassword,
        });
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo);
      });
  }

  // 取消
  function handleCancel() {
    cancel();
    form.resetFields();
  }

  return (
    <Modal
      title="修改密码"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确认
        </Button>,
      ]}
    >
      <Form name="basic" form={form} {...formItemLayout}>
        <Form.Item
          label="旧密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入旧密码!' }]}
        >
          <Input.Password placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[{ required: true, message: '请输入新密码!' }]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="surePassword"
          rules={[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePwModal;
