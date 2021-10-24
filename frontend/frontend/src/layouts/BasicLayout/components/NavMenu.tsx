/*
 * @文件描述: 导航栏
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-27 19:16:48
 */

import { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Menu } from 'antd';
import { isEmpty } from 'lodash';
import { menuConfig } from '../config/menuConfig';
import styles from '../index.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
export interface NavMenuProps {
  location: any;
  match: any;
}

/**
 * 管理系统左侧菜单栏
 */
function NavMenu(props: NavMenuProps) {
  // 操作state
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 路由参数
  const { path } = props.match;
  const { pathname } = props.location;

  /**
   * @功能描述: 根据location的地址，自动选中和打开对应的菜单
   */
  useEffect(() => {
    let selectedKeys = [];
    let openKeys: any = [];
    // 判断url时候只包含一个 "/"
    if (pathname.match(/\//g)?.length === 1) {
      // selectedKeys = [pathname.replace('/', '') || 'home'];
      selectedKeys = [pathname.substring(1)];
      openKeys = [];
    } else {
      const keys = pathname.replace(path + '/', '').split('/');
      setOpenKeys([keys[1]]);
      setSelectedKeys([keys[2]]);
    }
  }, [pathname, path]);

  /**
   * 确定已选择菜单（只有一个）
   */
  function handleSelect(selectInfo: any) {
    const { key } = selectInfo;
    setSelectedKeys([key]);
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={handleSelect}
      onOpenChange={(openKeys) => {
        setOpenKeys([(openKeys as string[]).pop()!]);
      }}
    >
      {menuConfig.map((item) => {
        const Icon = item.icon;
        if (item.children && !isEmpty(item.children)) {
          return (
            <SubMenu
              key={item.key}
              title={
                <span className={styles.title}>
                  <Icon />
                  {item.name}
                </span>
              }
            >
              {item.children.map((ele) => (
                <MenuItem key={ele.key} className={styles.menuItem}>
                  <Link to={ele.link}>
                    <span className={styles.title}>{ele.name}</span>
                  </Link>
                </MenuItem>
              ))}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={item.key}>
            {item.link ? (
              <Link to={item.link}>
                <span className={styles.title}>
                  <Icon />
                  {item.name}
                </span>
              </Link>
            ) : (
              <span className={styles.title}>
                <Icon />
                {item.name}
              </span>
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
export default NavMenu;
