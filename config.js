'use strict';

module.exports = {
  url: 'https://curious-notes.netlify.com',
  pathPrefix: '/',
  title: 'Curious Notes By Curie',
  subtitle: 'Daily Learning Journals by Curious-Curie',
  copyright: '© All rights reserved.',
  disqusShortname: '',
  postsPerPage: 8,
  // googleAnalyticsId: 'UA-73379983-2',
  useKatex: false,
  menu: [
    {
      label: 'Notes',
      path: '/'
    },
    {
      label: 'About',
      path: '/pages/about'
    },
    {
      label: 'Tags',
      path: '/tags'
    },
    // {
    //   label: 'Contact me',
    //   path: '/pages/contacts'
    // }
  ],
  author: {
    name: 'Curie Yoo',
    photo: 'media/profile.jpeg',
    bio: `Frontend Developer\n
    📍 Seoul, Korea | Naver Corp.`,
    contacts: {
      email: 'curious.curieyoo@gmail.com',
      facebook: 'curie.yoo',
      github: 'curious-curie',
      rss: 'https://curious-curie.github.io/curious-page/',
      linkedin: 'curie-yoo-213871151',
      instagram: 'curious.curie',
    }
  }
};
