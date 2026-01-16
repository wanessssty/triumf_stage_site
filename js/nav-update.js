(() => {
  'use strict';

  const translations = {
    uk: {
      searchWagon: 'Пошук вагона',
      login: 'Увійти',
      logout: 'Вийти'
    },
    ru: {
      searchWagon: 'Поиск вагона',
      login: 'Войти',
      logout: 'Выйти'
    },
    en: {
      searchWagon: 'Wagon Search',
      login: 'Sign in',
      logout: 'Sign out'
    },
    pl: {
      searchWagon: 'Wyszukiwanie wagonu',
      login: 'Zaloguj się',
      logout: 'Wyloguj się'
    }
  };

  const detectLanguage = () => {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(p => p);
    const langDirs = ['ru', 'pl', 'en'];
    for (let i = 0; i < pathParts.length; i++) {
      if (langDirs.includes(pathParts[i])) {
        return pathParts[i];
      }
    }
    return 'uk';
  };

  const currentLang = detectLanguage();
  const t = (key) => translations[currentLang]?.[key] || translations.uk[key] || key;

  const isAuthenticated = () => {
    if (typeof window.triumphAuth !== 'undefined' && window.triumphAuth.check) {
      return window.triumphAuth.check();
    }
    const authStatus = localStorage.getItem('triumph_authenticated');
    if (authStatus !== 'true') return false;
    
    const timestamp = localStorage.getItem('triumph_auth_timestamp');
    if (!timestamp) return false;
    
    const AUTH_TIMEOUT = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const authTime = parseInt(timestamp, 10);
    
    if (now - authTime > AUTH_TIMEOUT) {
      localStorage.removeItem('triumph_authenticated');
      localStorage.removeItem('triumph_auth_timestamp');
      localStorage.removeItem('triumph_user_email');
      return false;
    }
    
    return true;
  };

  const getSearchPath = () => {
    const lang = currentLang;
    if (lang === 'ru') return 'search.html';
    if (lang === 'pl') return 'search.html';
    if (lang === 'en') return 'search.html';
    return 'search.html';
  };

  const addSearchMenuItem = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const existingSearchLink = navMenu.querySelector('a[href*="search.html"]');
    if (existingSearchLink) {
      existingSearchLink.style.display = '';
      return;
    }

    const searchLink = document.createElement('a');
    searchLink.href = getSearchPath();
    searchLink.className = 'nav-link w-nav-link';
    searchLink.textContent = t('searchWagon');
    
    const contactLink = navMenu.querySelector('a[href*="contact"]');
    if (contactLink) {
      contactLink.insertAdjacentElement('afterend', searchLink);
    } else {
      navMenu.appendChild(searchLink);
    }
  };

  const hideSearchMenuItem = () => {
    const searchLink = document.querySelector('.nav-menu a[href*="search.html"]');
    if (searchLink) {
      searchLink.style.display = 'none';
    }
  };

  const updateAuthButton = () => {
    const authButtonContainer = document.querySelector('.auth-button_nav');
    if (!authButtonContainer) return;

    const authLink = authButtonContainer.querySelector('a');
    if (!authLink) return;

    const buttonColor = authLink.querySelector('.button-color');
    if (!buttonColor) return;

    if (isAuthenticated()) {
      buttonColor.textContent = t('logout');
      authLink.href = '#';
      authLink.onclick = (e) => {
        e.preventDefault();
        if (window.triumphAuth && window.triumphAuth.logout) {
          window.triumphAuth.logout();
        } else {
          localStorage.removeItem('triumph_authenticated');
          localStorage.removeItem('triumph_auth_timestamp');
          localStorage.removeItem('triumph_user_email');
        }
        window.location.href = getAuthPath();
      };
    } else {
      buttonColor.textContent = t('login');
      authLink.href = getAuthPath();
      authLink.onclick = null;
    }
  };

  const getAuthPath = () => {
    const lang = currentLang;
    if (lang === 'ru') return 'auth.html';
    if (lang === 'pl') return 'auth.html';
    if (lang === 'en') return 'auth.html';
    return 'auth.html';
  };

  const updateNavigation = () => {
    if (isAuthenticated()) {
      addSearchMenuItem();
    } else {
      hideSearchMenuItem();
    }
    updateAuthButton();
    
    document.documentElement.classList.remove('nav-initializing');
    document.documentElement.classList.add('nav-initialized');
  };

  window.updateNavigation = updateNavigation;

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateNavigation);
    } else {
      updateNavigation();
    }

    const checkInterval = setInterval(() => {
      updateNavigation();
    }, 1000);

    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  };

  init();
})();
