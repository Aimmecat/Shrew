import { ButtonType } from 'antd/lib/button';

export interface ButtonItem {
  text: string;
  icon?: any;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  onClick: () => void;
}

/**
 * 字典数据模型
 */
export interface OptionItem {
  label: string;
  value: string | number;
}