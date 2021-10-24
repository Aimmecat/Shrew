/*
 * @文件描述: 登录页面
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-04-09 17:51:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-19 21:59:35
 */

import { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, useLocation } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import user from '@/utils/user';
import styles from './index.less';

const FormItem = Form.Item;

function Login() {
  const [form] = Form.useForm();
  const { query } = useLocation() as any;
  let tenantCode = location.pathname;
  if (tenantCode.startsWith('/portal')) {
    tenantCode = tenantCode.substring(8);
    console.dir('tenantCode=' + tenantCode);
    const index = tenantCode.indexOf('/');
    if (index >= 0) {
      tenantCode = tenantCode.substring(0, index);
    }
  } else {
    tenantCode = '';
  }

  const onFinish = async (values: any) => {
    const result = await API.system.login.request({
      ...values,
      tenantCode,
    });
    if (result) {
      user.saveUserInfo({
        userName: result.userName,
        userCode: result.userCode,
        password: values.password,
      });
      user.saveToken(result.accessToken!);

      if (query.redirectUrl) {
        history.push(query.redirectUrl);
      } else {
        history.push('/');
      }
    }
  };

  useEffect(() => {
    const { userName, password } = user.getUserInfo();
    if (userName && password) {
      form.setFieldsValue({
        userName,
        password,
        remember: true,
      });
    }
  }, [form]);

  return (
    <div className={styles.loginWrap}>
      <div className={styles.img} />
      <div className={styles.loginContent}>
        <strong className={styles.title}>实验室设备管理系统</strong>
        <Form
          name="nest-messages"
          form={form}
          onFinish={onFinish}
          className={styles.loginForm}
        >
          <FormItem
            name="userId"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input
              placeholder="请输入账号"
              prefix={<UserOutlined />}
              className={styles.loginInput}
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              prefix={<LockOutlined />}
              className={styles.loginInput}
            />
          </FormItem>
          <Form.Item
            name="remember"
            valuePropName="checked"
            className={styles.remember}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className={styles.btnItem}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
