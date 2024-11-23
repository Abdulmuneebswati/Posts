import React from 'react';

import { Form } from 'antd';
import InputField from '../../components/ui/InputField';
import { signinFields } from '../../constants';
import CustomButton from '../../components/ui/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../services/api/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: ({ email, password }) => signIn(email, password),
    onSuccess: (Data) => {
      const { token, ...rest } = Data;
      dispatch(setCredentials({ user: rest, token }));
      if (rest.role === 'admin') navigate('/admin');
      else if (rest.role === 'default') navigate('/users');
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className='container'>
      <h1 className='heading'>Signin</h1>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        {signinFields.map(({ label, type, rules, id }) => {
          return (
            <InputField
              type={type}
              label={label}
              key={id}
              rules={rules}
            />
          );
        })}

        <Form.Item label={null}>
          <CustomButton
            text='Submit'
            htmlType='submit'
            type='primary'
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
