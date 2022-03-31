
const admin = {
  sections: [
    {
      label: 'service',
      items: [
        { label: 'user', link: '/users' },
        { label: 'post', link: '/posts' },
        { label: 'image', link: '/images' },
      ]
    },
    {
      label: 'admin',
      items: [
        { label: 'operator', link: '/operators' },
      ]
    },
  ],
  schemas: {
    users: {
      label: 'user',
      headings: [
        {
          key: 'icon_image.url',
          label: 'Icon',
          type: 'image',
        },
        {
          key: 'id',
          label: 'ID',
          type: 'text',
        },
        {
          key: 'screen_name',
          label: 'name',
          type: 'text',
        },
      ],
    },
  }
};

export default admin;