interface MetaData {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const updateMetaTags = (data: MetaData) => {
  // Update document title
  document.title = data.title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', data.description);
  }

  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', data.title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', data.description);
  }

  if (data.image) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', data.image);
    }
  }

  if (data.url) {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', data.url);
    }
  }

  // Update Twitter Card
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', data.title);
  }

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', data.description);
  }

  if (data.image) {
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', data.image);
    }
  }
};

export const getMetaDataForSection = (sectionId: string, language: string = 'en') => {
  const baseUrl = 'https://tainguyen-profile.is-a.dev';
  const baseImage = 'https://res.cloudinary.com/doivdewue/image/upload/v1756521048/images_1_qc6a7g.jpg';
  
  const metaData: Record<string, MetaData> = {
    home: {
      title: language === 'en' 
        ? 'Nguyễn Công Khánh Tài | Backend Developer Portfolio' 
        : 'Nguyễn Công Khánh Tài | Portfolio Lập Trình Viên Backend',
      description: language === 'en'
        ? 'Backend Developer & Software Engineer - gamer, coder, designer, creator'
        : 'Lập Trình Viên Backend & Kỹ Sư Phần Mềm - gamer, coder, designer, creator',
      image: baseImage,
      url: baseUrl
    },
    about: {
      title: language === 'en'
        ? 'About Me | Tài Nguyễn - Backend Developer'
        : 'Giới Thiệu | Tài Nguyễn - Lập Trình Viên Backend',
      description: language === 'en'
        ? 'Learn about my background, education, and technical skills in backend development'
        : 'Tìm hiểu về lý lịch, học vấn và kỹ năng kỹ thuật của tôi trong phát triển backend',
      image: baseImage,
      url: `${baseUrl}#about`
    },
    experience: {
      title: language === 'en'
        ? 'Work Experience | Tài Nguyễn Portfolio'
        : 'Kinh Nghiệm Làm Việc | Portfolio Tài Nguyễn',
      description: language === 'en'
        ? 'My professional journey in software development and system deployment'
        : 'Hành trình nghề nghiệp của tôi trong phát triển phần mềm và triển khai hệ thống',
      image: baseImage,
      url: `${baseUrl}#experience`
    },
    projects: {
      title: language === 'en'
        ? 'Featured Projects | Tài Nguyễn Portfolio'
        : 'Dự Án Nổi Bật | Portfolio Tài Nguyễn',
      description: language === 'en'
        ? 'Explore my recent projects including web applications, bots, and e-commerce solutions'
        : 'Khám phá các dự án gần đây của tôi bao gồm ứng dụng web, bot và giải pháp thương mại điện tử',
      image: baseImage,
      url: `${baseUrl}#projects`
    },
    contact: {
      title: language === 'en'
        ? 'Contact Me | Tài Nguyễn - Let\'s Connect'
        : 'Liên Hệ | Tài Nguyễn - Hãy Kết Nối',
      description: language === 'en'
        ? 'Get in touch for collaboration opportunities and exciting projects'
        : 'Liên hệ để có cơ hội hợp tác và các dự án thú vị',
      image: baseImage,
      url: `${baseUrl}#contact`
    }
  };

  return metaData[sectionId] || metaData.home;
};