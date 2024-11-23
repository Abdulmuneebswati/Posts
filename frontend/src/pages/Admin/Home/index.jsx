import React from 'react';
import PromiseBuilder from '../../../utils/promisebuilder';
import { getAllPosts } from '../../../services/api/posts';
import { selectUser } from '../../../store/redux/slices/authSlice';
import { useSelector } from 'react-redux';
import Posts from '../../../components/Posts/Posts';

const index = () => {
  const user = useSelector(selectUser);

  return (
    <div className='container'>
      <h1 className=''>Posts</h1>
      <div className='padding-pages'>
        <PromiseBuilder
          fetchKey={['get-all-posts']}
          enabled={true}
          promiseFn={() => getAllPosts(user.id)}
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

export default index;
