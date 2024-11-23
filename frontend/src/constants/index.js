export const signinFields = [
  {
    id: 1,
    label: 'email',
    type: 'email',
    rules: [
      {
        required: true,
        message: 'Please input your email!',
      },
    ],
  },
  {
    id: 2,
    label: 'password',
    type: 'password',
    rules: [
      {
        required: true,
        message: 'Please input your password!',
      },
    ],
  },
];

export const createPostFields = [
  {
    id: 1,
    label: 'title',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please input your title!',
      },
    ],
  },
  {
    id: 2,
    label: 'content',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please input your content!',
      },
    ],
  },
  {
    id: 3,
    label: 'image',
    type: 'upload',
    rules: [
      {
        required: true,
        message: 'Please input your content!',
      },
    ],
  },
];

export const menuItems = [
  {
    label: 'Posts',
    key: 'posts',
  },
  {
    label: 'Create Posts',
    key: 'createposts',
  },
  {
    label: 'My Posts',
    key: 'myposts',
  },
];

export const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  header: {
    position: 'relative',
  },
  menu: {
    backgroundColor: 'transparent',
    borderBottom: 'none',
    width: '100%',
  },
  menuContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
};
