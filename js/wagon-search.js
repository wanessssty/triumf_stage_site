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
      rowNumber: '№з/п',
      wagonNumber: '№ вагона',
      originStation: 'Станція початку рейсу',
      currentStation: 'Поточна станція',
      destinationStation: 'Станція призначення',
      operation: 'Операція',
      operationDate: 'Дата операції',
      cargo: 'Вантаж',
      cargoWeight: 'Вага вантаж',
      clearButton: 'Очистити',
      client: 'Клієнт',
      nextClient: 'Наступний клієнт',
      owner: 'Постачальник',
      manageType: 'Вид управління вагоном'
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
      rowNumber: '№з/п',
      wagonNumber: '№ вагона',
      originStation: 'Станция начала рейса',
      currentStation: 'Текущая станция',
      destinationStation: 'Станция назначения',
      operation: 'Операция',
      operationDate: 'Дата операции',
      cargo: 'Груз',
      cargoWeight: 'Вес груза',
      clearButton: 'Очистить',
      client: 'Клиент',
      nextClient: 'Следующий клиент',
      owner: 'Поставщик',
      manageType: 'Вид управления вагоном'
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
      rowNumber: '№r/n',
      wagonNumber: 'Wagon №',
      originStation: 'Origin station',
      currentStation: 'Current station',
      destinationStation: 'Destination station',
      operation: 'Operation',
      operationDate: 'Operation date',
      cargo: 'Cargo',
      cargoWeight: 'Cargo weight',
      clearButton: 'Clear all',
      client: 'Client',
      nextClient: 'Next client',
      owner: 'Supplier',
      manageType: 'Wagon management type'
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
      rowNumber: '№r/n',
      wagonNumber: 'Nr wagonu',
      originStation: 'Stacja początkowa',
      currentStation: 'Bieżąca stacja',
      destinationStation: 'Stacja docelowa',
      operation: 'Operacja',
      operationDate: 'Data operacji',
      cargo: 'Ładunek',
      cargoWeight: 'Waga ładunku',
      clearButton: 'Wyczyść wszystko',
      client: 'Klient',
      nextClient: 'Następny klient',
      owner: 'Dostawca',
      manageType: 'Rodzaj zarządzania wagonem'
    }
  };

  const t = (key) => (translations[currentLang] && translations[currentLang][key]) || (translations.uk && translations.uk[key]) || key;

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

  function populateTable(wagonData, haveFullAccess = false) {
    const table = document.querySelector(`#${RESULTS_SECTION_ID} .wagon-results-table`);
    const thead = table && table.querySelector('thead tr');
    const tbody = table && table.querySelector('tbody');
    
    if (!tbody || !thead) {
      console.error('Не знайдено таблицю результатів');
      return;
    }

    clearTable();

    const additionalColumns = [
      { key: 'client', label: t('client') },
      { key: 'nextclient', label: t('nextClient') },
      { key: 'owner', label: t('owner') },
      { key: 'managetype', label: t('manageType') }
    ];

    const existingAdditionalCols = thead.querySelectorAll('.additional-column');
    existingAdditionalCols.forEach(col => col.remove());

    if (haveFullAccess) {
      additionalColumns.forEach(col => {
        const th = document.createElement('th');
        th.className = 'additional-column';
        th.textContent = col.label;
        thead.appendChild(th);
      });
    }

    if (!wagonData || !Array.isArray(wagonData) || wagonData.length === 0) {
      const row = document.createElement('tr');
      const colspan = haveFullAccess ? 13 : 9;
      row.innerHTML = `
        <td colspan="${colspan}" style="text-align: center; padding: 40px;">
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

    wagonData.forEach((wagon, index) => {
      const row = document.createElement('tr');
      const rowNum = index + 1;
      let rowHTML = `
        <td data-label="${getDataLabel(0)}" style="text-align: center;">${rowNum}</td>
        <td data-label="${getDataLabel(1)}">${wagon.carno || '-'}</td>
        <td data-label="${getDataLabel(2)}">${wagon.stationfromname || '-'}</td>
        <td data-label="${getDataLabel(3)}">${wagon.curstationname || '-'}</td>
        <td data-label="${getDataLabel(4)}">${wagon.stationtoname || '-'}</td>
        <td data-label="${getDataLabel(5)}">${wagon.opercode || '-'}</td>
        <td data-label="${getDataLabel(6)}">${formatDate(wagon.operdate)}</td>
        <td data-label="${getDataLabel(7)}">${wagon.cargotypename || '-'}</td>
        <td data-label="${getDataLabel(8)}">${formatWeight(wagon.Weight)}</td>
      `;

      if (haveFullAccess) {
        rowHTML += `
          <td data-label="${t('client')}">${wagon.client || '-'}</td>
          <td data-label="${t('nextClient')}">${wagon.nextclient || '-'}</td>
          <td data-label="${t('owner')}">${wagon.owner || '-'}</td>
          <td data-label="${t('manageType')}">${wagon.managetype || '-'}</td>
        `;
      }

      row.innerHTML = rowHTML;
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
    const email = localStorage.getItem('triumph_user_email') || '';
    
    try {
      const formData = new URLSearchParams();
      formData.append('wagonNumbers', formattedNumbers);
      if (email) {
        formData.append('email', email);
      }
      
      let response;
      try {
        response = await axios.post(API_URL, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
          validateStatus: function (status) {
            return status < 500;
          },
        });
      } catch (error) {
        if (error.response && error.response.status >= 500) {
          throw error;
        }
        
        const getUrl = email 
          ? `${API_URL}?wagonNumbers=${encodeURIComponent(formattedNumbers)}&email=${encodeURIComponent(email)}`
          : `${API_URL}?wagonNumbers=${encodeURIComponent(formattedNumbers)}`;
        
        try {
          response = await axios.get(getUrl, {
            headers: {
              'Accept': 'application/json',
            },
          });
        } catch (getError) {
          throw getError;
        }
      }

      if (response.status >= 400) {
        throw new Error(`${t('serverError')} ${response.status}`);
      }

      let result = null;
      
      try {
        if (typeof response.data === 'string') {
          result = response.data ? JSON.parse(response.data) : null;
        } else {
          result = response.data;
        }
        console.log('Відповідь від API:', result);
      } catch (parseError) {
        console.error('Помилка парсингу відповіді:', parseError, response.data);
        throw new Error(t('invalidDataFormat'));
      }
      
      if (result && result.message && result.message.trim() !== '') {
        console.warn('Повідомлення від сервера:', result.message);
        if (!result.data) {
          return { data: [], haveFullAccess: false };
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

        const haveFullAccess = result.havefullaccess === 1 || result.havefullaccess === '1';
        
        let wagonData;
        if (Array.isArray(data)) {
          wagonData = data;
        } else if (data && typeof data === 'object') {
          wagonData = Object.values(data).find(Array.isArray) || [];
        } else {
          wagonData = [];
        }

        return {
          data: wagonData,
          haveFullAccess: haveFullAccess
        };
      }

      return { data: [], haveFullAccess: false };
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
      const result = await searchWagons(wagonNumbers);
      const { data: allData, haveFullAccess } = result;

      const filteredData = allData.filter(wagon => {
        if (!wagon.carno) return false;
        const wagonNumber = wagon.carno.toString().trim();
        return wagonNumbers.some(num => {
          const searchNumber = num.toString().trim();
          return wagonNumber === searchNumber;
        });
      });

      populateTable(filteredData, haveFullAccess);

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
