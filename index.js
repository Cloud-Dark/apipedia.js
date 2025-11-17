const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class Apipedia {
  constructor(appkey, authkey) {
    this.appkey = appkey;
    this.authkey = authkey;
    this.baseURL = 'https://waconsole.apipedia.id/api/create-message';
    this.bulkV1URL = 'https://waconsole.apipedia.id/api/bulk-messagev1';
    this.bulkV2URL = 'https://waconsole.apipedia.id/api/bulk-messagev2';
    this.telegramBaseURL = 'https://waconsole.apipedia.id/api/telegram';
    this.smsBaseURL = 'https://waconsole.apipedia.id/api/sms';
    this.aiBaseURL = 'https://waconsole.apipedia.id/api/chat-ai';
    this.profileBaseURL = 'https://waconsole.apipedia.id/api/profile';
    this.presenceBaseURL = 'https://waconsole.apipedia.id/api/presence';
    this.messagesBaseURL = 'https://waconsole.apipedia.id/api/messages';
    this.statusBaseURL = 'https://waconsole.apipedia.id/api/status';
    this.deviceBaseURL = 'https://waconsole.apipedia.id/api/device';

    // For chainable API
    this.result = null;
  }

  // WhatsApp API methods
  async whatsapp(to, message, media = null) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('to', to);
    formData.append('message', message);

    // Handle media - it could be a file path, URL, or stream
    if (media) {
      if (typeof media === 'string') {
        // If it's a URL starting with http/https, download it first
        if (media.startsWith('http://') || media.startsWith('https://')) {
          // For URLs, we'll pass the URL directly as a string 
          formData.append('file', media);
        } else {
          // If it's a file path, read the file
          if (fs.existsSync(media)) {
            const fileStream = fs.createReadStream(media);
            formData.append('file', fileStream);
          } else {
            throw new Error(`File does not exist: ${media}`);
          }
        }
      } else {
        // If it's already a stream, use it directly
        formData.append('file', media);
      }
    }

    try {
      const response = await axios.post(this.baseURL, formData, {
        headers: {
          ...formData.getHeaders() // This properly sets Content-Type with boundary
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Bulk Message V1: Send same message to multiple recipients
  async bulkV1(toNumbers, message) {
    // Convert array of numbers to the required format (e.g., "628998937095|6281615677582")
    const to = Array.isArray(toNumbers) ? toNumbers.join('|') : toNumbers;
    
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      message: message
    };

    try {
      const response = await axios.post(this.bulkV1URL, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Bulk Message V2: Send different messages to multiple recipients
  async bulkV2(toNumbers, messages) {
    // Convert array of numbers to the required format (e.g., "628998937095|6281615677582")
    const to = Array.isArray(toNumbers) ? toNumbers.join('|') : toNumbers;
    
    // Convert array of messages to the required format (e.g., "example|message")
    const message = Array.isArray(messages) ? messages.join('|') : messages;
    
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      message: message
    };

    try {
      const response = await axios.post(this.bulkV2URL, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Telegram API methods
  async telegramSendMessage(receiver, body) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('receiver', receiver);
    formData.append('body', body);

    try {
      const response = await axios.post(`${this.telegramBaseURL}/send_message`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async telegramSendImage(receiver, imageUrl, caption = '') {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('receiver', receiver);
    formData.append('image_url', imageUrl);
    if (caption) {
      formData.append('caption', caption);
    }

    try {
      const response = await axios.post(`${this.telegramBaseURL}/send_image`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async telegramSendLocation(receiver, latitude, longitude) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('receiver', receiver);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await axios.post(`${this.telegramBaseURL}/send_location`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async telegramSendButtons(receiver, body, buttons) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('receiver', receiver);
    formData.append('body', body);
    
    // Add buttons to form data
    // buttons should be an array of arrays of button objects
    // Each button object has properties like text, callback_data, url, etc.
    for (let i = 0; i < buttons.length; i++) {
      for (let j = 0; j < buttons[i].length; j++) {
        const button = buttons[i][j];
        formData.append(`buttons[${i}][${j}][text]`, button.text);
        if (button.callback_data) {
          formData.append(`buttons[${i}][${j}][callback_data]`, button.callback_data);
        }
        if (button.url) {
          formData.append(`buttons[${i}][${j}][url]`, button.url);
        }
      }
    }

    try {
      const response = await axios.post(`${this.telegramBaseURL}/send_buttons`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async telegramSendDocument(receiver, documentUrl, caption = '', filename = '') {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('receiver', receiver);
    formData.append('document_url', documentUrl);
    if (caption) {
      formData.append('caption', caption);
    }
    if (filename) {
      formData.append('filename', filename);
    }

    try {
      const response = await axios.post(`${this.telegramBaseURL}/send_document`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // SMS API methods
  async smsRegular(to, msg) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      msg: msg
    };

    try {
      const response = await axios.post(`${this.smsBaseURL}/send-reguler`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async smsVIP(to, msg) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      msg: msg
    };

    try {
      const response = await axios.post(`${this.smsBaseURL}/send-vip`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async smsOTP(to, msg) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      msg: msg
    };

    try {
      const response = await axios.post(`${this.smsBaseURL}/send-otp`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async smsVVIP(to, msg) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      to: to,
      msg: msg
    };

    try {
      const response = await axios.post(`${this.smsBaseURL}/send-vvip`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // AI Chat: Send message and get response
  async aiChat(message, agent_id, format = 'text') {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      message: message,
      agent_id: agent_id,
      format: format
    };

    try {
      const response = await axios.post(`${this.aiBaseURL}/send-message`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Chainable methods to send results to other platforms
  async toWhatsApp(to, prefix = '') {
    if (!this.result) {
      throw new Error('No previous result to send');
    }

    // Extract response text depending on format
    let responseText = '';
    if (typeof this.result === 'object') {
      // Handle different response formats including AI responses
      if (this.result.text) {
        responseText = this.result.text;
      } else if (this.result.message) {
        responseText = this.result.message;
      } else if (this.result.data) {
        // Handle AI response format
        if (typeof this.result.data === 'string') {
          responseText = this.result.data;
        } else if (this.result.data.text) {
          responseText = this.result.data.text;
        } else if (this.result.data.response) {
          responseText = this.result.data.response;
        } else {
          responseText = JSON.stringify(this.result.data);
        }
      } else if (this.result.response) {
        // Direct AI response field
        responseText = this.result.response;
      } else {
        responseText = JSON.stringify(this.result);
      }
    } else {
      responseText = this.result.toString();
    }

    const fullMessage = prefix + responseText;
    await this.whatsapp(to, fullMessage);
    return this; // Return this for continued chaining
  }

  async toTelegram(receiver, prefix = '') {
    if (!this.result) {
      throw new Error('No previous result to send');
    }

    // Extract response text depending on format
    let responseText = '';
    if (typeof this.result === 'object') {
      // Handle different response formats including AI responses
      if (this.result.text) {
        responseText = this.result.text;
      } else if (this.result.message) {
        responseText = this.result.message;
      } else if (this.result.data) {
        // Handle AI response format
        if (typeof this.result.data === 'string') {
          responseText = this.result.data;
        } else if (this.result.data.text) {
          responseText = this.result.data.text;
        } else if (this.result.data.response) {
          responseText = this.result.data.response;
        } else {
          responseText = JSON.stringify(this.result.data);
        }
      } else if (this.result.response) {
        // Direct AI response field
        responseText = this.result.response;
      } else {
        responseText = JSON.stringify(this.result);
      }
    } else {
      responseText = this.result.toString();
    }

    const fullMessage = prefix + responseText;
    await this.telegramSendMessage(receiver, fullMessage);
    return this; // Return this for continued chaining
  }

  async toSMS(to, prefix = '') {
    if (!this.result) {
      throw new Error('No previous result to send');
    }

    // Extract response text depending on format
    let responseText = '';
    if (typeof this.result === 'object') {
      // Handle different response formats including AI responses
      if (this.result.text) {
        responseText = this.result.text;
      } else if (this.result.message) {
        responseText = this.result.message;
      } else if (this.result.data) {
        // Handle AI response format
        if (typeof this.result.data === 'string') {
          responseText = this.result.data;
        } else if (this.result.data.text) {
          responseText = this.result.data.text;
        } else if (this.result.data.response) {
          responseText = this.result.data.response;
        } else {
          responseText = JSON.stringify(this.result.data);
        }
      } else if (this.result.response) {
        // Direct AI response field
        responseText = this.result.response;
      } else {
        responseText = JSON.stringify(this.result);
      }
    } else {
      responseText = this.result.toString();
    }

    const fullMessage = prefix + responseText;
    await this.smsRegular(to, fullMessage);
    return this; // Return this for continued chaining
  }

  // Profile API methods
  async getProfile() {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey
    };

    try {
      const response = await axios.get(`${this.profileBaseURL}/raw`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Presence API methods
  async updatePresence(receiver, presence, duration = null) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      receiver: receiver,
      presence: presence
    };

    if (duration !== null) {
      data.duration = duration;
    }

    try {
      const response = await axios.post(`${this.presenceBaseURL}/update`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Message Status API methods
  async getMessageStatusAll(messageId) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      message_id: messageId
    };

    try {
      const response = await axios.get(`${this.messagesBaseURL}/status/all`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async getLastStatus(messageId) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      message_id: messageId
    };

    try {
      const response = await axios.get(`${this.statusBaseURL}/last`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async getLastReceiptStatus(messageId) {
    const data = {
      appkey: this.appkey,
      authkey: this.authkey,
      message_id: messageId
    };

    try {
      const response = await axios.get(`${this.messagesBaseURL}/status/last/receipt`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Device and Session Management Methods
  async checkContactNumber(deviceId, phone) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('device_id', deviceId);
    formData.append('phone', phone);

    try {
      const response = await axios.post(`${this.deviceBaseURL}/contact/check`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async getSessionStatus(deviceId) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('device_id', deviceId);

    try {
      const response = await axios.post(`${this.deviceBaseURL}/session/status`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async getLastWebhookUpdate(deviceId) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('device_id', deviceId);

    try {
      const response = await axios.post(`${this.deviceBaseURL}/webhook/last-update`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  async getNewsLetterId(deviceId) {
    const formData = new FormData();
    formData.append('appkey', this.appkey);
    formData.append('authkey', this.authkey);
    formData.append('device_id', deviceId);

    try {
      const response = await axios.post(`${this.deviceBaseURL}/webhook/newsletter-id`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      this.result = response.data;
      return this; // For chaining
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(`Network Error: No response received from API`);
      } else {
        // Something else happened
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Method to get the current result
  getResult() {
    return this.result;
  }
}

function apipedia(appkey, authkey) {
  return new Apipedia(appkey, authkey);
}

module.exports = apipedia;