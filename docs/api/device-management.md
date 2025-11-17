# Device Management API Documentation

Device Management APIs allow you to interact with WhatsApp device sessions, verify contacts, and manage webhooks.

## Overview

The Device Management module provides methods to:
- Check if a phone number is registered on WhatsApp
- Verify current session status and authentication
- Retrieve webhook updates for debugging
- Extract Newsletter IDs for channel broadcasts

## Methods

### checkContactNumber(deviceId, phone)

Verify if a phone number is registered on WhatsApp.

**Parameters:**
- `deviceId` (string): Your WhatsApp device UUID
- `phone` (string): Phone number to check in international format

**Returns:** Promise that resolves with contact verification result

**Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function checkContact() {
  try {
    const response = await client.checkContactNumber(
      process.env.APIPEDIA_DEVICE_ID,
      process.env.PHONE_TO_CHECK
    );

    const result = response.getResult();
    console.log('Contact exists:', result.data.exists);
    console.log('WhatsApp JID:', result.data.phone);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkContact();
```

> **Note:** API endpoints are defined in `index.js`. This method uses the `/api/device/contact/check` endpoint with FormData.

**Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Contact exists.",
  "data": {
    "exists": true,
    "phone": "628998937095@c.us"
  }
}
```

---

### getSessionStatus(deviceId)

Check the current authentication and connection status of a WhatsApp session.

**Parameters:**
- `deviceId` (string): Your WhatsApp device UUID

**Returns:** Promise that resolves with session status information

**Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function checkSessionStatus() {
  try {
    const response = await client.getSessionStatus(
      process.env.APIPEDIA_DEVICE_ID
    );

    const sessionData = response.getResult();
    console.log('Connected:', sessionData.data.connected);
    console.log('Authenticated:', sessionData.data.authenticated);
    console.log('Phone:', sessionData.data.phone);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSessionStatus();
```

> **Note:** API endpoints are defined in `index.js`. This method uses the `/api/device/session/status` endpoint with FormData.

**Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Session status retrieved",
  "data": {
    "connected": true,
    "authenticated": true,
    "phone": "6285179781798"
  }
}
```

---

### getLastWebhookUpdate(deviceId)

Retrieve the last webhook update/message received by the session. Useful for debugging and monitoring message flow.

**Parameters:**
- `deviceId` (string): Your WhatsApp device UUID

**Returns:** Promise that resolves with last webhook message

**Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function getLastUpdate() {
  try {
    const response = await client.getLastWebhookUpdate(
      process.env.APIPEDIA_DEVICE_ID
    );

    const webhookData = response.getResult();
    console.log('Timestamp:', webhookData.data.timestamp);
    console.log('Message Type:', webhookData.data.type);
    console.log('Last Message:', webhookData.data.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getLastUpdate();
```

> **Note:** API endpoints are defined in `index.js`. This method uses the `/api/device/webhook/last-update` endpoint with FormData.

**Response:**
```json
{
  "success": true,
  "message": "Last webhook update",
  "data": {
    "timestamp": 1762704949835,
    "type": "message",
    "data": {
      "messages": [
        {
          "key": {
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "3AC52239C3BF89C9DC29",
            "participant": "628128283119@s.whatsapp.net"
          },
          "messageTimestamp": 1762704959,
          "pushName": "Contact Name",
          "broadcast": true,
          "message": {
            "conversation": "Message text"
          }
        }
      ],
      "type": "notify"
    },
    "formattedTime": "2025-11-09T16:15:49.835Z"
  }
}
```

---

### getNewsLetterId(deviceId)

Extract Newsletter ID from webhook updates for WhatsApp Channel broadcasts.

**Parameters:**
- `deviceId` (string): Your WhatsApp device UUID

**Returns:** Promise that resolves with newsletter ID information

**How to Get Your Newsletter ID:**
1. Open your WhatsApp Channels - Make sure you have an active WhatsApp Channel
2. Send/receive a test message in the channel
3. Call this endpoint to extract the Newsletter ID
4. Copy the Newsletter ID for use in channel broadcasts

**Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function getNewsletterID() {
  try {
    const response = await client.getNewsLetterId(
      process.env.APIPEDIA_DEVICE_ID
    );

    const newsletterData = response.getResult();
    if (newsletterData.data.found) {
      console.log('Newsletter ID:', newsletterData.data.newsletter_id);
      console.log('Remote JID:', newsletterData.data.remote_jid);
      console.log('Timestamp:', newsletterData.data.timestamp);
    } else {
      console.log('No newsletter found in webhook history');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getNewsletterID();
```

> **Note:** API endpoints are defined in `index.js`. This method uses the `/api/device/webhook/newsletter-id` endpoint with FormData.

**Response:**
```json
{
  "success": true,
  "message": "Newsletter ID extracted",
  "data": {
    "found": true,
    "newsletter_id": "120362345678901234",
    "remote_jid": "120362345678901234@newsletter",
    "timestamp": 1762705396,
    "message": "Newsletter test message"
  }
}
```

---

## Chaining with Device Methods

All device management methods support fluent chaining, allowing you to forward results to other platforms:

**Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function deviceManagementWithChaining() {
  try {
    // Check session status and forward result to WhatsApp
    await client.getSessionStatus(process.env.APIPEDIA_DEVICE_ID)
                .toWhatsApp(process.env.WHATSAPP_RECIPIENT, 'Session Status: ');

    // Get last webhook update and forward to multiple platforms
    await client.getLastWebhookUpdate(process.env.APIPEDIA_DEVICE_ID)
                .toWhatsApp(process.env.WHATSAPP_RECIPIENT, 'Last Update: ')
                .toTelegram(process.env.TELEGRAM_RECIPIENT, 'Update: ');

    // Extract newsletter ID and send via Telegram
    await client.getNewsLetterId(process.env.APIPEDIA_DEVICE_ID)
                .toTelegram(process.env.TELEGRAM_RECIPIENT, 'Newsletter ID: ');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

deviceManagementWithChaining();
```

---

## Error Handling

All device management methods follow the same error handling pattern:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function handleErrors() {
  try {
    const response = await client.getSessionStatus(
      process.env.APIPEDIA_DEVICE_ID
    );
    console.log('Success:', response.getResult());
  } catch (error) {
    // API Errors (server responded with error status)
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    }
    // Network Errors (request made but no response)
    else if (error.request) {
      console.error('Network Error: No response received');
    }
    // Other Errors
    else {
      console.error('Error:', error.message);
    }
  }
}

handleErrors();
```

---

## Best Practices

1. **Use Environment Variables** - Never hardcode device IDs or credentials
   ```javascript
   const deviceId = process.env.APIPEDIA_DEVICE_ID;
   ```

2. **Error Handling** - Always wrap calls in try-catch blocks
   ```javascript
   try {
     const response = await client.getSessionStatus(deviceId);
   } catch (error) {
     // Handle error appropriately
   }
   ```

3. **Chaining** - Leverage fluent API for multi-platform operations
   ```javascript
   await client.getLastWebhookUpdate(deviceId)
               .toWhatsApp(recipient, 'Info: ')
               .toTelegram(chatId, 'Update: ');
   ```

4. **Response Handling** - Use `getResult()` to access response data
   ```javascript
   const result = response.getResult();
   console.log(result.data);
   ```

---

## Security Considerations

- ✅ Store device IDs in `.env` file
- ✅ Never expose device IDs in client-side code
- ✅ Use different device IDs for development and production
- ✅ Monitor webhook updates for suspicious activity
- ❌ Don't hardcode device IDs in version control
- ❌ Don't expose device IDs in logs or error messages
