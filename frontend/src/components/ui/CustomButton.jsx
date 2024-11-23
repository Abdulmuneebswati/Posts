import { Button } from 'antd';
import React from 'react';

const CustomButton = ({ text, type, htmlType, onClick ,loading}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      loading={loading}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
