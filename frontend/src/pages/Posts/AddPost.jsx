import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/ui/InputField';
import CustomButton from '../../components/ui/CustomButton';
import { createPostFields } from '../../constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/redux/slices/authSlice';
import {
  addPost,
  deletePost,
  editPostCall,
  getPost,
} from '../../services/api/posts';

const AddPost = () => {
  const { post, postId } = useParams();
  const isEdit = post === 'edit-post';
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-post'],
    mutationFn: (Data) => addPost(user.id, Data),
    onSuccess: (Data) => {
      message.success('Post Added');
      navigate('/users');
    },
  });
  const { mutate: editPost, isPending: editPostPending } = useMutation({
    mutationKey: ['edit-post'],
    mutationFn: (Data) => editPostCall(user.id, postId, Data),
    onSuccess: (Data) => {
      message.success('Post Edited');
      navigate('/users');
    },
  });
  const { mutate: deletePostPush, isPending: deletePostPending } = useMutation({
    mutationKey: ['add-post'],
    mutationFn: () => deletePost(user.id, postId),
    onSuccess: () => {
      message.success('Post Deleted');
      navigate('/users');
    },
  });
  const { data, isPending: postLoading } = useQuery({
    queryKey: ['get-post'],
    queryFn: () => getPost(user.id, postId),
    enabled: isEdit,
  });

  const onFinish = (values) => {
    const isFormDirty = form.isFieldsTouched();
    if (isFormDirty) {
      const push = isEdit ? editPost : mutate;
      push(values);
    }
  };

  useEffect(() => {
    if (isEdit && data && !postLoading) {
      form.setFieldsValue({
        title: data?.title,
        content: data?.content,
      });
    }
  }, [data, isEdit, postLoading, form]);
  if (isEdit && postLoading) {
    return '...Loading';
  }

  return (
    <div className='container'>
      <h1 className='heading'>{isEdit ? 'Edit' : 'Add'} Post</h1>
      {isEdit && (
        <CustomButton
          type='primary'
          text='Delete Post'
          loading={deletePostPending}
          onClick={() => deletePostPush()}
        />
      )}
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        form={form}
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
        {createPostFields.map(({ label, type, rules, id }) => {
          return (
            <InputField
              type={type}
              label={label}
              key={id}
              rules={rules}
              initialValue={
                isEdit ? `data:image/png;base64,${data?.Images[0]?.url}` : null
              }
            />
          );
        })}

        <Form.Item label={null}>
          <CustomButton
            text='Submit'
            htmlType='submit'
            type='primary'
            loading={isPending || editPostPending}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPost;
