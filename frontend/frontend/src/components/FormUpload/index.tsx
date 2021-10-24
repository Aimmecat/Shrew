/*
 * @文件描述: form表单对应的上传
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-05-22 10:30:06
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-02 12:16:15
 */

import React, { useState } from 'react';
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '@/utils';
import styles from './index.less';

//const { upload } = publicService;
const upload = async (data: any) => {};

interface IProps {
  title: string;
  onChange: ({ file, fileList }: any) => void;
  fileList: any[];
  accept?: string;
  disabled?: boolean;
}

export default function FormUpload(props: IProps) {
  const { title, onChange, fileList, accept, disabled = false } = props;

  // 是否是pdf
  const isPdf = accept === '.pdf';

  // 操作state
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitlet] = useState('');

  // 自定义上传
  async function customRequest(options: any) {
    const formData = new FormData();
    formData.append('file', options.file);
    const result = await upload(formData);
    if (result.success) {
      options.onSuccess({ ...options.file, url: result.data, status: 'done' });
    }
  }

  // 预览上传的图片
  const handlePreview = async (file: any) => {
    if (isPdf) {
      window.open(file.url);
      return;
    }

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitlet(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  // 取消预览
  function handleCancel() {
    setPreviewVisible(false);
  }

  // 上传按钮
  function uploadButton(title: string) {
    return (
      <>
        <PlusOutlined />
        <div className="ant-upload-text">{title}</div>
        {/* <div className="ant-upload-text">
          {accept ? `格式为：${accept}` : ''}
        </div> */}
      </>
    );
  }

  return (
    <>
      <Upload
        disabled={disabled}
        name="businessLicense"
        listType="picture-card"
        className={`${styles.upload} ${isPdf && styles.pdfUpload}`}
        accept={accept}
        customRequest={customRequest}
        onChange={onChange}
        onPreview={handlePreview}
        fileList={fileList}
      >
        {fileList.length >= 1 ? null : uploadButton(title)}
      </Upload>
      {isPdf && fileList.length >= 1 && (
        <Button
          type="link"
          onClick={() =>
            window.open(
              fileList[0].url ||
                (fileList[0].response && fileList[0].response.url),
            )
          }
        >
          查看
        </Button>
      )}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
