/*
 * @Description: 自定义上传组件
 * @Company: 山东大学
 * @Author: luhengchang
 * @Date: 2019-06-07 11:45:45
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-07-16 21:43:27
 */
import * as React from 'react';
import { Upload, message } from 'antd';

import styles from './index.less';
import user from '@/utils/user';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';
import { BACKEND_URL } from '@/constants';

interface ImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange?: (imageUrl: string | undefined) => void;
}

function ImageUpload(props: ImageUploadProps) {
  const { value, disabled, onChange } = props;
  const [loading, setLoading] = React.useState(false);
  return (
    <Upload
      listType="picture-card"
      className={styles.avatarUploader}
      disabled={disabled}
      showUploadList={false}
      action={`${BACKEND_URL}/upload/public`}
      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
      data={{ access_token: user.getToken() }}
      beforeUpload={file => {
        return new Promise((resolve, reject) => {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            reject(false);
          }
          resolve();
        });
      }}
      onChange={({ file }) => {
        const { status } = file;
        if (status === 'uploading') {
          setLoading(true);
          return;
        }

        if (status === 'done') {
          onChange && onChange(file.response.data);
          return;
        }
      }}
    >
      {value ? (
        <img src={value} alt="avatar" />
      ) : (
        <div>
          <p className="ant-upload-drag-icon">
            {loading ? <LoadingOutlined /> : <InboxOutlined />}}
          </p>
          <p className="ant-upload-text">点击上传</p>
        </div>
      )}
    </Upload>
  );
}

export default ImageUpload;
