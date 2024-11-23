const Endpoints = {
  signin: `http://localhost:500/api/users/signin`,
  getAllPost: (userId) => `api/posts/${userId}/all`,
  getMyPosts: (userId) => `api/posts/${userId}`,
  addPost: (userId) => `api/posts/${userId}`,
  editPost: (userId, postId) => `api/posts/${userId}/${postId}`,
  getPost: (userId, postId) => `api/posts/${userId}/${postId}`,
  approvePost: (userId) => `api/admin/${userId}/approve`,
};

export default Endpoints;
