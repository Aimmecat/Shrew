/*
 * @文件描述: 入口页面
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-06-13 10:35:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 17:15:28
 */

import { useState } from 'react';
import { ConfigProvider, Layout, Avatar, Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// 设置dayjs中文
import 'dayjs/locale/zh-cn';
import Breadcrumb from './components/Breadcrumb';
import NavMenu from './components/NavMenu';
import ChangePwModal from './components/ChangePwModal';
import user from '@/utils/user';
import styles from './index.less';
import { history } from 'umi';

const { Sider, Content, Header } = Layout;
interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}
interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}
interface PageBasicPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: any;
}

function BasicLayout(props: PageBasicPropsModel) {
  const [visible, setVisible] = useState(false);
  const { avatar, userName } = user.getUserInfo();

  function changePassword() {
    setVisible(true);
  }

  // 取消
  function handleCancel() {
    setVisible(false);
  }

  // 提交
  async function handleSubmit(values: any) {
    setVisible(false);
    const result = await resetPassword(values);
    if (result) {
      message.success('修改密码成功');
    }
  }
  const logout = () => {
    user.logout();
    history.push('/user/login');
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.title}>
            <div className={styles.titleText}>我的信息管理系统</div>
            <div className={styles.userInfo}>
              <Avatar
                className={styles.avatar}
                src={avatar || require('@/assets/home/avatar.png')}
              />
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a onClick={logout}>退出</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a onClick={changePassword}>修改密码</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div className={styles.userName}>
                  <span className={styles.name}>{userName}</span>
                  <DownOutlined />
                </div>
              </Dropdown>
              <ChangePwModal
                visible={visible}
                cancel={handleCancel}
                submit={handleSubmit}
              />
            </div>
          </div>
        </Header>
        <Layout>
          <Sider collapsible={false} className={styles.side}>
            <NavMenu location={props.location} match={props.match} />
          </Sider>
          <Content className={styles.contentWrap}>
            <Breadcrumb />
            <div className={styles.content}>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
