const example = {
  logo: '/logo.png',
  logoAlt: 'University Logo',
  login: false,
  loginHref: '/login',
  cta: false,
  ctaTitle: 'Sign Up',
  ctaBtnHref: '/register',
  menuItems: [
    { title: 'home', href: '/', useLink: false },
    { title: 'FAQ', href: '/faq', useLink: true },
    { title: 'articles', href: '/articles', useLink: true },
    {
      title: 'programs',
      href: '#',
      disabled: true, // does not have a link only for flyouts
      full: false, // default is false
      subMenu: [
        {
          title: 'Campus Life',
          href: '#',
          useLink: true,
          description: 'Explore housing, dining, clubs, and student resources',
          image: '/DefaultMetaData.jpg',
          imageAlt: 'Students walking on campus',
        },
        { title: 'Undergraduate Programs', href: '#', useLink: true },
        { title: 'Graduate Programs', href: '#', useLink: true },
        { title: 'PhD Programs', href: '#', useLink: true },
        { title: 'Online Programs', href: '#', useLink: true },
        { title: 'Professional Development', href: '#', useLink: true },
      ],
    },
  ],
}