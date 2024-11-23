import React from 'react';
import { Form, Input, message, Upload } from 'antd';

const InputField = ({ type, label, rules, initialValue }) => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (type === 'password') {
    return (
      <Form.Item
        label={label}
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    );
  }
  if (type === 'upload') {
    return (
      <Form.Item
        label={label}
        valuePropName='fileList'
        getValueFromEvent={normFile}
        name='image'
        initialValue={initialValue ? [{ url: initialValue }] : []}
      >
        <Upload
          action='/upload.do'
          listType='picture-card'
          maxCount={1}
        >
          {
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type='button'
            >
              +
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          }
        </Upload>
      </Form.Item>
    );
  } else {
    return (
      <>
        <Form.Item
          label={label}
          name={label}
          rules={rules}
          type={type}
        >
          <Input />
        </Form.Item>
      </>
    );
  }
};

export default InputField;
