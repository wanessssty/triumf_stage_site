(() => {
  'use strict';

  const AUTH_STORAGE_KEY = 'triumph_authenticated';
  const AUTH_TIMESTAMP_KEY = 'triumph_auth_timestamp';
  const AUTH_TIMEOUT = 24 * 60 * 60 * 1000;

  const checkAuthentication = () => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    const authTimestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY);
    
    if (!isAuthenticated || !authTimestamp) {
      return false;
    }

    const timestamp = parseInt(authTimestamp, 10);
    const now = Date.now();
    const timeDiff = now - timestamp;

    if (timeDiff > AUTH_TIMEOUT) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_TIMESTAMP_KEY);
      localStorage.removeItem('triumph_user_email');
      return false;
    }

    return true;
  };

  const redirectToAuth = () => {
    const currentPath = window.location.pathname;
    let authPath = 'auth.html';
    
    const pathParts = currentPath.split('/').filter(p => p);
    
    if (pathParts.length > 0 && ['ru', 'pl', 'en'].includes(pathParts[0])) {
      authPath = 'auth.html';
    } else {
      authPath = 'auth.html';
    }
    
    const returnUrl = encodeURIComponent(window.location.href);
    
    window.location.replace(`${authPath}?return=${returnUrl}`);
  };

  const requireAuth = () => {
    if (!checkAuthentication()) {
      redirectToAuth();
      return false;
    }
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_TIMESTAMP_KEY);
    localStorage.removeItem('triumph_user_email');
  };

  const redirectFromAuthIfAuthenticated = () => {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;
    
    if (!currentPath.includes('auth.html')) {
      return;
    }

    if (!checkAuthentication()) {
      return;
    }

    const pathParts = currentPath.split('/').filter(p => p);
    let searchPath = 'search.html';
    
    if (pathParts.length > 0 && ['ru', 'pl', 'en'].includes(pathParts[0])) {
      searchPath = 'search.html';
    } else {
      searchPath = 'search.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('return');
    
    if (returnUrl) {
      try {
        window.location.replace(decodeURIComponent(returnUrl));
      } catch (e) {
        console.error('Error decoding return URL:', e);
        window.location.replace(searchPath);
      }
    } else {
      window.location.replace(searchPath);
    }
  };

  window.triumphAuth = {
    check: checkAuthentication,
    require: requireAuth,
    redirect: redirectToAuth,
    logout: logout
  };

  const performAuthCheck = () => {
    if (document.body && document.body.classList.contains('require-auth')) {
      if (!requireAuth()) {
        document.body.style.display = 'none';
        const topContent = document.getElementById('Top');
        if (topContent) {
          topContent.style.display = 'none';
        }
        return false;
      } else {
        document.body.style.display = '';
        const topContent = document.getElementById('Top');
        if (topContent) {
          topContent.style.display = '';
        }
        return true;
      }
    }
    return true;
  };

  if (document.body) {
    performAuthCheck();
    redirectFromAuthIfAuthenticated();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performAuthCheck();
      redirectFromAuthIfAuthenticated();
    });
  } else {
    performAuthCheck();
    redirectFromAuthIfAuthenticated();
  }

  window.addEventListener('load', () => {
    if (document.body.classList.contains('require-auth')) {
      if (!checkAuthentication()) {
        redirectToAuth();
      }
    }
    redirectFromAuthIfAuthenticated();
  });
})();
