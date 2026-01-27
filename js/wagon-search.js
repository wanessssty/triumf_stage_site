(function() {
  const API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Site/getcarlocation';
  const FORM_ID = 'wf-form-Search';
  const WAGON_NUMBERS_ID = 'Wagon-Numbers';
  const RESULTS_SECTION_ID = 'sectionResults';
  const SUBMIT_BUTTON_ID = 'wagon-search-btn';
  const CLEAR_BUTTON_ID = 'wagon-clear-btn';
  const CLEAR_MOBILE_BUTTON_ID = 'wagon-clear-mobile-btn';
  const BACK_TO_TOP_ID = 'back-to-top-search';
  const SUCCESS_MESSAGE_SELECTOR = '.success-message';
  const ERROR_MESSAGE_SELECTOR = '.error-message';

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

  const translations = {
    uk: {
      noResults: 'Результатів не знайдено',
      searchButton: 'Знайти',
      searching: 'Пошук...',
      enterWagonNumbers: 'Будь ласка, введіть хоча б один номер вагона',
      invalidFormat: 'Некоректний формат номерів вагонів. Введіть номери (8 цифр), розділені комами, пробілами або новими рядками.',
      foundResults: 'Знайдено результатів:',
      noResultsForInput: 'Результатів не знайдено для введених номерів вагонів',
      serverError: 'Помилка сервера:',
      invalidDataFormat: 'Некоректний формат даних від сервера',
      searchError: 'Помилка при пошуку вагонів. Спробуйте ще раз.',
      wagonNumber: '№ вагона',
      originStation: 'Станція початку рейсу',
      currentStation: 'Поточна станція',
      destinationStation: 'Станція призначення',
      operation: 'Операція',
      operationDate: 'Дата операції',
      cargo: 'Вантаж',
      cargoWeight: 'Вага вантаж',
      clearButton: 'Очистити'
    },
    ru: {
      noResults: 'Результатов не найдено',
      searchButton: 'Найти',
      searching: 'Поиск...',
      enterWagonNumbers: 'Пожалуйста, введите хотя бы один номер вагона',
      invalidFormat: 'Неверный формат номеров вагонов. Введите номера (8 цифр), разделенные запятыми, пробелами или новыми строками.',
      foundResults: 'Найдено результатов:',
      noResultsForInput: 'Результатов не найдено для введенных номеров вагонов',
      serverError: 'Ошибка сервера:',
      invalidDataFormat: 'Неверный формат данных от сервера',
      searchError: 'Ошибка при поиске вагонов. Попробуйте еще раз.',
      wagonNumber: '№ вагона',
      originStation: 'Станция начала рейса',
      currentStation: 'Текущая станция',
      destinationStation: 'Станция назначения',
      operation: 'Операция',
      operationDate: 'Дата операции',
      cargo: 'Груз',
      cargoWeight: 'Вес груза',
      clearButton: 'Очистить'
    },
    en: {
      noResults: 'No results found',
      searchButton: 'Search',
      searching: 'Searching...',
      enterWagonNumbers: 'Please enter at least one wagon number',
      invalidFormat: 'Invalid wagon number format. Enter numbers (8 digits), separated by commas, spaces or new lines.',
      foundResults: 'Found results:',
      noResultsForInput: 'No results found for entered wagon numbers',
      serverError: 'Server error:',
      invalidDataFormat: 'Invalid data format from server',
      searchError: 'Error searching for wagons. Please try again.',
      wagonNumber: 'Wagon №',
      originStation: 'Origin station',
      currentStation: 'Current station',
      destinationStation: 'Destination station',
      operation: 'Operation',
      operationDate: 'Operation date',
      cargo: 'Cargo',
      cargoWeight: 'Cargo weight',
      clearButton: 'Clear all'
    },
    pl: {
      noResults: 'Nie znaleziono wyników',
      searchButton: 'Szukaj',
      searching: 'Szukanie...',
      enterWagonNumbers: 'Proszę wprowadzić co najmniej jeden numer wagonu',
      invalidFormat: 'Nieprawidłowy format numerów wagonów. Wprowadź numery (8 cyfr), oddzielone przecinkami, spacjami lub nowymi liniami.',
      foundResults: 'Znaleziono wyników:',
      noResultsForInput: 'Nie znaleziono wyników dla wprowadzonych numerów wagonów',
      serverError: 'Błąd serwera:',
      invalidDataFormat: 'Nieprawidłowy format danych z serwera',
      searchError: 'Błąd podczas wyszukiwania wagonów. Spróbuj ponownie.',
      wagonNumber: 'Nr wagonu',
      originStation: 'Stacja początkowa',
      currentStation: 'Bieżąca stacja',
      destinationStation: 'Stacja docelowa',
      operation: 'Operacja',
      operationDate: 'Data operacji',
      cargo: 'Ładunek',
      cargoWeight: 'Waga ładunku',
      clearButton: 'Wyczyść wszystko'
    }
  };

  const t = (key) => translations[currentLang]?.[key] || translations.uk[key] || key;

  function normalizeWagonNumbers(input) {
    if (!input || typeof input !== 'string') {
      return [];
    }

    let cleanedInput = input.replace(/[\[\]]/g, '');

    const numbers = cleanedInput
      .split(/[,\s\n\r]+/)
      .map(num => num.trim())
      .filter(num => {
        if (num.length === 0) return false;
        return /^\d{4,}$/.test(num);
      });

    return numbers;
  }

  function formatWagonNumbers(numbers) {
    return numbers.map(num => `[${num}]`).join('');
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } catch (e) {
      return dateString;
    }
  }

  function formatWeight(weight) {
    if (weight === null || weight === undefined || weight === '') {
      return '-';
    }
    const numWeight = Number(weight);
    if (isNaN(numWeight)) return weight;
    return `${numWeight} т`;
  }

  function clearTable() {
    const tbody = document.querySelector(`#${RESULTS_SECTION_ID} .wagon-results-table tbody`);
    if (tbody) {
      tbody.innerHTML = '';
    }
  }

  function ensureBackToTopButton() {
    if (document.getElementById(BACK_TO_TOP_ID)) {
      return;
    }

    const button = document.createElement('button');
    button.id = BACK_TO_TOP_ID;
    button.className = 'back-to-top-btn';
    button.type = 'button';
    button.innerHTML = '<svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.707 13.4142L12.707 1.41418L0.707031 13.4142" stroke="white" stroke-width="2"/></svg>';

    button.addEventListener('click', () => {
      const form = document.getElementById(FORM_ID);
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.body.appendChild(button);
  }

  function updateBackToTopVisibility() {
    const button = document.getElementById(BACK_TO_TOP_ID);
    const resultsSection = document.getElementById(RESULTS_SECTION_ID);
    if (!button || !resultsSection) return;

    const hasResultsVisible = resultsSection.style.display !== 'none';
    const scrolledEnough = window.scrollY > 300;

    if (hasResultsVisible && scrolledEnough) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  function populateTable(data) {
    const tbody = document.querySelector(`#${RESULTS_SECTION_ID} .wagon-results-table tbody`);
    if (!tbody) {
      console.error('Не знайдено tbody для таблиці результатів');
      return;
    }

    clearTable();

    if (!data || !Array.isArray(data) || data.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td colspan="8" style="text-align: center; padding: 40px;">
          <div style="color: #666; font-size: 16px;">${t('noResults')}</div>
        </td>
      `;
      tbody.appendChild(row);
      return;
    }

    const getDataLabel = (index) => {
      const th = document.querySelector(`#${RESULTS_SECTION_ID} .wagon-results-table thead tr th:nth-child(${index + 1})`);
      return th ? th.textContent.trim() : '';
    };

    data.forEach((wagon) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="${getDataLabel(0)}">${wagon.carno || '-'}</td>
        <td data-label="${getDataLabel(1)}">${wagon.stationfromname || '-'}</td>
        <td data-label="${getDataLabel(2)}">${wagon.curstationname || '-'}</td>
        <td data-label="${getDataLabel(3)}">${wagon.stationtoname || '-'}</td>
        <td data-label="${getDataLabel(4)}">${wagon.opercode || '-'}</td>
        <td data-label="${getDataLabel(5)}">${formatDate(wagon.operdate)}</td>
        <td data-label="${getDataLabel(6)}">${wagon.cargotypename || '-'}</td>
        <td data-label="${getDataLabel(7)}">${formatWeight(wagon.Weight)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function showFloatingNotification(message, type = 'success', duration = 5000) {
    if (!message) return;
    
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
  }

  function setLoadingState(isLoading) {
    const button = document.getElementById(SUBMIT_BUTTON_ID);
    if (!button) return;

    button.disabled = isLoading;
    button.classList.toggle('is-loading', isLoading);
    
    if (isLoading) {
      button.textContent = t('searching');
    } else {
      button.textContent = t('searchButton');
    }
  }

  async function searchWagons(wagonNumbers) {
    const formattedNumbers = formatWagonNumbers(wagonNumbers);
    
    try {
      const formData = new URLSearchParams();
      formData.append('wagonNumbers', formattedNumbers);
      
      let response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData.toString()
      });

      if (!response.ok) {
        response = await fetch(`${API_URL}?wagonNumbers=${encodeURIComponent(formattedNumbers)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
      }

      if (!response.ok) {
        throw new Error(`${t('serverError')} ${response.status}`);
      }

      const rawBody = await response.text();
      let result = null;
      
      try {
        result = rawBody ? JSON.parse(rawBody) : null;
        console.log('Відповідь від API:', result);
      } catch (parseError) {
        console.error('Помилка парсингу відповіді:', parseError, rawBody);
        throw new Error(t('invalidDataFormat'));
      }
      
      if (result && result.message && result.message.trim() !== '') {
        console.warn('Повідомлення від сервера:', result.message);
        if (!result.data) {
          return [];
        }
      }

      if (result && result.data) {
        let data;
        if (typeof result.data === 'string') {
          try {
            data = JSON.parse(result.data);
          } catch (e) {
            console.error('Помилка парсингу JSON з data:', e, result.data);
            throw new Error(t('invalidDataFormat'));
          }
        } else {
          data = result.data;
        }

        if (Array.isArray(data)) {
          return data;
        } else if (data && typeof data === 'object') {
          return Object.values(data).find(Array.isArray) || [];
        } else {
          return [];
        }
      }

      return [];
    } catch (error) {
      console.error('Помилка при пошуку вагонів:', error);
      throw error;
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const wagonNumbersInput = document.getElementById(WAGON_NUMBERS_ID);
    const resultsSection = document.getElementById(RESULTS_SECTION_ID);

    if (!wagonNumbersInput || !resultsSection) {
      console.error('Не знайдено необхідні елементи форми');
      return;
    }

    const inputValue = wagonNumbersInput.value.trim();
    const wagonNumbers = normalizeWagonNumbers(inputValue);

    if (wagonNumbers.length === 0) {
      if (!inputValue) {
        showFloatingNotification(t('enterWagonNumbers'), 'error');
      } else {
        showFloatingNotification(t('invalidFormat'), 'error');
      }
      wagonNumbersInput.focus();
      return;
    }

    setLoadingState(true);
    resultsSection.style.display = 'none';

    try {
      const allData = await searchWagons(wagonNumbers);

      const filteredData = allData.filter(wagon => {
        if (!wagon.carno) return false;
        const wagonNumber = wagon.carno.toString().trim();
        return wagonNumbers.some(num => {
          const searchNumber = num.toString().trim();
          return wagonNumber === searchNumber;
        });
      });

      populateTable(filteredData);

      resultsSection.style.display = 'block';
      
      setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateBackToTopVisibility();
      }, 100);

      if (filteredData.length > 0) {
        showFloatingNotification(`${t('foundResults')} ${filteredData.length}`, 'success');
      } else {
        showFloatingNotification(t('noResultsForInput'), 'warning');
      }
    } catch (error) {
      console.error('Помилка пошуку:', error);
      showFloatingNotification(error.message || t('searchError'), 'error');
      resultsSection.style.display = 'none';
    } finally {
      setLoadingState(false);
      updateBackToTopVisibility();
    }
  }

  function updateClearButtonVisibility() {
    const clearButton = document.getElementById(CLEAR_BUTTON_ID);
    const clearMobileButton = document.getElementById(CLEAR_MOBILE_BUTTON_ID);
    const wagonNumbersInput = document.getElementById(WAGON_NUMBERS_ID);
    
    if (!wagonNumbersInput) return;
    
    const hasText = wagonNumbersInput.value.trim().length > 0;
    
    if (clearButton) {
      if (hasText) {
        clearButton.style.display = '';
        const buttonColor = clearButton.querySelector('.button-color');
        if (buttonColor) {
          buttonColor.textContent = t('clearButton');
        } else {
          clearButton.textContent = t('clearButton');
        }
      } else {
        clearButton.style.display = 'none';
      }
    }
    
    if (clearMobileButton) {
      if (hasText) {
        clearMobileButton.style.display = 'flex';
      } else {
        clearMobileButton.style.display = 'none';
      }
    }
  }

  function clearSearchField() {
    const wagonNumbersInput = document.getElementById(WAGON_NUMBERS_ID);
    const resultsSection = document.getElementById(RESULTS_SECTION_ID);
    
    if (wagonNumbersInput) {
      wagonNumbersInput.value = '';
      wagonNumbersInput.focus();
    }
    
    if (resultsSection) {
      resultsSection.style.display = 'none';
    }
    
    clearTable();
    updateClearButtonVisibility();
  }

  function init() {
    const form = document.getElementById(FORM_ID);
    if (!form) {
      console.warn('Форма пошуку вагонів не знайдена');
      return;
    }

    form.addEventListener('submit', handleFormSubmit);

    ensureBackToTopButton();
    window.addEventListener('scroll', updateBackToTopVisibility);

    const wagonNumbersInput = document.getElementById(WAGON_NUMBERS_ID);
    const clearButton = document.getElementById(CLEAR_BUTTON_ID);
    const clearMobileButton = document.getElementById(CLEAR_MOBILE_BUTTON_ID);
    
    if (wagonNumbersInput) {
      wagonNumbersInput.addEventListener('input', updateClearButtonVisibility);
      wagonNumbersInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const button = document.getElementById(SUBMIT_BUTTON_ID);
          if (button && !button.disabled) {
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        }
      });
    }
    
    if (clearButton) {
      clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        clearSearchField();
      });
    }
    
    if (clearMobileButton) {
      clearMobileButton.addEventListener('click', function(e) {
        e.preventDefault();
        clearSearchField();
      });
    }
    
    updateClearButtonVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
