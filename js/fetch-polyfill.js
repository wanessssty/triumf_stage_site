(function() {
  'use strict';

  if (typeof window.fetch === 'function') {
    return;
  }

  window.fetch = function(url, options) {
    options = options || {};
    
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      var method = (options.method || 'GET').toUpperCase();
      var urlString = typeof url === 'string' ? url : url.url || url.toString();
      
      if (method === 'GET' && options.body) {
        console.warn('Fetch polyfill: Body in GET request is ignored');
      }
      
      xhr.open(method, urlString, true);
      
      if (options.headers) {
        for (var key in options.headers) {
          if (options.headers.hasOwnProperty(key)) {
            try {
              xhr.setRequestHeader(key, options.headers[key]);
            } catch (e) {
            }
          }
        }
      }
      
      if (options.headers && options.headers['Accept'] && options.headers['Accept'].includes('json')) {
        xhr.responseType = 'text';
      }
      
      var body = null;
      if (options.body) {
        if (typeof options.body === 'string') {
          body = options.body;
        } else if (options.body instanceof FormData) {
          body = options.body;
        } else if (typeof options.body === 'object') {
          body = JSON.stringify(options.body);
          if (!options.headers || !options.headers['Content-Type']) {
            xhr.setRequestHeader('Content-Type', 'application/json');
          }
        }
      }
      
      xhr.onload = function() {
        var response = {
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText || '',
          url: urlString,
          headers: {
            get: function(name) {
              return xhr.getResponseHeader(name);
            }
          },
          text: function() {
            return Promise.resolve(xhr.responseText || '');
          },
          json: function() {
            try {
              return Promise.resolve(JSON.parse(xhr.responseText || '{}'));
            } catch (e) {
              return Promise.reject(new Error('Invalid JSON response'));
            }
          },
          clone: function() {
            return this;
          }
        };
        
        if (response.ok) {
          resolve(response);
        } else {
          reject(new Error('HTTP ' + xhr.status + ': ' + xhr.statusText));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network request failed'));
      };
      
      xhr.ontimeout = function() {
        reject(new Error('Request timeout'));
      };
      
      if (options.timeout) {
        xhr.timeout = options.timeout;
      }
      
      try {
        xhr.send(body);
      } catch (e) {
        reject(new Error('Failed to send request: ' + e.message));
      }
    });
  };
  
  if (typeof window.Headers === 'undefined') {
    window.Headers = function(headers) {
      this._headers = {};
      if (headers) {
        for (var key in headers) {
          if (headers.hasOwnProperty(key)) {
            this._headers[key.toLowerCase()] = headers[key];
          }
        }
      }
    };
    
    window.Headers.prototype.get = function(name) {
      return this._headers[name.toLowerCase()] || null;
    };
    
    window.Headers.prototype.set = function(name, value) {
      this._headers[name.toLowerCase()] = value;
    };
    
    window.Headers.prototype.has = function(name) {
      return name.toLowerCase() in this._headers;
    };
  }
  
  console.log('Fetch polyfill loaded for older browser support');
})();
