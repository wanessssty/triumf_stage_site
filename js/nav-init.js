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
        leaveReview: 'Залишити відгук',
        contacts: 'Контакти',
      },
      en: {
        home: 'Home',
        about: 'About us',
        leaveReview: 'Leave a review',
        contacts: 'Contacts',
      },
      pl: {
        home: 'Główna',
        about: 'O nas',
        leaveReview: 'Zostaw opinię',
        contacts: 'Kontakty',
      },
      ru: {
        home: 'Главная',
        about: 'О нас',
        leaveReview: 'Оставить отзыв',
        contacts: 'Контакты',
      },
    };

    const dictionary = labels[lang] || labels.uk;
    const homeUrl = lang === 'uk' ? 'index.html' : 'home.html';
    const aboutUrl = 'about.html';
    const contactUrl = 'contact.html';
    const leaveReviewUrl = `${isHomePage ? '' : homeUrl}#sectionReviewForm`;
    const homeLink = isHomePage ? '#Top' : homeUrl;
    const leaveReviewButton = (extraClass = '') => `
        <a href="${leaveReviewUrl}" class="button-underline w-inline-block${extraClass ? ` ${extraClass}` : ''}">
          <div class="button-color">${dictionary.leaveReview}</div>
          <div class="line-animation">
            <div class="underline"></div>
          </div>
        </a>`;

    return {
      menuHtml: `
        <a href="${homeLink}" class="nav-link w-nav-link${isHomePage ? ' w--current' : ''}"${isHomePage ? ' aria-current="page"' : ''}>${dictionary.home}</a>
        <a href="${aboutUrl}" class="nav-link w-nav-link${page === 'about.html' ? ' w--current' : ''}"${page === 'about.html' ? ' aria-current="page"' : ''}>${dictionary.about}</a>
        <a href="${contactUrl}" class="nav-link w-nav-link${page === 'contact.html' ? ' w--current' : ''}"${page === 'contact.html' ? ' aria-current="page"' : ''}>${dictionary.contacts}</a>
        ${leaveReviewButton('nav-link menu leave-review-mobile')}
      `,
      leaveReviewHtml: `
        <div class="leave-review-nav">
          ${leaveReviewButton()}
        </div>
      `,
    };
  };

  const bindUnderlineHover = (root) => {
    root.querySelectorAll('.button-underline').forEach((button) => {
      const underline = button.querySelector('.underline');
      if (!underline || button.dataset.underlineBound === '1') {
        return;
      }

      button.dataset.underlineBound = '1';
      underline.style.transform = 'translate3d(-101%, 0px, 0px)';

      button.addEventListener('mouseenter', () => {
        underline.style.transition = 'transform 300ms ease';
        underline.style.transform = 'translate3d(0%, 0px, 0px)';
      });

      button.addEventListener('mouseleave', () => {
        underline.style.transition = 'transform 300ms ease';
        underline.style.transform = 'translate3d(100%, 0px, 0px)';

        const reset = (event) => {
          if (event && event.propertyName && event.propertyName !== 'transform') {
            return;
          }
          underline.removeEventListener('transitionend', reset);
          underline.style.transition = 'none';
          underline.style.transform = 'translate3d(-101%, 0px, 0px)';
        };

        underline.addEventListener('transitionend', reset);
      });
    });
  };

  const placeLeaveReviewAfterOnlineRequest = (leaveReviewHtml) => {
    document.querySelectorAll('.flex-nav-button').forEach((container) => {
      container.querySelectorAll('.leave-review-nav').forEach((node) => node.remove());

      const wrapper = document.createElement('div');
      wrapper.innerHTML = leaveReviewHtml.trim();
      const leaveReviewNode = wrapper.firstElementChild;
      if (!leaveReviewNode) {
        return;
      }

      const onlineRequest = container.querySelector('.email-flex');
      const authButton = container.querySelector('.auth-button_nav');

      if (onlineRequest && onlineRequest.parentNode === container) {
        onlineRequest.insertAdjacentElement('afterend', leaveReviewNode);
      } else if (authButton && authButton.parentNode === container) {
        container.insertBefore(leaveReviewNode, authButton);
      } else {
        container.appendChild(leaveReviewNode);
      }

      bindUnderlineHover(leaveReviewNode);
    });
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
        if (linkUrl.hash === CALCULATOR_HASH) {
          window.dispatchEvent(new CustomEvent('triumph:open-calculator'));
        }
        if (linkUrl.hash === REVIEW_FORM_HASH) {
          window.dispatchEvent(new CustomEvent('triumph:open-review'));
        }
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

    const { menuHtml, leaveReviewHtml } = buildMenuLinks();
    navMenus.forEach((menu) => {
      menu.innerHTML = menuHtml;
      bindUnderlineHover(menu);
    });
    placeLeaveReviewAfterOnlineRequest(leaveReviewHtml);

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

    document.documentElement.classList.remove('nav-initializing');
    document.documentElement.classList.add('nav-initialized');
  });
})();
