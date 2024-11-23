import React from 'react';
import CustomCard from '../ui/CustomCard';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/redux/slices/authSlice';

const Posts = ({ data }) => {
  const user = useSelector(selectUser);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {data?.map((subData) => {
        return (
          <CustomCard
            key={subData?.id}
            title={subData?.title}
            content={subData?.content}
            image={
              subData?.Images.length
                ? `data:image/png;base64,${subData?.Images[0]?.url}`
                : null
            }
            isMyAsset={user.id === subData?.userId}
            status={subData?.status ?? 'pending'}
            postId={subData.id}
          />
        );
      })}
    </div>
  );
};

export default Posts;
