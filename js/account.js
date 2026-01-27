(() => {
  const detectLanguage = () => {
    const path = window.location.pathname;
    if (path.includes('/ru/')) return 'ru';
    if (path.includes('/pl/')) return 'pl';
    if (path.includes('/en/')) return 'en';
    return 'uk';
  };

  const currentLang = detectLanguage();

  const translations = {
    uk: {
      wait: 'Зачекайте...',
      requestSent: 'Заявку відправлено',
      emailAlreadySent: 'Ваш email вже було відправлено, очікуйте підтвердження від адміністратора.',
      thanks: 'Дякуємо.',
      requestUnderReview: 'Вашу заявку розглядає адміністратор.',
      willNotify: 'Ми повідомимо, коли доступ буде активовано.',
      contactForDetails: 'Контакт для уточнень',
      successLogin: 'Успішний вхід!',
      confirmationCode: 'Код підтвердження',
      enterCode: 'Введіть код',
      confirm: 'Підтвердити',
      enterConfirmationCode: 'Введіть код підтвердження',
      codeInvalid: 'Код не правильний або не дійсний',
      confirmationError: 'Помилка підтвердження',
      somethingWentWrong: 'Щось пішло не так. Спробуйте ще раз.',
      enterEmail: 'Введіть email адресу',
      enterValidEmail: 'Введіть коректну email адресу',
      requestUnderReviewFull: 'Вашу заявку розглядає адміністратор. Ми повідомимо, коли доступ буде активовано.',
      alreadyRegistered: 'Ви вже зареєстровані, спробуйте авторизуватись, натиснувши кнопку "Увійти"',
      unknownError: 'Сталася невідома помилка. Спробуйте ще раз.',
      userNotRegistered: 'Користувач ще не зареєстрований',
      requestNotReviewed: 'Ваша заявка ще не була розглянута, дочекайтеся повідомлення на пошті',
      needConfirmEmail: 'Вам потрібно підтвердити пошту',
      loginError: 'Помилка входу',
      sendError: 'Помилка відправки',
      requestAlreadySent: 'Ваша заявка вже була надіслана, дочекайтеся повідомлення на пошті',
      networkError: 'Помилка підключення до сервера. Перевірте інтернет-з\'єднання та спробуйте ще раз.',
    },
    ru: {
      wait: 'Подождите...',
      requestSent: 'Заявка отправлена',
      emailAlreadySent: 'Ваш email уже был отправлен, ожидайте подтверждения от администратора.',
      thanks: 'Спасибо.',
      requestUnderReview: 'Вашу заявку рассматривает администратор.',
      willNotify: 'Мы сообщим, когда доступ будет активирован.',
      contactForDetails: 'Контакт для уточнений',
      successLogin: 'Успешный вход!',
      confirmationCode: 'Код подтверждения',
      enterCode: 'Введите код',
      confirm: 'Подтвердить',
      enterConfirmationCode: 'Введите код подтверждения',
      codeInvalid: 'Код не правильный или не действительный',
      confirmationError: 'Ошибка подтверждения',
      somethingWentWrong: 'Что-то пошло не так. Попробуйте еще раз.',
      enterEmail: 'Введите email адрес',
      enterValidEmail: 'Введите корректный email адрес',
      requestUnderReviewFull: 'Вашу заявку рассматривает администратор. Мы сообщим, когда доступ будет активирован.',
      alreadyRegistered: 'Вы уже зарегистрированы, попробуйте авторизоваться, нажав кнопку "Войти"',
      unknownError: 'Произошла неизвестная ошибка. Попробуйте еще раз.',
      userNotRegistered: 'Пользователь еще не зарегистрирован',
      requestNotReviewed: 'Ваша заявка еще не была рассмотрена, дождитесь сообщения на почте',
      needConfirmEmail: 'Вам нужно подтвердить почту',
      loginError: 'Ошибка входа',
      sendError: 'Ошибка отправки',
      requestAlreadySent: 'Ваша заявка уже была отправлена, дождитесь сообщения на почте',
      networkError: 'Ошибка подключения к серверу. Проверьте интернет-соединение и попробуйте еще раз.',
    },
    pl: {
      wait: 'Poczekaj...',
      requestSent: 'Wniosek wysłany',
      emailAlreadySent: 'Twój email został już wysłany, oczekuj potwierdzenia od administratora.',
      thanks: 'Dziękujemy.',
      requestUnderReview: 'Twój wniosek jest rozpatrywany przez administratora.',
      willNotify: 'Powiadomimy, gdy dostęp zostanie aktywowany.',
      contactForDetails: 'Kontakt w sprawie szczegółów',
      successLogin: 'Pomyślne logowanie!',
      confirmationCode: 'Kod potwierdzenia',
      enterCode: 'Wprowadź kod',
      confirm: 'Potwierdź',
      enterConfirmationCode: 'Wprowadź kod potwierdzenia',
      codeInvalid: 'Kod jest nieprawidłowy lub nieważny',
      confirmationError: 'Błąd potwierdzenia',
      somethingWentWrong: 'Coś poszło nie tak. Spróbuj ponownie.',
      enterEmail: 'Wprowadź adres email',
      enterValidEmail: 'Wprowadź poprawny adres email',
      requestUnderReviewFull: 'Twój wniosek jest rozpatrywany przez administratora. Powiadomimy, gdy dostęp zostanie aktywowany.',
      alreadyRegistered: 'Jesteś już zarejestrowany, spróbuj się zalogować, klikając przycisk "Zaloguj się"',
      unknownError: 'Wystąpił nieznany błąd. Spróbuj ponownie.',
      userNotRegistered: 'Użytkownik nie jest jeszcze zarejestrowany',
      requestNotReviewed: 'Twój wniosek nie został jeszcze rozpatrzony, poczekaj na wiadomość e-mail',
      needConfirmEmail: 'Musisz potwierdzić e-mail',
      loginError: 'Błąd logowania',
      sendError: 'Błąd wysyłki',
      requestAlreadySent: 'Twój wniosek został już wysłany, poczekaj na wiadomość e-mail',
      networkError: 'Błąd połączenia z serwerem. Sprawdź połączenie internetowe i spróbuj ponownie.',
    },
    en: {
      wait: 'Please wait...',
      requestSent: 'Request sent',
      emailAlreadySent: 'Your email has already been sent, wait for confirmation from the administrator.',
      thanks: 'Thank you.',
      requestUnderReview: 'Your request is being reviewed by the administrator.',
      willNotify: 'We will notify you when access is activated.',
      contactForDetails: 'Contact for details',
      successLogin: 'Successful login!',
      confirmationCode: 'Confirmation code',
      enterCode: 'Enter code',
      confirm: 'Confirm',
      enterConfirmationCode: 'Enter confirmation code',
      codeInvalid: 'Code is incorrect or invalid',
      confirmationError: 'Confirmation error',
      somethingWentWrong: 'Something went wrong. Please try again.',
      enterEmail: 'Enter email address',
      enterValidEmail: 'Enter a valid email address',
      requestUnderReviewFull: 'Your request is being reviewed by the administrator. We will notify you when access is activated.',
      alreadyRegistered: 'You are already registered, try to log in by clicking the "Sign in" button',
      unknownError: 'An unknown error occurred. Please try again.',
      userNotRegistered: 'User is not registered yet',
      requestNotReviewed: 'Your request has not been reviewed yet, wait for an email message',
      needConfirmEmail: 'You need to confirm your email',
      loginError: 'Login error',
      sendError: 'Send error',
      requestAlreadySent: 'Your request has already been sent, wait for an email message',
      networkError: 'Connection error. Check your internet connection and try again.',
    },
  };

  const t = (key) => translations[currentLang]?.[key] || translations.uk[key] || key;

  const REGISTRATION_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Site/Registration';
  const LOGIN_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Site/Login';
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper function to handle axios errors and return user-friendly messages
  const handleAxiosError = (error) => {
    // Network Error - no response from server
    if (!error.response) {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        return t('networkError');
      }
      if (error.code === 'ERR_INTERNET_DISCONNECTED') {
        return t('networkError');
      }
      return t('networkError');
    }
    
    // Server responded with error status
    return error.message || t('somethingWentWrong');
  };

  const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return false;
    }
    return EMAIL_REGEX.test(email.trim());
  };

  const showFloatingNotification = (message, type = 'success', duration = 5000) => {
    const existingNotification = document.querySelector('.floating-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `floating-notification ${type}`;
    
    let icon = '✓';
    if (type === 'warning') {
      icon = 'ⓘ';
    } else if (type === 'error') {
      icon = '✕';
    }

    notification.innerHTML = `
      <span class="floating-notification-icon">${icon}</span>
      <span class="floating-notification-text">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    const hideNotification = () => {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    };

    notification.addEventListener('click', hideNotification);

    if (duration > 0) {
      setTimeout(hideNotification, duration);
    }
  };

  const showMessage = (message, type = 'error') => {
    const messageElement = document.getElementById('auth-message');
    if (!messageElement) return;

    messageElement.style.display = 'block';
    messageElement.textContent = message;
    
    if (type === 'error') {
      messageElement.style.backgroundColor = '#fee';
      messageElement.style.color = '#c00';
      messageElement.style.border = '1px solid #fcc';
    } else if (type === 'success') {
      messageElement.style.backgroundColor = '#efe';
      messageElement.style.color = '#060';
      messageElement.style.border = '1px solid #cfc';
    } else if (type === 'info') {
      messageElement.style.backgroundColor = '#eef';
      messageElement.style.color = '#006';
      messageElement.style.border = '1px solid #ccf';
    }
  };

  const hideMessage = () => {
    const messageElement = document.getElementById('auth-message');
    if (messageElement) {
      messageElement.style.display = 'none';
      messageElement.textContent = '';
    }
  };

  const showError = (message) => {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'block';
      const messageContainer = errorElement.querySelector('div');
      if (messageContainer) {
        messageContainer.textContent = message;
      } else {
        errorElement.textContent = message;
      }
    } else {
      alert(message);
    }
  };

  const showSuccess = (message) => {
    const successElement = document.querySelector('.success-message');
    if (successElement) {
      successElement.style.display = 'block';
      const messageContainer = successElement.querySelector('div');
      if (messageContainer) {
        messageContainer.textContent = message;
      } else {
        successElement.textContent = message;
      }
    }
  };

  const hideMessages = () => {
    const errorElement = document.querySelector('.error-message');
    const successElement = document.querySelector('.success-message');
    
    if (errorElement) {
      errorElement.style.display = 'none';
      const messageContainer = errorElement.querySelector('div');
      if (messageContainer) {
        messageContainer.textContent = '';
      } else {
        errorElement.textContent = '';
      }
    }
    if (successElement) {
      successElement.style.display = 'none';
    }
  };

  const showFieldError = (input, message) => {
    if (!input) return;

    const existingError = input.parentElement.querySelector('.field-error-message');
    if (existingError) {
      existingError.remove();
    }

    input.classList.add('field-error');

    const errorElement = document.createElement('div');
    errorElement.className = 'field-error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#d32f2f';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '8px';
    errorElement.style.lineHeight = '1.4';

    input.parentElement.appendChild(errorElement);
  };

  const hideFieldError = (input) => {
    if (!input) return;
    input.classList.remove('field-error');
    const existingError = input.parentElement.querySelector('.field-error-message');
    if (existingError) {
      existingError.remove();
    }
  };

  const toggleButtonState = (button, isLoading) => {
    if (!button) return;
    button.disabled = isLoading;
  };

  const toggleSubmitState = (button, isSubmitting) => {
    if (!button) return;
    button.disabled = isSubmitting;
    const originalValue = button.getAttribute('data-original-value') || button.value;
    
    if (!button.hasAttribute('data-original-value')) {
      button.setAttribute('data-original-value', originalValue);
    }
    
    button.value = isSubmitting ? t('wait') : originalValue;
  };

  const showWaitingState = (formId, email, isAlreadySent = false) => {
    hideMessage();
    hideMessages();
    
    const leftPanel = document.querySelector('.photo-right.login .maw-w-right');
    if (leftPanel) {
      const heading = leftPanel.querySelector('.display-2');
      if (heading) {
        heading.textContent = t('requestSent');
      }
      
      const descriptionContainer = leftPanel.querySelector('.contact-details');
      if (descriptionContainer) {
        if (isAlreadySent) {
          descriptionContainer.innerHTML = `
            <p class="label dark">${t('emailAlreadySent')}<span class="gray-text-2"></span></p>
            <p class="label dark" style="margin-top: 10px;">${t('thanks')}<span class="gray-text-2"></span></p>
          `;
        } else {
          descriptionContainer.innerHTML = `
            <p class="label dark">${t('requestUnderReview')}<span class="gray-text-2"></span></p>
            <p class="label dark" style="margin-top: 10px;">${t('willNotify')}<span class="gray-text-2"></span></p>
          `;
        }
      }
    }

    const rightPanel = document.querySelector('.left-part.second .login_form-block');
    if (rightPanel) {
      rightPanel.innerHTML = `
        <div class="waiting-content-block">
          <div class="waiting-info">
            <h3 class="label dark blue waiting-title">${t('contactForDetails')}</h3>
            <div class="waiting-email">
              <a href="mailto:tpk_triumph@ukr.net" class="contact-link waiting-email-link">tpk_triumph@ukr.net</a>
            </div>
          </div>
        </div>
      `;
    }

    const form = document.getElementById(formId);
    if (form) {
      form.style.display = 'none';
    }
  };

  const showAuthContactInfo = () => {
    const rightPanel = document.querySelector('.auth-right-content');
    if (rightPanel) {
      const form = rightPanel.querySelector('.auth-form');
      const messageElement = rightPanel.querySelector('#auth-message');
      
      if (form) {
        form.style.display = 'none';
      }
      
      let contactInfo = rightPanel.querySelector('.auth-contact-info');
      if (!contactInfo) {
        contactInfo = document.createElement('div');
        contactInfo.className = 'auth-contact-info';
        contactInfo.style.cssText = 'padding: 20px;';
        rightPanel.appendChild(contactInfo);
      }
      
      contactInfo.innerHTML = `
        <div style="margin-bottom: 20px;">
          <p class="auth-label" style="margin-bottom: 15px; font-size: 18px; font-weight: 600; color: #333;">${t('contactForDetails')}</p>
          <div>
            <a href="mailto:tpk_triumph@ukr.net" style="font-size: 16px; color: #828282; text-decoration: none; font-weight: 500; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">tpk_triumph@ukr.net</a>
          </div>
        </div>
      `;
      
      contactInfo.style.display = 'block';
    }
  };

  const redirectToSearch = () => {
    const currentPath = window.location.pathname;
    let searchPath = 'search.html';
    
    const pathParts = currentPath.split('/').filter(p => p);
    
    if (pathParts.length > 0 && ['ru', 'pl', 'en'].includes(pathParts[0])) {
      searchPath = 'search.html';
    } else {
      searchPath = 'search.html';
    }
    
    window.location.href = searchPath;
  };

  const showLoginSuccess = (formId, data) => {
    const form = document.getElementById(formId);
    if (form) {
      form.style.display = 'none';
    }

    const dataDisplay = document.getElementById('login-data-display');
    const dataContent = document.getElementById('login-data-content');
    
    if (dataDisplay && dataContent) {
      dataDisplay.style.display = 'block';
      dataContent.textContent = JSON.stringify(data, null, 2);
    }

    localStorage.setItem('triumph_authenticated', 'true');
    localStorage.setItem('triumph_auth_timestamp', Date.now().toString());
    if (data?.login || data?.email) {
      localStorage.setItem('triumph_user_email', data.login || data.email);
    }

    showFloatingNotification(t('successLogin'), 'success');

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('return');
      
      if (returnUrl) {
        try {
          window.location.href = decodeURIComponent(returnUrl);
        } catch (e) {
          console.error('Error decoding return URL:', e);
          redirectToSearch();
        }
      } else {
        redirectToSearch();
      }
    }, 1000);
  };


  const showCodeVerificationForm = (email) => {
    const form = document.getElementById('wf-form-Auth');
    if (!form) return;

    form.innerHTML = `
      <div class="auth-form-field-wrapper">
        <div class="auth-form-field">
          <div class="auth-input-group">
            <p class="auth-label">${t('confirmationCode')}</p>
            <input maxlength="256" name="Auth-Code" data-name="Auth Code" placeholder="${t('enterCode')}" type="text" id="Auth-Code" class="input auth-input">
          </div>
        </div>
      </div>
      <div class="auth-buttons-wrapper">
        <button type="button" id="verify-code-btn" class="submit-button_calculator auth-button">${t('confirm')}</button>
      </div>
    `;

    const verifyBtn = document.getElementById('verify-code-btn');
    const codeInput = document.getElementById('Auth-Code');
    
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => handleCodeVerification(email));
    }

    if (codeInput) {
      codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCodeVerification(email);
        }
      });
    }
  };

  const submitCodeVerification = async (email, code) => {
    const params = new URLSearchParams();
    params.append('login', email);
    params.append('code', code);
    
    const requestUrl = `https://dc.kdg.com.ua/Triumph/Triumph/Site/Refresh?${params.toString()}`;

    let response;
    try {
      response = await axios.get(requestUrl, {
        headers: {
          'Accept': 'application/json',
        },
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        try {
          response = await axios.post('https://dc.kdg.com.ua/Triumph/Triumph/Site/Refresh', { login: email, code: code }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
        } catch (postError) {
          const formData = new URLSearchParams();
          formData.append('login', email);
          formData.append('code', code);
          
          response = await axios.post('https://dc.kdg.com.ua/Triumph/Triumph/Site/Refresh', formData.toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
          });
        }
      } else {
        throw error;
      }
    }

    if (response.status === 400) {
      try {
        response = await axios.post('https://dc.kdg.com.ua/Triumph/Triumph/Site/Refresh', { login: email, code: code }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      } catch (postError) {
        const formData = new URLSearchParams();
        formData.append('login', email);
        formData.append('code', code);
        
        response = await axios.post('https://dc.kdg.com.ua/Triumph/Triumph/Site/Refresh', formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        });
      }
    }

    const rawBody = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    let data = null;
    
    try {
      data = typeof response.data === 'object' ? response.data : (rawBody ? JSON.parse(rawBody) : null);
    } catch (parseError) {
      console.error('Parse error:', parseError, rawBody);
    }

    return {
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      data: data,
      rawBody: rawBody
    };
  };

  const handleCodeVerification = async (email) => {
    const codeInput = document.getElementById('Auth-Code');
    const verifyBtn = document.getElementById('verify-code-btn');
    const code = codeInput?.value?.trim() || '';

    hideMessage();
    hideFieldError(codeInput);

    if (!code) {
      showFieldError(codeInput, t('enterConfirmationCode'));
      return;
    }

    toggleButtonState(verifyBtn, true);
    showFloatingNotification(t('wait'), 'warning', 0);

    try {
      const result = await submitCodeVerification(email, code);
      
      if (result.status === 200) {
        showLoginSuccess('wf-form-Auth', result.data);
      } else if (result.status === 409) {
        showFloatingNotification(t('codeInvalid'), 'error');
        hideMessage();
        showFieldError(codeInput, t('codeInvalid'));
      } else {
        const errorMessage = result.data?.errorMessage || result.data?.errormessage || 
                            result.data?.message ||
                            result.rawBody || 
                            `${t('confirmationError')}: ${result.status}`;
        showFloatingNotification(errorMessage, 'error');
        hideMessage();
      }
    } catch (error) {
      console.error('Code verification error:', error);
      const errorMessage = handleAxiosError(error);
      showFloatingNotification(errorMessage, 'error');
      hideMessage();
    } finally {
      toggleButtonState(verifyBtn, false);
    }
  };

  const submitRegistration = async (email) => {
    const params = new URLSearchParams();
    params.append('login', email);
    
    const requestUrl = `${REGISTRATION_API_URL}?${params.toString()}`;

    let response;
    try {
      response = await axios.get(requestUrl, {
        headers: {
          'Accept': 'application/json',
        },
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        try {
          response = await axios.post(REGISTRATION_API_URL, { login: email }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
        } catch (postError) {
          const formData = new URLSearchParams();
          formData.append('login', email);
          
          response = await axios.post(REGISTRATION_API_URL, formData.toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
          });
        }
      } else {
        throw error;
      }
    }

    if (response.status === 400) {
      try {
        response = await axios.post(REGISTRATION_API_URL, { login: email }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      } catch (postError) {
        const formData = new URLSearchParams();
        formData.append('login', email);
        
        response = await axios.post(REGISTRATION_API_URL, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        });
      }
    }

    const rawBody = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    let data = null;
    
    try {
      data = typeof response.data === 'object' ? response.data : (rawBody ? JSON.parse(rawBody) : null);
    } catch (parseError) {
      console.error('Parse error:', parseError, rawBody);
    }

    return {
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      data: data,
      rawBody: rawBody
    };
  };

  const submitLogin = async (email) => {
    const params = new URLSearchParams();
    params.append('login', email);
    
    const requestUrl = `${LOGIN_API_URL}?${params.toString()}`;

    let response;
    try {
      response = await axios.get(requestUrl, {
        headers: {
          'Accept': 'application/json',
        },
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        try {
          response = await axios.post(LOGIN_API_URL, { login: email }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
        } catch (postError) {
          const formData = new URLSearchParams();
          formData.append('login', email);
          
          response = await axios.post(LOGIN_API_URL, formData.toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
          });
        }
      } else {
        throw error;
      }
    }

    if (response.status === 400) {
      try {
        response = await axios.post(LOGIN_API_URL, { login: email }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      } catch (postError) {
        const formData = new URLSearchParams();
        formData.append('login', email);
        
        response = await axios.post(LOGIN_API_URL, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        });
      }
    }

    const rawBody = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    let data = null;
    
    try {
      data = typeof response.data === 'object' ? response.data : (rawBody ? JSON.parse(rawBody) : null);
    } catch (parseError) {
      console.error('Parse error:', parseError, rawBody);
    }

    return {
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      data: data,
      rawBody: rawBody
    };
  };

  const handleRegistration = async () => {
    const emailInput = document.getElementById('Auth-Email');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const email = emailInput?.value?.trim() || '';

    hideMessage();
    hideFieldError(emailInput);

    if (!email) {
      showFieldError(emailInput, t('enterEmail'));
      return;
    }

    if (!validateEmail(email)) {
      showFieldError(emailInput, t('enterValidEmail'));
      return;
    }

    toggleButtonState(registerBtn, true);
    toggleButtonState(loginBtn, true);
    showFloatingNotification(t('wait'), 'warning', 0);

    try {
      const result = await submitRegistration(email);
      
      if (result.status === 200) {
        showFloatingNotification(t('requestSent'), 'success');
        hideMessage();
        showAuthContactInfo();
      } else if (result.status === 409) {
        showFloatingNotification(t('alreadyRegistered'), 'warning');
        hideMessage();
      } else {
        showFloatingNotification(t('unknownError'), 'error');
        hideMessage();
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = handleAxiosError(error);
      showFloatingNotification(errorMessage, 'error');
      hideMessage();
    } finally {
      toggleButtonState(registerBtn, false);
      toggleButtonState(loginBtn, false);
    }
  };

  const handleLogin = async () => {
    const emailInput = document.getElementById('Auth-Email');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const email = emailInput?.value?.trim() || '';

    hideMessage();
    hideFieldError(emailInput);

    if (!email) {
      showFieldError(emailInput, t('enterEmail'));
      return;
    }

    if (!validateEmail(email)) {
      showFieldError(emailInput, t('enterValidEmail'));
      return;
    }

    toggleButtonState(registerBtn, true);
    toggleButtonState(loginBtn, true);
    showFloatingNotification(t('wait'), 'warning', 0);

    try {
      const result = await submitLogin(email);
      
      if (result.status === 200) {
        localStorage.setItem('triumph_authenticated', 'true');
        localStorage.setItem('triumph_auth_timestamp', Date.now().toString());
        if (result.data?.login || email) {
          localStorage.setItem('triumph_user_email', result.data?.login || email);
        }
        
        showFloatingNotification(t('successLogin'), 'success');
        
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('return');
        
        if (returnUrl) {
          try {
            window.location.replace(decodeURIComponent(returnUrl));
            return;
          } catch (e) {
            console.error('Error decoding return URL:', e);
            redirectToSearch();
            return;
          }
        }
        
        redirectToSearch();
      } else if (result.status === 404) {
        showFloatingNotification(t('userNotRegistered'), 'error');
        hideMessage();
      } else if (result.status === 409) {
        showFloatingNotification(t('requestNotReviewed'), 'warning');
        hideMessage();
      } else if (result.status === 403) {
        showFloatingNotification(t('needConfirmEmail'), 'warning');
        hideMessage();
        showCodeVerificationForm(email);
      } else {
        const errorMessage = result.data?.errorMessage || result.data?.errormessage || 
                            result.data?.message ||
                            result.rawBody || 
                            `${t('loginError')}: ${result.status}`;
        showFloatingNotification(errorMessage, 'error');
        hideMessage();
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = handleAxiosError(error);
      showFloatingNotification(errorMessage, 'error');
      hideMessage();
    } finally {
      toggleButtonState(registerBtn, false);
      toggleButtonState(loginBtn, false);
    }
  };

  const handleFormSubmit = async (form) => {
    const emailInput = form.querySelector('#Login-Email');
    const submitButton = form.querySelector('.login-submit-btn');
    const email = emailInput?.value?.trim() || '';

    hideMessages();

    if (!email) {
      showFieldError(emailInput, t('enterEmail'));
      return;
    }

    if (!validateEmail(email)) {
      showFieldError(emailInput, t('enterValidEmail'));
      return;
    }

    hideFieldError(emailInput);
    toggleSubmitState(submitButton, true);

    try {
      const result = await submitRegistration(email);
      
      if (result.status === 200) {
        showFloatingNotification(t('requestSent'), 'success');
        showWaitingState('wf-form-Login', email, false);
      } else if (result.status === 409) {
        showFloatingNotification(t('emailAlreadySent'), 'warning');
        showWaitingState('wf-form-Login', email, true);
      } else if (result.status === 403) {
        showFloatingNotification(t('requestAlreadySent'), 'warning');
      } else {
        const errorMessage = result.data?.errorMessage || result.data?.errormessage || 
                            result.data?.message ||
                            result.rawBody || 
                            `${t('sendError')}: ${result.status}`;
        showFloatingNotification(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = handleAxiosError(error);
      showFloatingNotification(errorMessage, 'error');
    } finally {
      toggleSubmitState(submitButton, false);
    }
  };

  const handleLoginAuthSubmit = async (form) => {
    const emailInput = form.querySelector('#Login-Email-Auth');
    const submitButton = form.querySelector('.login-submit-btn');
    const email = emailInput?.value?.trim() || '';

    hideMessages();

    if (!email) {
      showFieldError(emailInput, t('enterEmail'));
      return;
    }

    if (!validateEmail(email)) {
      showFieldError(emailInput, t('enterValidEmail'));
      return;
    }

    hideFieldError(emailInput);
    toggleSubmitState(submitButton, true);

    try {
      const result = await submitLogin(email);
      
      if (result.status === 200) {
        localStorage.setItem('triumph_authenticated', 'true');
        localStorage.setItem('triumph_auth_timestamp', Date.now().toString());
        if (result.data?.login || email) {
          localStorage.setItem('triumph_user_email', result.data?.login || email);
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('return');
        
        if (returnUrl) {
          try {
            window.location.replace(decodeURIComponent(returnUrl));
            return;
          } catch (e) {
            console.error('Error decoding return URL:', e);
            redirectToSearch();
            return;
          }
        }
        
        redirectToSearch();
      } else if (result.status === 404) {
        showFloatingNotification(t('userNotRegistered'), 'error');
      } else if (result.status === 409) {
        showFloatingNotification(t('requestNotReviewed'), 'warning');
      } else if (result.status === 403) {
        showFloatingNotification(t('needConfirmEmail'), 'warning');
      } else {
        const errorMessage = result.data?.errorMessage || result.data?.errormessage || 
                            result.data?.message ||
                            result.rawBody || 
                            `${t('loginError')}: ${result.status}`;
        showFloatingNotification(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = handleAxiosError(error);
      showFloatingNotification(errorMessage, 'error');
    } finally {
      toggleSubmitState(submitButton, false);
    }
  };

  const bindAuthForm = () => {
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('Auth-Email');

    if (!registerBtn || !loginBtn) {
      return;
    }

    registerBtn.addEventListener('click', handleRegistration);
    loginBtn.addEventListener('click', handleLogin);

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && validateEmail(email)) {
          hideFieldError(emailInput);
        }
      });

      emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
          showFieldError(emailInput, t('enterValidEmail'));
        } else {
          hideFieldError(emailInput);
        }
      });

      emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleLogin();
        }
      });
    }
  };

  const bindRegistrationForm = () => {
    const form = document.getElementById('wf-form-Login');

    if (!form) {
      return;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleFormSubmit(form);
    });

    const emailInput = form.querySelector('#Login-Email');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && validateEmail(email)) {
          hideFieldError(emailInput);
        }
      });

      emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
          showFieldError(emailInput, t('enterValidEmail'));
        } else {
          hideFieldError(emailInput);
        }
      });
    }
  };

  const bindLoginForm = () => {
    const form = document.getElementById('wf-form-Login-Auth');

    if (!form) {
      return;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleLoginAuthSubmit(form);
    });

    const emailInput = form.querySelector('#Login-Email-Auth');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && validateEmail(email)) {
          hideFieldError(emailInput);
        }
      });

      emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
          showFieldError(emailInput, t('enterValidEmail'));
        } else {
          hideFieldError(emailInput);
        }
      });
    }
  };

  const handleReturnUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('return');
    
    if (returnUrl && localStorage.getItem('triumph_authenticated') === 'true') {
      try {
        window.location.href = decodeURIComponent(returnUrl);
      } catch (e) {
        console.error('Error decoding return URL:', e);
      }
    }
  };

  const init = () => {
    bindAuthForm();
    bindRegistrationForm();
    bindLoginForm();
    
    if (localStorage.getItem('triumph_authenticated') === 'true') {
      handleReturnUrl();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
