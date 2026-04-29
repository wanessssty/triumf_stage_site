(function() {
  if (document.documentElement) {
    document.documentElement.classList.add('nav-initializing');
  }

  const getLanguage = (path) => {
    if (path.includes('/en/')) return 'en';
    if (path.includes('/pl/')) return 'pl';
    if (path.includes('/ru/')) return 'ru';
    return 'uk';
  };

  const getPageName = (path) => {
    const cleanPath = path.split('?')[0].split('#')[0];
    const segments = cleanPath.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  };

  const buildMenuLinks = () => {
    const path = window.location.pathname;
    const lang = getLanguage(path);
    const page = getPageName(path);

    const isHomePage =
      page === 'index.html' ||
      page === 'home.html' ||
      page === '';

    const labels = {
      uk: {
        home: 'Головна',
        about: 'Про нас',
        sections: 'Розділи',
        reviews: 'Відгуки',
        services: 'Послуги',
        feedback: "Зворотний зв'язок",
        contacts: 'Контакти',
      },
      en: {
        home: 'Home',
        about: 'About us',
        sections: 'Sections',
        reviews: 'Reviews',
        services: 'Services',
        feedback: 'Contact form',
        contacts: 'Contacts',
      },
      pl: {
        home: 'Główna',
        about: 'O nas',
        sections: 'Sekcje',
        reviews: 'Opinie',
        services: 'Usługi',
        feedback: 'Kontakt',
        contacts: 'Kontakty',
      },
      ru: {
        home: 'Главная',
        about: 'О нас',
        sections: 'Разделы',
        reviews: 'Отзывы',
        services: 'Услуги',
        feedback: 'Обратная связь',
        contacts: 'Контакты',
      },
    };

    const dictionary = labels[lang] || labels.uk;
    const homeUrl = lang === 'uk' ? 'index.html' : 'home.html';
    const aboutUrl = 'about.html';
    const contactUrl = 'contact.html';
    const sectionBase = isHomePage ? '' : `${homeUrl}`;
    const reviewsUrl = `${sectionBase}#sectionReviews`;
    const servicesUrl = `${sectionBase}#sectionServices`;
    const feedbackUrl = `${sectionBase}#sectionContact`;
    const homeLink = isHomePage ? '#Top' : homeUrl;

    return {
      html: `
        <a href="${homeLink}" class="nav-link w-nav-link${isHomePage ? ' w--current' : ''}"${isHomePage ? ' aria-current="page"' : ''}>${dictionary.home}</a>
        <a href="${aboutUrl}" class="nav-link w-nav-link${page === 'about.html' ? ' w--current' : ''}"${page === 'about.html' ? ' aria-current="page"' : ''}>${dictionary.about}</a>
        <div data-hover="false" data-delay="0" class="nav-sections-dropdown w-dropdown">
          <div class="nav-link w-dropdown-toggle">
            <div class="w-icon-dropdown-toggle"></div>
            <div>${dictionary.sections}</div>
          </div>
          <nav class="w-dropdown-list">
            <a href="${reviewsUrl}" class="nav-sections-link w-dropdown-link">${dictionary.reviews}</a>
            <a href="${servicesUrl}" class="nav-sections-link w-dropdown-link">${dictionary.services}</a>
            <a href="${feedbackUrl}" class="nav-sections-link w-dropdown-link">${dictionary.feedback}</a>
          </nav>
        </div>
        <a href="${contactUrl}" class="nav-link w-nav-link${page === 'contact.html' ? ' w--current' : ''}"${page === 'contact.html' ? ' aria-current="page"' : ''}>${dictionary.contacts}</a>
      `,
    };
  };

  document.addEventListener('DOMContentLoaded', () => {
    const navMenus = document.querySelectorAll('.nav-menu.w-nav-menu');
    if (!navMenus.length) {
      return;
    }

    const { html } = buildMenuLinks();
    navMenus.forEach((menu) => {
      menu.innerHTML = html;
    });

    try {
      if (window.Webflow && typeof window.Webflow.require === 'function') {
        const dropdown = window.Webflow.require('dropdown');
        const navbar = window.Webflow.require('navbar');
        dropdown && typeof dropdown.ready === 'function' && dropdown.ready();
        navbar && typeof navbar.ready === 'function' && navbar.ready();
      }
    } catch (error) {
      // Keep menu rendering even if Webflow modules are unavailable.
    }
  });
})();
