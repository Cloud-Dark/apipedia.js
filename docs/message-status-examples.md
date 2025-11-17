# Message Status API Examples

This document provides examples for the message status API endpoints available in the Apipedia library.

> **Important:** All API endpoints and base URLs are defined in `index.js`. The URLs shown below are for reference only. Use the library methods (getMessageStatusAll, getLastStatus, getLastReceiptStatus) instead of direct cURL calls.

## API Endpoints

### 1. Get All Message Statuses
Retrieves all statuses for a specific message ID.

**Method**: GET  
**Endpoint**: `/api/messages/status/all`

**Curl Example**:
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/messages/status/all' \\
  --header 'Content-Type: application/json' \\
  --data '{
     "appkey":"Insert your APP Key",
     "authkey":"Insert your Auth Key",
     "message_id":"MESSAGE_ID"
  }'
```

**Library Usage**:
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APPKEY, 
  process.env.APIPEDIA_AUTHKEY
);

async function checkAllStatuses() {
  try {
    const response = await client.getMessageStatusAll('your-message-id');
    console.log('All message statuses:', response.getResult());
  } catch (error) {
    console.error('Error getting all statuses:', error.message);
  }
}

checkAllStatuses();
```

### 2. Get Last Message Status
Retrieves the most recent status for a specific message ID.

**Method**: GET  
**Endpoint**: `/api/status/last`

**Curl Example**:
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/status/last' \\
  --header 'Content-Type: application/json' \\
  --data '{
     "appkey":"Insert your APP Key",
     "authkey":"Insert your Auth Key",
     "message_id":"MESSAGE_ID"
  }'
```

**Library Usage**:
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APPKEY, 
  process.env.APIPEDIA_AUTHKEY
);

async function checkLastStatus() {
  try {
    const response = await client.getLastStatus('your-message-id');
    console.log('Last message status:', response.getResult());
  } catch (error) {
    console.error('Error getting last status:', error.message);
  }
}

checkLastStatus();
```

### 3. Get Last Receipt Status
Retrieves the most recent receipt status for a specific message ID.

**Method**: GET  
**Endpoint**: `/api/messages/status/last/receipt`

**Curl Example**:
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/messages/status/last/receipt' \\
  --header 'Content-Type: application/json' \\
  --data '{
     "appkey":"Insert your APP Key",
     "authkey":"Insert your Auth Key",
     "message_id":"MESSAGE_ID"
  }'
```

**Library Usage**:
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APPKEY, 
  process.env.APIPEDIA_AUTHKEY
);

async function checkLastReceiptStatus() {
  try {
    const response = await client.getLastReceiptStatus('your-message-id');
    console.log('Last receipt status:', response.getResult());
  } catch (error) {
    console.error('Error getting last receipt status:', error.message);
  }
}

checkLastReceiptStatus();
```