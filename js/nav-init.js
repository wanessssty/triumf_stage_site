(function() {
  const CALCULATOR_HASH = '#sectionCalculator';
  const REVIEW_FORM_HASH = '#sectionReviewForm';
  const INSTANT_HASHES = new Set([CALCULATOR_HASH, REVIEW_FORM_HASH]);

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
        leaveReview: 'Залишити відгук',
        contacts: 'Контакти',
      },
      en: {
        home: 'Home',
        about: 'About us',
        sections: 'Sections',
        reviews: 'Reviews',
        services: 'Services',
        feedback: 'Contact form',
        leaveReview: 'Leave a review',
        contacts: 'Contacts',
      },
      pl: {
        home: 'Główna',
        about: 'O nas',
        sections: 'Sekcje',
        reviews: 'Opinie',
        services: 'Usługi',
        feedback: 'Kontakt',
        leaveReview: 'Zostaw opinię',
        contacts: 'Kontakty',
      },
      ru: {
        home: 'Главная',
        about: 'О нас',
        sections: 'Разделы',
        reviews: 'Отзывы',
        services: 'Услуги',
        feedback: 'Обратная связь',
        leaveReview: 'Оставить отзыв',
        contacts: 'Контакты',
      },
    };

    const dictionary = labels[lang] || labels.uk;
    const homeUrl = lang === 'uk' ? 'index.html' : 'home.html';
    const aboutUrl = 'about.html';
    const contactUrl = 'contact.html';
    const sectionBase = isHomePage ? '' : `${homeUrl}`;
    const reviewsUrl = `${sectionBase}#sectionReviews`;
    const leaveReviewUrl = `${sectionBase}#sectionReviewForm`;
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
        <a href="${leaveReviewUrl}" class="nav-link w-nav-link">${dictionary.leaveReview}</a>
      `,
    };
  };

  const isModifiedClick = (event) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

  const scrollToHashInstantly = (hash) => {
    if (!INSTANT_HASHES.has(hash) || window.location.hash !== hash) {
      return;
    }

    const targetId = hash.slice(1);
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    // Force instant jump in case any smooth-scroll behavior is active.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    root.style.scrollBehavior = previousBehavior;
  };

  const bindInstantHashLinks = () => {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href*="#"]');
      if (!link || isModifiedClick(event)) {
        return;
      }

      const linkUrl = new URL(link.getAttribute('href'), window.location.href);
      if (!INSTANT_HASHES.has(linkUrl.hash)) {
        return;
      }

      const isSamePage =
        linkUrl.origin === window.location.origin &&
        linkUrl.pathname === window.location.pathname &&
        linkUrl.search === window.location.search;

      event.preventDefault();

      if (isSamePage) {
        if (window.location.hash !== linkUrl.hash) {
          history.replaceState(null, '', `${window.location.pathname}${window.location.search}${linkUrl.hash}`);
        }
        scrollToHashInstantly(linkUrl.hash);
        return;
      }

      window.location.assign(`${linkUrl.pathname}${linkUrl.search}${linkUrl.hash}`);
    });
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

    bindInstantHashLinks();
    scrollToHashInstantly(CALCULATOR_HASH);
    scrollToHashInstantly(REVIEW_FORM_HASH);
  });
})();
