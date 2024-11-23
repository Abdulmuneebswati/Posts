import React from 'react';
import { getMyPosts } from '../../services/api/posts';
import PromiseBuilder from '../../utils/promisebuilder';
import Posts from '../../components/Posts/Posts';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/redux/slices/authSlice';

const MyPosts = () => {
  const user = useSelector(selectUser);
  return (
    <div className='container'>
      <h1 className=''>My Posts</h1>

      <div className='padding-pages'>
        <PromiseBuilder
          fetchKey={['get-my-posts']}
          enabled={true}
          promiseFn={() => getMyPosts(user.id)}
        >
          {({ data, isLoading, error }) => {
            if (isLoading) {
              return <div className=''>...Loading</div>;
            }

            if (error) {
              return <div>{error.message}</div>;
            }

            if (data?.length === 0) {
              return <div>Data is Empty</div>;
            }

            return <Posts data={data} />;
          }}
        </PromiseBuilder>
      </div>
    </div>
  );
};

export default MyPosts;
