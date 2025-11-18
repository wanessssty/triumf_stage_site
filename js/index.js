(() => {
  const detectLanguage = () => {
    const path = window.location.pathname;
    const href = window.location.href;
    if (path.includes('/ru/') || href.includes('/ru/')) return 'ru';
    if (path.includes('/pl/') || href.includes('/pl/')) return 'pl';
    if (path.includes('/en/') || href.includes('/en/')) return 'en';
    return 'uk'; 
  };

  const currentLang = detectLanguage();
  const SEARCHABLE_SELECT_IDS = new Set(['route-from', 'route-to', 'cargo-type', 'field']);

  const translations = {
    uk: {
      loading: 'Завантаження…',
      from: 'Звідки',
      to: 'Куди',
      select: 'Вибрати',
      selectCargo: 'Вибрати',
      errorStations: 'Не вдалося завантажити станції',
      errorCargo: 'Не вдалося завантажити типи вантажів',
      errorCarTypes: 'Не вдалося завантажити типи рухомого складу',
      errorStationFrom: 'Виберіть станцію відправлення.',
      errorStationTo: 'Виберіть станцію призначення.',
      errorCargoType: 'Виберіть тип вантажу.',
      errorWeight: 'Вкажіть коректний тоннаж (позитивне число).',
      errorPhoneRequired: 'Вкажіть номер телефону.',
      errorPhoneFormat: 'Невірний формат телефону.',
      errorEmailFormat: 'Невірний формат email.',
      errorCarType: 'Виберіть тип рухомого складу або введіть інший тип (обовʼязково).',
      errorSubmit: 'Не вдалося відправити заявку',
      errorServer: 'Виникла помилка, спробуйте пізніше',
      submitting: 'Відправка…',
      submitButton: 'Отримати розрахунок',
      searchPlaceholder: 'Пошук…',
      noResults: 'Нічого не знайдено',
      errorNameRequired: 'Вкажіть ім’я.',
    },
    ru: {
      loading: 'Загрузка…',
      from: 'Откуда',
      to: 'Куда',
      select: 'Выбрать',
      selectCargo: 'Выбрать...',
      errorStations: 'Не удалось загрузить станции',
      errorCargo: 'Не удалось загрузить типы грузов',
      errorCarTypes: 'Не удалось загрузить типы подвижного состава',
      errorStationFrom: 'Выберите станцию отправления.',
      errorStationTo: 'Выберите станцию назначения.',
      errorCargoType: 'Выберите тип груза.',
      errorWeight: 'Укажите корректный тоннаж (положительное число).',
      errorPhoneRequired: 'Укажите номер телефона.',
      errorPhoneFormat: 'Неверный формат телефона.',
      errorEmailFormat: 'Неверный формат email.',
      errorCarType: 'Выберите тип подвижного состава или введите другой тип (обязательно).',
      errorSubmit: 'Не удалось отправить заявку',
      errorServer: 'Возникла ошибка, попробуйте позже',
      submitting: 'Отправка…',
      submitButton: 'Получить расчет',
      searchPlaceholder: 'Поиск…',
      noResults: 'Ничего не найдено',
      errorNameRequired: 'Укажите имя.',
    },
    pl: {
      loading: 'Ładowanie…',
      from: 'Skąd',
      to: 'Dokąd',
      select: 'Wybierz',
      selectCargo: 'Wybierz...',
      errorStations: 'Nie udało się załadować stacji',
      errorCargo: 'Nie udało się załadować typów ładunków',
      errorCarTypes: 'Nie udało się załadować typów taboru',
      errorStationFrom: 'Wybierz stację wysyłki.',
      errorStationTo: 'Wybierz stację docelową.',
      errorCargoType: 'Wybierz typ ładunku.',
      errorWeight: 'Podaj poprawny tonaż (liczba dodatnia).',
      errorPhoneRequired: 'Podaj numer telefonu.',
      errorPhoneFormat: 'Nieprawidłowy format telefonu.',
      errorEmailFormat: 'Nieprawidłowy format email.',
      errorCarType: 'Wybierz typ taboru lub wprowadź inny typ (wymagane).',
      errorSubmit: 'Nie udało się wysłać zapytania',
      errorServer: 'Wystąpił błąd, spróbuj później',
      submitting: 'Wysyłanie…',
      submitButton: 'Otrzymaj wycenę',
      searchPlaceholder: 'Szukaj…',
      noResults: 'Brak wyników',
      errorNameRequired: 'Wprowadź imię.',
    },
    en: {
      loading: 'Loading…',
      from: 'From',
      to: 'To',
      select: 'Select',
      selectCargo: 'Select...',
      errorStations: 'Failed to load stations',
      errorCargo: 'Failed to load cargo types',
      errorCarTypes: 'Failed to load car types',
      errorStationFrom: 'Select departure station.',
      errorStationTo: 'Select destination station.',
      errorCargoType: 'Select cargo type.',
      errorWeight: 'Enter a valid tonnage (positive number).',
      errorPhoneRequired: 'Enter phone number.',
      errorPhoneFormat: 'Invalid phone format.',
      errorEmailFormat: 'Invalid email format.',
      errorCarType: 'Select car type or enter other type (required).',
      errorSubmit: 'Failed to submit request',
      errorServer: 'An error occurred, please try later',
      submitting: 'Submitting…',
      submitButton: 'Get calculation',
      searchPlaceholder: 'Search…',
      noResults: 'No matches found',
      errorNameRequired: 'Enter your name.',
    },
  };

  const t = (key) => translations[currentLang][key] || translations.uk[key];

  const STATIONS_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Backend/GetStations';
  const CARGO_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Backend/GetCargoTypes';
  const CAR_TYPES_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Backend/GetCarTypes';
  const ADD_ORDER_API_URL = 'https://dc.kdg.com.ua/Triumph/Triumph/Backend/AddCalcOrder';
  const STATION_SELECTS = [
    { id: 'route-from', placeholder: t('from') },
    { id: 'route-to', placeholder: t('to') },
  ];
  const CARGO_SELECT = {
    id: 'cargo-type',
    placeholder: t('selectCargo'),
  };
  const CAR_TYPE_SELECT = {
    id: 'field',
    placeholder: t('select'),
  };
  const FORM_ID = 'wf-form-Contact';
  const SUBMIT_BUTTON_SELECTOR = '.submit-button_calculator';
  const SUCCESS_SELECTOR = '.success-message';
  const ERROR_SELECTOR = '.error-message';
  const FALLBACK_CAR_TYPE_ID = 1317417;
  const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const CUSTOM_SELECT_ATTR = 'data-custom-select';
  const CUSTOM_SELECT_TOGGLE = 'data-custom-select-toggle';
  const CUSTOM_SELECT_MENU = 'data-custom-select-menu';
  const CUSTOM_SELECT_VALUE = 'data-custom-select-value';
  const ENHANCED_ATTR = 'data-enhanced-select';
  let customSelectMenuId = 0;

  const isSearchableSelect = (select) =>
    Boolean(
      select &&
        (select.dataset.searchable === 'true' || SEARCHABLE_SELECT_IDS.has(select.id)),
    );

  const getSelectElements = () =>
    STATION_SELECTS.map(({ id, placeholder }) => {
      const element = document.getElementById(id);
      return element ? { element, placeholder } : null;
    }).filter(Boolean);

  const setLoadingState = (selects, isLoading) => {
    selects.forEach(({ element, placeholder }) => {
      element.classList.toggle('is-loading', isLoading);
      element.disabled = isLoading;

      const firstOption = element.options[0];
      if (firstOption) {
        firstOption.textContent = isLoading ? t('loading') : placeholder;
      }

      syncCustomSelectEnhancement(element);
    });
  };

  const renderOptions = (selects, options) => {
    selects.forEach(({ element, placeholder }) => {
      element.innerHTML = '';

      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholder;
      element.appendChild(placeholderOption);

      options.forEach(({ label, value }) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        element.appendChild(option);
      });

      syncCustomSelectEnhancement(element);
    });
  };

  const renderErrorState = (selects, message) => {
    selects.forEach(({ element }) => {
      element.innerHTML = '';
      const option = document.createElement('option');
      option.value = '';
      option.textContent = message;
      element.appendChild(option);
      element.disabled = true;
      element.classList.remove('is-loading');

      syncCustomSelectEnhancement(element);
    });
  };

  const normalizeStations = (stations) => {
    const seen = new Set();

    return stations
      .map((station) => {
        const label =
          (station?.name ||
            station?.title ||
            station?.stationName ||
            station?.station)?.toString().trim() || '';

        if (!label) {
          return null;
        }

        const dedupeKey = label.toLowerCase();
        if (seen.has(dedupeKey)) {
          return null;
        }
        seen.add(dedupeKey);

        const value =
          station?.idobject ??
          station?.id ??
          station?.code ??
          station?.identifier ??
          label;

        return { label, value };
      })
      .filter(Boolean)
      .sort((a, b) =>
        a.label.localeCompare(b.label, 'uk', { sensitivity: 'base' }),
      );
  };

  const normalizeCargoTypes = (types) => {
    const seen = new Set();

    return types
      .map((type) => {
        const label = type?.name?.toString().trim() || '';

        if (!label) {
          return null;
        }

        const dedupeKey = label.toLowerCase();
        if (seen.has(dedupeKey)) {
          return null;
        }
        seen.add(dedupeKey);

        const value = type?.idobject ?? type?.id ?? label;
        return { label, value };
      })
      .filter(Boolean)
      .sort((a, b) =>
        a.label.localeCompare(b.label, 'uk', { sensitivity: 'base' }),
      );
  };

  const normalizeCarTypes = (types) => {
    const seen = new Set();

    return types
      .map((type) => {
        const label = type?.name?.toString().trim() || '';

        if (!label) {
          return null;
        }

        const dedupeKey = label.toLowerCase();
        if (seen.has(dedupeKey)) {
          return null;
        }
        seen.add(dedupeKey);

        const value = type?.idobject ?? type?.code ?? label;
        return { label, value };
      })
      .filter(Boolean)
      .sort((a, b) =>
        a.label.localeCompare(b.label, 'uk', { sensitivity: 'base' }),
      );
  };

  const fetchStations = async () => {
    const response = await fetch(STATIONS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка завантаження станцій: ${response.status}`);
    }

    return response.json();
  };

  const fetchCarTypes = async () => {
    const response = await fetch(CAR_TYPES_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка завантаження типів рухомого складу: ${response.status}`);
    }

    return response.json();
  };

  const fetchCargoTypes = async () => {
    const response = await fetch(CARGO_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка завантаження типів вантажів: ${response.status}`);
    }

    return response.json();
  };

  const initStations = async () => {
    const selects = getSelectElements();

    if (!selects.length) {
      return;
    }

    setLoadingState(selects, true);

    try {
      const payload = await fetchStations();
      const stationsArray = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];

      if (!stationsArray.length) {
        throw new Error('Список станцій порожній');
      }

      const stations = normalizeStations(stationsArray);

      if (!stations.length) {
        throw new Error('Не вдалося обробити список станцій');
      }

      renderOptions(selects, stations);
      setLoadingState(selects, false);
    } catch (error) {
      console.error(error);
      renderErrorState(selects, t('errorStations'));
    }
  };

  const initCargoTypes = async () => {
    const element = document.getElementById(CARGO_SELECT.id);

    if (!element) {
      return;
    }

    const selects = [{ element, placeholder: CARGO_SELECT.placeholder }];
    setLoadingState(selects, true);

    try {
      const payload = await fetchCargoTypes();
      const cargoArray = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];

      if (!cargoArray.length) {
        throw new Error('Список типів вантажів порожній');
      }

      const cargoTypes = normalizeCargoTypes(cargoArray);

      if (!cargoTypes.length) {
        throw new Error('Не вдалося обробити типи вантажів');
      }

      renderOptions(selects, cargoTypes);
      setLoadingState(selects, false);
    } catch (error) {
      console.error(error);
      renderErrorState(selects, t('errorCargo'));
    }
  };

  const initCarTypes = async () => {
    const element = document.getElementById(CAR_TYPE_SELECT.id);

    if (!element) {
      return;
    }

    const selects = [{ element, placeholder: CAR_TYPE_SELECT.placeholder }];
    setLoadingState(selects, true);

    try {
      const payload = await fetchCarTypes();
      const carArray = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];

      if (!carArray.length) {
        throw new Error('Список типів рухомого складу порожній');
      }

      const carTypes = normalizeCarTypes(carArray);

      if (!carTypes.length) {
        throw new Error('Не вдалося обробити типи рухомого складу');
      }

      renderOptions(selects, carTypes);
      setLoadingState(selects, false);
    } catch (error) {
      console.error(error);
      renderErrorState(selects, t('errorCarTypes'));
    }
  };

  const init = () => {
    enhanceSelectFields();
    bindGlobalSelectEvents();
    bindFormSubmit();
    bindFieldValidation();
    initStations();
    initCargoTypes();
    initCarTypes();
  };

  document.addEventListener('DOMContentLoaded', init);

  function enhanceSelectFields() {
    const selects = document.querySelectorAll('select.input.select-field');

    selects.forEach((select) => {
      ensureCustomSelect(select);
      syncCustomSelectEnhancement(select);
    });
  }

  function ensureCustomSelect(select) {
    if (select.getAttribute(ENHANCED_ATTR) === 'true') {
      return select.closest(`[${CUSTOM_SELECT_ATTR}]`);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    wrapper.setAttribute(CUSTOM_SELECT_ATTR, 'true');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'custom-select__toggle';
    toggle.setAttribute(CUSTOM_SELECT_TOGGLE, 'true');
    toggle.setAttribute('aria-haspopup', 'listbox');
    toggle.setAttribute('aria-expanded', 'false');

    const valueNode = document.createElement('span');
    valueNode.className = 'custom-select__value';
    valueNode.setAttribute(CUSTOM_SELECT_VALUE, 'true');
    toggle.appendChild(valueNode);

    const arrow = document.createElement('span');
    arrow.className = 'custom-select__arrow';
    toggle.appendChild(arrow);

    const menu = document.createElement('div');
    menu.className = 'custom-select__menu';
    menu.setAttribute(CUSTOM_SELECT_MENU, 'true');
    menu.setAttribute('role', 'listbox');

    const parent = select.parentNode;
    parent.insertBefore(wrapper, select);
    wrapper.appendChild(toggle);
    wrapper.appendChild(menu);
    wrapper.appendChild(select);

    const menuId = `custom-select-menu-${customSelectMenuId++}`;
    menu.id = menuId;
    toggle.setAttribute('aria-controls', menuId);

    select.setAttribute(ENHANCED_ATTR, 'true');
    select.classList.add('custom-select__native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;

    toggle.addEventListener('click', () => {
      toggleCustomSelect(wrapper);
    });

    toggle.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        toggleCustomSelect(wrapper);
      } else if (event.key === 'Escape') {
        closeCustomSelect(wrapper);
      }
    });

    menu.addEventListener('click', (event) => {
      const optionNode = event.target.closest('.custom-select__option');
      if (!optionNode || optionNode.disabled) {
        return;
      }

      if (optionNode.dataset.value !== select.value) {
        select.value = optionNode.dataset.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (isSearchableSelect(select)) {
        delete select.dataset.searchQuery;
      }
      closeCustomSelect(wrapper);
    });

    select.addEventListener('change', () => {
      syncCustomSelectEnhancement(select);
    });

    return wrapper;
  }

  function syncCustomSelectEnhancement(select) {
    const wrapper = ensureCustomSelect(select);
    if (!wrapper) {
      return;
    }

    syncCustomSelectMenu(select, wrapper);
    syncCustomSelectValue(select, wrapper);
    syncCustomSelectState(select, wrapper);
  }

  function syncCustomSelectMenu(select, wrapper) {
    const menu = wrapper.querySelector(`[${CUSTOM_SELECT_MENU}]`);
    if (!menu) {
      return;
    }

    const currentValue = select.value;
    const searchable = isSearchableSelect(select);
    const searchQuery = select.dataset.searchQuery || '';
    menu.innerHTML = '';

    const focusSearchInput = () => {
      requestAnimationFrame(() => {
        const nextInput = wrapper.querySelector('.custom-select__search-input');
        if (nextInput) {
          nextInput.focus({ preventScroll: true });
          const caretPosition = nextInput.value.length;
          nextInput.setSelectionRange(caretPosition, caretPosition);
        }
      });
    };

    if (searchable) {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'custom-select__search';
      searchContainer.setAttribute('role', 'presentation');

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.className = 'custom-select__search-input';
      searchInput.placeholder = t('searchPlaceholder');
      searchInput.value = searchQuery;
      searchInput.addEventListener('input', (event) => {
        select.dataset.searchQuery = event.target.value;
        syncCustomSelectMenu(select, wrapper);
        focusSearchInput();
      });

      searchContainer.appendChild(searchInput);
      menu.appendChild(searchContainer);
    } else {
      delete select.dataset.searchQuery;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredOptions = Array.from(select.options).filter((option) => {
      if (!normalizedQuery) {
        return true;
      }
      const label = option.textContent?.trim().toLowerCase() || '';
      return label.includes(normalizedQuery);
    });

    if (!filteredOptions.length) {
      const emptyState = document.createElement('div');
      emptyState.className = 'custom-select__empty';
      emptyState.textContent = t('noResults');
      emptyState.setAttribute('role', 'status');
      menu.appendChild(emptyState);
      return;
    }

    filteredOptions.forEach((option) => {
      const optionNode = document.createElement('button');
      optionNode.type = 'button';
      optionNode.className = 'custom-select__option';
      optionNode.dataset.value = option.value;
      optionNode.textContent = option.textContent;
      optionNode.setAttribute('role', 'option');

      const isSelected =
        option.selected ||
        (!currentValue && option.index === 0);

      if (isSelected) {
        optionNode.classList.add('is-selected');
        optionNode.setAttribute('aria-selected', 'true');
      } else {
        optionNode.setAttribute('aria-selected', 'false');
      }

      if (option.disabled) {
        optionNode.disabled = true;
        optionNode.classList.add('is-disabled');
      }

      menu.appendChild(optionNode);
    });
  }

  function syncCustomSelectValue(select, wrapper) {
    const valueNode = wrapper.querySelector(`[${CUSTOM_SELECT_VALUE}]`);
    if (!valueNode) {
      return;
    }

    const selectedOption =
      select.options[select.selectedIndex] || select.options[0];
    const textContent = selectedOption?.textContent?.trim() || '';

    valueNode.textContent = textContent;
    valueNode.classList.toggle('is-placeholder', !select.value);
  }

  function syncCustomSelectState(select, wrapper) {
    const toggle = wrapper.querySelector(`[${CUSTOM_SELECT_TOGGLE}]`);
    if (!toggle) {
      return;
    }

    const isDisabled = select.disabled;
    toggle.disabled = isDisabled;
    wrapper.classList.toggle('is-disabled', isDisabled);
    wrapper.classList.toggle(
      'is-loading',
      select.classList.contains('is-loading'),
    );
  }

  function toggleCustomSelect(wrapper) {
    if (wrapper.classList.contains('is-open')) {
      closeCustomSelect(wrapper);
    } else {
      openCustomSelect(wrapper);
    }
  }

  function openCustomSelect(wrapper) {
    closeAllCustomSelects(wrapper);
    wrapper.classList.add('is-open');
    const toggle = wrapper.querySelector(`[${CUSTOM_SELECT_TOGGLE}]`);
    toggle?.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      const searchInput = wrapper.querySelector('.custom-select__search-input');
      if (searchInput) {
        searchInput.focus({ preventScroll: true });
        searchInput.select();
      }
    });
  }

  function closeCustomSelect(wrapper) {
    wrapper.classList.remove('is-open');
    const toggle = wrapper.querySelector(`[${CUSTOM_SELECT_TOGGLE}]`);
    toggle?.setAttribute('aria-expanded', 'false');
  }

  function closeAllCustomSelects(except) {
    document.querySelectorAll(`[${CUSTOM_SELECT_ATTR}]`).forEach((wrapper) => {
      if (wrapper !== except) {
        closeCustomSelect(wrapper);
      }
    });
  }

  function bindGlobalSelectEvents() {
    document.addEventListener('click', (event) => {
      if (!event.target.closest(`[${CUSTOM_SELECT_ATTR}]`)) {
        closeAllCustomSelects();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllCustomSelects();
      }
    });
  }

  function bindFormSubmit() {
    const forms = Array.from(document.querySelectorAll(`form[id="${FORM_ID}"]`));

    if (!forms.length) {
      return;
    }

    forms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleFormSubmit(form);
      });
    });
  }

  async function handleFormSubmit(form) {
    const submitButton = form.querySelector(SUBMIT_BUTTON_SELECTOR);
    const successElement = form.parentElement?.querySelector(SUCCESS_SELECTOR);
    const errorElement = form.parentElement?.querySelector(ERROR_SELECTOR);

    toggleSubmitState(submitButton, true);
    showError(errorElement, '');

    try {
      const payload = collectOrderPayload(form);

      await submitOrder(payload);

      if (successElement) {
        successElement.style.display = 'block';
      }
      if (errorElement) {
        errorElement.style.display = 'none';
      }
      
      // Clear validation errors
      form
        .querySelectorAll('[id="Contact-Phone"]')
        .forEach((field) => field.classList.remove('field-error'));
      form
        .querySelectorAll('[id="Contact-Email"]')
        .forEach((field) => field.classList.remove('field-error'));
      
      form.reset();
      resetSearchableSelects(form);
      enhanceSelectFields();
      form.style.display = 'none';
    } catch (error) {
      console.error(error);
      showError(errorElement, error.message || t('errorSubmit'));
    } finally {
      toggleSubmitState(submitButton, false);
    }
  }

  function collectOrderPayload(form) {
    const getField = (id) =>
      form?.querySelector(`[id="${id}"]`) || null;

    const getValue = (id) => {
      const field = getField(id);
      if (!field || typeof field.value !== 'string') {
        return '';
      }
      return field.value.trim();
    };

    const toNumber = (value) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const phoneFields = Array.from(form.querySelectorAll(`[id="Contact-Phone"]`));
    const emailFields = Array.from(form.querySelectorAll(`[id="Contact-Email"]`));

    const stationFromValue = getValue('route-from');
    const stationToValue = getValue('route-to');
    const cargoValue = getValue('cargo-type');
    const carTypeValue = getValue('field');
    const carTypeOtherValue = getValue('OtherRollingStock');
    const tonnageValue = getValue('Tonnage');
    const phoneValue = getValue('Contact-Phone');
    const emailValue = getValue('Contact-Email');
    const companyValue = getValue('Contact-Company');
    const nameValue = getValue('Contact-Name');

    const isCalculatorForm =
      Boolean(
        getField('route-from') ||
          getField('route-to') ||
          getField('cargo-type') ||
          getField('Tonnage'),
      );

    if (!isCalculatorForm) {
      const errors = [];
      const clientName = nameValue || companyValue;

      if (!clientName) {
        errors.push(t('errorNameRequired'));
      }

      if (!phoneValue) {
        errors.push(t('errorPhoneRequired'));
        phoneFields.forEach((field) => updateFieldValidation(field, false));
      } else if (!PHONE_REGEX.test(phoneValue)) {
        errors.push(t('errorPhoneFormat'));
        phoneFields.forEach((field) => updateFieldValidation(field, false));
      } else {
        phoneFields.forEach((field) => updateFieldValidation(field, true));
      }

      if (emailValue && !EMAIL_REGEX.test(emailValue)) {
        errors.push(t('errorEmailFormat'));
        emailFields.forEach((field) => updateFieldValidation(field, false));
      } else {
        emailFields.forEach((field) => updateFieldValidation(field, true));
      }

      if (errors.length) {
        throw new Error(errors.join('\n'));
      }

      return {
        ClientName: clientName || '',
        Phone: phoneValue,
        Email: emailValue,
      };
    }

    const errors = [];

    const stationFrom = toNumber(stationFromValue);
    if (!stationFrom) {
      errors.push(t('errorStationFrom'));
    }

    const stationTo = toNumber(stationToValue);
    if (!stationTo) {
      errors.push(t('errorStationTo'));
    }

    const cargo = toNumber(cargoValue);
    if (!cargo) {
      errors.push(t('errorCargoType'));
    }

    const weight = toNumber(tonnageValue);
    if (!weight || weight <= 0) {
      errors.push(t('errorWeight'));
    }

    if (!phoneValue) {
      errors.push(t('errorPhoneRequired'));
      phoneFields.forEach((field) => updateFieldValidation(field, false));
    } else if (!PHONE_REGEX.test(phoneValue)) {
      errors.push(t('errorPhoneFormat'));
      phoneFields.forEach((field) => updateFieldValidation(field, false));
    } else {
      phoneFields.forEach((field) => updateFieldValidation(field, true));
    }

    if (emailValue && !EMAIL_REGEX.test(emailValue)) {
      errors.push(t('errorEmailFormat'));
      emailFields.forEach((field) => updateFieldValidation(field, false));
    } else {
      emailFields.forEach((field) => updateFieldValidation(field, true));
    }

    const hasCarTypeSelection = Boolean(carTypeValue);
    const carType = hasCarTypeSelection
      ? toNumber(carTypeValue)
      : FALLBACK_CAR_TYPE_ID;

    if (!hasCarTypeSelection && !carTypeOtherValue) {
      errors.push(t('errorCarType'));
    }

    if (errors.length) {
      throw new Error(errors.join('\n'));
    }

    return {
      StationFromID: stationFrom,
      StationToID: stationTo,
      ClientName: companyValue || nameValue || '',
      CargoID: cargo,
      CarTypeID: carType,
      CarTypeOther: carTypeOtherValue,
      Weight: weight,
      Phone: phoneValue,
      Email: emailValue,
    };
  }

  const buildQueryString = (payload) => {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }
      params.append(key, value.toString());
    });
    return params.toString();
  };

  async function submitOrder(payload) {
    const query = buildQueryString(payload);
    const requestUrl = query ? `${ADD_ORDER_API_URL}?${query}` : ADD_ORDER_API_URL;

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const rawBody = await response.text();
    let data = null;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch (parseError) {
      console.error('Не вдалося розпарсити відповідь сервера', parseError, rawBody);
    }

    // Check for server errors (500, 502, 503, etc.) or internal server error messages
    const errorMessage = data?.errorMessage || data?.errormessage;
    const isServerError = 
      response.status >= 500 || 
      (errorMessage && (
        errorMessage.toLowerCase().includes('internal server error') ||
        errorMessage.toLowerCase().includes('server error') ||
        errorMessage.toLowerCase().includes('помилка сервера')
      ));

    if (!response.ok) {
      if (isServerError) {
        throw new Error(t('errorServer'));
      }
      const message =
        errorMessage ||
        rawBody ||
        `${t('errorSubmit')}: ${response.status}`;
      throw new Error(message);
    }

    if (data?.status === false) {
      if (isServerError) {
        throw new Error(t('errorServer'));
      }
      throw new Error(errorMessage || t('errorSubmit'));
    }

    return data;
  }

  function toggleSubmitState(button, isSubmitting) {
    if (!button) {
      return;
    }
    button.disabled = isSubmitting;
    button.classList.toggle('is-loading', isSubmitting);
    button.value = isSubmitting ? t('submitting') : t('submitButton');
  }

  function showError(element, message) {
    if (!element) {
      if (message) {
        alert(message);
      }
      return;
    }

    if (!message) {
      element.style.display = 'none';
      element.textContent = '';
      return;
    }

    element.style.display = 'block';
    const messageContainer = element.querySelector('div');
    if (messageContainer) {
      messageContainer.textContent = message;
    } else {
      element.textContent = message;
    }
  }

  function validatePhone(phoneValue) {
    if (!phoneValue) {
      return false;
    }
    return PHONE_REGEX.test(phoneValue);
  }

  function validateEmail(emailValue) {
    if (!emailValue) {
      return true; // Email is optional
    }
    return EMAIL_REGEX.test(emailValue);
  }

  function updateFieldValidation(field, isValid) {
    if (isValid) {
      field.classList.remove('field-error');
    } else {
      field.classList.add('field-error');
    }
  }

  function resetSearchableSelects(container) {
    if (!container) {
      return;
    }
    container.querySelectorAll('select').forEach((select) => {
      if (select.dataset.searchQuery) {
        delete select.dataset.searchQuery;
      }
    });
  }

  function bindFieldValidation() {
    const phoneFields = document.querySelectorAll('[id="Contact-Phone"]');
    const emailFields = document.querySelectorAll('[id="Contact-Email"]');

    phoneFields.forEach((phoneField) => {
      phoneField.addEventListener('input', () => {
        const value = phoneField.value.trim();
        const isValid = validatePhone(value);
        updateFieldValidation(phoneField, isValid);
      });

      phoneField.addEventListener('blur', () => {
        const value = phoneField.value.trim();
        const isValid = validatePhone(value);
        updateFieldValidation(phoneField, isValid);
      });
    });

    emailFields.forEach((emailField) => {
      emailField.addEventListener('input', () => {
        const value = emailField.value.trim();
        const isValid = validateEmail(value);
        updateFieldValidation(emailField, isValid);
      });

      emailField.addEventListener('blur', () => {
        const value = emailField.value.trim();
        const isValid = validateEmail(value);
        updateFieldValidation(emailField, isValid);
      });
    });
  }
})();

