import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/redux/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approvePost } from '../../services/api/posts';

const { Meta } = Card;

const CustomCard = ({ image, title, content, status, isMyAsset, postId }) => {
  const isPending = status === 'pending';
  const navigate = useNavigate();
  const handleClickCard = (postId) => {
    if (isMyAsset) {
      navigate(`/users/posts/edit-post/${postId}`);
    }
  };
  const user = useSelector(selectUser);
  const isAdmin = user.role === 'admin';
  const queryClient = useQueryClient();
  const { mutate, isPending: approveRequestPending } = useMutation({
    mutationKey: ['approve-post'],
    mutationFn: (Data) => approvePost(user.id, Data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-posts'] });
    },
  });

  const handleApprovePost = () => {
    mutate({
      id: postId,
      status: 'approved',
    });
  };
  return (
    <Card
      hoverable
      style={{
        width: 240,
        position: 'relative',
      }}
      onClick={() => handleClickCard(postId)}
      cover={
        image ? (
          <img
            alt='example'
            src={image}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              filter: isPending ? 'blur(4px)' : 'none',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              color: '#999',
              filter: isPending ? 'blur(4px)' : 'none',
            }}
          >
            No Image To display
          </div>
        )
      }
    >
      {isPending && (
        <Button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '14px',
          }}
          loading={approveRequestPending}
          onClick={() => {
            if (!isAdmin) return;
            handleApprovePost();
          }}
        >
          {isAdmin ? 'Approve Now?' : 'Pending'}
        </Button>
      )}
      <Meta
        title={title}
        description={content}
        style={
          {
            // filter: isPending ? 'blur(4px)' : 'none',
          }
        }
      />
      {isMyAsset}
    </Card>
  );
};

export default CustomCard;
