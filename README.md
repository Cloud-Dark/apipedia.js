# 🚀 Apipedia.js

[![npm version](https://img.shields.io/npm/v/apipedia.js.svg)](https://www.npmjs.com/package/apipedia.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/apipedia.js.svg)](https://nodejs.org/)

**Official Apipedia.js** - The complete Node.js library for Apipedia API with WhatsApp, Telegram, SMS, and AI Chat integration featuring revolutionary fluent chaining.

> ⭐ **Official JavaScript SDK** - Built by Apipedia team with revolutionary fluent chaining API!

## Installation

```bash
npm install apipedia.js
```

## Quick Start

First, set up your environment variables (see [Environment Variables](#environment-variables) section):

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

// Initialize with credentials from environment
const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

// Send a text message
await client.whatsapp(
  process.env.WHATSAPP_RECIPIENT,
  'Hello, World!'
);

// Send a message with media file path
await client.whatsapp(
  process.env.WHATSAPP_RECIPIENT,
  'Check this out!',
  './path/to/image.jpg'
);

// Send a message with media URL
await client.whatsapp(
  process.env.WHATSAPP_RECIPIENT,
  'Check this out!',
  'https://example.com/image.jpg'
);

// Send a message with media stream
const fs = require('fs');
const media = fs.createReadStream('path/to/image.jpg');
await client.whatsapp(
  process.env.WHATSAPP_RECIPIENT,
  'Check this out!',
  media
);

// Send bulk messages (same message to multiple recipients)
await client.bulkV1(
  ['628998937095', '6281615677582'],
  'Same message to all recipients'
);

// Send bulk messages (different messages to multiple recipients)
await client.bulkV2(
  ['628998937095', '6281615677582'],
  ['Message for first', 'Message for second']
);

// Send Telegram text message
await client.telegramSendMessage(
  process.env.TELEGRAM_RECIPIENT,
  'Hello from Telegram Bot!'
);

// Send Telegram image
await client.telegramSendImage(
  process.env.TELEGRAM_RECIPIENT,
  'https://example.com/photo.jpg',
  'Photo caption'
);

// Send Telegram location
await client.telegramSendLocation(
  process.env.TELEGRAM_RECIPIENT,
  -6.2088,
  106.8456
);

// Send Telegram buttons
const buttons = [
  [
    {"text": "Option 1", "callback_data": "option_1"},
    {"text": "Option 2", "callback_data": "option_2"}
  ]
];
await client.telegramSendButtons(
  process.env.TELEGRAM_RECIPIENT,
  'Choose an option:',
  buttons
);

// Send Telegram document
await client.telegramSendDocument(
  process.env.TELEGRAM_RECIPIENT,
  'https://temp.apipedia.id/example/sample-1.pdf',
  'Document caption',
  'document.pdf'
);

// Use AI Chat
await client.aiChat(
  'Hello, how can you help me?',
  process.env.AI_AGENT_ID,
  'json'
);
```

## AI Chat and Telegram Implementation Example

Here's a practical example using environment variables for security:

### Using AI Chat with Content Writing Assistant
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

// Initialize with credentials from environment variables
const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function exampleAIUsage() {
  try {
    // Send a message to the AI Content Writing Assistant
    const response = await client.aiChat(
      'Hello, how can you help me?',
      process.env.AI_AGENT_ID,
      'json'
    );

    console.log('AI Response:', response.getResult());

    // Chain: Send the AI response to Telegram
    await response.toTelegram(
      process.env.TELEGRAM_RECIPIENT,
      'AI Response: '
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}

exampleAIUsage();
```

### Using Telegram with Your Credentials
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

// Initialize with credentials from environment variables
const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function exampleTelegramUsage() {
  try {
    // Send a message via Telegram
    const response = await client.telegramSendMessage(
      process.env.TELEGRAM_RECIPIENT,
      'Hello from Telegram Bot!'
    );

    console.log('Telegram Response:', response.getResult());

    // Chain: Send the result to WhatsApp
    await response.toWhatsApp(
      process.env.WHATSAPP_RECIPIENT,
      'Telegram message sent: '
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}

exampleTelegramUsage();
```

### Additional Examples

For more detailed examples, check out the test files in the `tests/` directory:

- `tests/test-ai-implementation.js` - Shows how to use AI chat functionality
- `tests/test-telegram-implementation.js` - Shows how to use Telegram functionality

You can run these examples with:
```
node tests/test-ai-implementation.js
node tests/test-telegram-implementation.js
```

## Features

- **WhatsApp Messaging**: Send text messages and media attachments (images, documents, etc.)
- **Media Support**: Support for file paths, URLs, and streams as media
- **Bulk Messaging**: Bulk messaging capabilities (V1 and V2) for WhatsApp
- **Telegram Integration**: Complete Telegram bot capabilities (text, images, locations, buttons, documents)
- **SMS Services**: Multiple SMS tiers (Regular, VIP, OTP, VVIP)
- **AI Chat Integration**: AI-powered chat with customizable agents and response formats
- **Profile Management**: Get account profile information
- **Presence Control**: Update WhatsApp presence status (typing, online, etc.)
- **Message Tracking**: Track message status and delivery receipts
- **Chainable API**: Fluent interface for combining operations
- **Cross-platform Forwarding**: Forward AI responses to WhatsApp, Telegram, or SMS
- **Environment Configuration**: Secure credential management with .env support
- **Comprehensive Error Handling**: Detailed error messages for debugging

## Documentation

For complete documentation, check out the [docs](docs/) folder:

- [Getting Started](docs/getting-started.md) - A guide to help you get started
- [API Documentation](docs/api/) - Detailed information about all methods
- [Examples](docs/examples/) - Complete examples for different use cases
- [Tests](docs/tests/) - Information about the testing suite

## Methods

### WhatsApp Methods
#### whatsapp(to, message, media = null)
Send a message (with optional media) to a single WhatsApp number.

- `to`: Recipient's phone number in international format (e.g., 6281234567890)
- `message`: Text message content
- `media` (optional): Can be a file path, URL, or stream for media attachments

#### bulkV1(toNumbers, message)
Send the same message to multiple recipients (Bulk Message V1).

- `toNumbers`: Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `message`: Text message content to send to all recipients

#### bulkV2(toNumbers, messages)
Send different messages to multiple recipients (Bulk Message V2).

- `toNumbers`: Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `messages`: Array of messages or pipe-separated string (e.g. 'message1|message2')

### Telegram Methods
#### telegramSendMessage(receiver, body)
Send a text message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `body`: Text content of the message

#### telegramSendImage(receiver, imageUrl, caption = '')
Send an image message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `imageUrl`: URL of the image to send
- `caption` (optional): Caption text to accompany the image

#### telegramSendLocation(receiver, latitude, longitude)
Send a location message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

#### telegramSendButtons(receiver, body, buttons)
Send a message with inline keyboard buttons to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `body`: Text content of the message
- `buttons`: Array of button rows, each containing button objects

#### telegramSendDocument(receiver, documentUrl, caption = '', filename = '')
Send a document to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `documentUrl`: URL of the document to send
- `caption` (optional): Caption text to accompany the document
- `filename` (optional): Filename to show for the document

### SMS Methods
#### smsRegular(to, msg)
Send a regular SMS message.

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

#### smsVIP(to, msg)
Send a VIP SMS message (higher priority).

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

#### smsOTP(to, msg)
Send an OTP SMS message.

- `to`: Recipient's phone number in international format
- `msg`: OTP message content (usually contains verification code)

#### smsVVIP(to, msg)
Send a VVIP SMS message (highest priority).

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

### AI Chat Methods
#### aiChat(message, agent_id, format = 'text')
Send a message to AI agent and get response.

- `message`: Your message to the AI agent
- `agent_id`: ID of the AI agent to use
- `format`: Response format ('text' or 'json')

### Profile and Status Methods
#### getProfile()
Get account profile information.

Returns profile data including account details and status.

#### updatePresence(receiver, presence, duration = null)
Update WhatsApp presence status.

- `receiver`: Target phone number
- `presence`: Presence type ('composing', 'recording', 'online', etc.)
- `duration` (optional): Duration in seconds

### Message Status Methods
#### getMessageStatusAll(messageId)
Get complete message status information.

- `messageId`: ID of the message to check

#### getLastStatus(messageId)
Get the last status of a message.

- `messageId`: ID of the message to check

#### getLastReceiptStatus(messageId)
Get the last receipt status of a message.

- `messageId`: ID of the message to check

### Message Status Examples

See the [API Documentation](docs/api/index.md) for complete endpoint details and cURL examples.

### Device and Session Management Methods

#### checkContactNumber(deviceId, phone)
Verify if a phone number is registered on WhatsApp.

- `deviceId`: Device UUID
- `phone`: Phone number to check in international format

**JavaScript Example:**
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function checkContact() {
  const response = await client.checkContactNumber(
    process.env.APIPEDIA_DEVICE_ID,
    process.env.PHONE_TO_CHECK
  );
  console.log('Contact exists:', response.getResult().data.exists);
}

checkContact();
```

For complete API endpoint details, see [Device Management API Documentation](docs/api/device-management.md).

#### getSessionStatus(deviceId)
Check the current authentication and connection status of a WhatsApp session.

- `deviceId`: Device UUID

**JavaScript Example:**
```javascript
const response = await client.getSessionStatus(
  process.env.APIPEDIA_DEVICE_ID
);

const { connected, authenticated, phone } = response.getResult().data;
console.log('Connected:', connected);
console.log('Authenticated:', authenticated);
console.log('Phone:', phone);
```

For complete API endpoint details, see [Device Management API Documentation](docs/api/device-management.md).

#### getLastWebhookUpdate(deviceId)
Retrieve the last webhook update/message received by the session. Useful for debugging and monitoring message flow.

- `deviceId`: Device UUID

**JavaScript Example:**
```javascript
const response = await client.getLastWebhookUpdate(
  process.env.APIPEDIA_DEVICE_ID
);

const webhookData = response.getResult();
console.log('Timestamp:', webhookData.data.timestamp);
console.log('Message Type:', webhookData.data.type);
console.log('Last Message:', webhookData.data.data);
```

For complete API endpoint details and response examples, see [Device Management API Documentation](docs/api/device-management.md).

#### getNewsLetterId(deviceId)
Extract Newsletter ID from webhook updates for WhatsApp Channel broadcasts.

- `deviceId`: Device UUID

**How to Get Your Newsletter ID:**
1. Open your WhatsApp Channels - Make sure you have an active channel
2. Send/receive a test message in the channel
3. Call this method to extract the Newsletter ID
4. Copy the Newsletter ID for channel broadcasts

**JavaScript Example:**
```javascript
const response = await client.getNewsLetterId(
  process.env.APIPEDIA_DEVICE_ID
);

const newsletterData = response.getResult();
if (newsletterData.data.found) {
  console.log('Newsletter ID:', newsletterData.data.newsletter_id);
  console.log('Remote JID:', newsletterData.data.remote_jid);
} else {
  console.log('No newsletter found');
}
```

For complete API endpoint details and response examples, see [Device Management API Documentation](docs/api/device-management.md).

### Device Management with Chaining

All device management methods support fluent chaining, allowing you to forward results to other platforms:

**JavaScript Example:**
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

### Environment Variables Setup

Create a `.env` file in your project root with the following variables for device management:

```bash
# Apipedia Authentication
APIPEDIA_APP_KEY=your-app-key-here
APIPEDIA_AUTH_KEY=your-auth-key-here

# Device Management
APIPEDIA_DEVICE_ID=your-device-uuid-here

# WhatsApp & Telegram Recipients
WHATSAPP_RECIPIENT=your-whatsapp-number
TELEGRAM_RECIPIENT=your-telegram-chat-id

# Contact Verification
PHONE_TO_CHECK=phone-number-to-verify
```

Never commit your `.env` file to version control. Add it to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Chainable Cross-Platform Methods
#### toWhatsApp(to, prefix = '')
Forward the previous result to WhatsApp.

- `to`: WhatsApp recipient number
- `prefix` (optional): Text to prepend to the message

#### toTelegram(receiver, prefix = '')
Forward the previous result to Telegram.

- `receiver`: Telegram chat ID
- `prefix` (optional): Text to prepend to the message

#### toSMS(to, prefix = '')
Forward the previous result to SMS.

- `to`: SMS recipient number
- `prefix` (optional): Text to prepend to the message

## Advanced Usage Examples

### 🔗 Revolutionary Fluent Chaining
```javascript
require('dotenv').config();

// ✨ NEW! Perfect chaining syntax - exactly what you wanted!
await client
  .aiChat('Generate a motivational quote', process.env.AI_AGENT_ID, 'text')
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT, '💪 Motivation: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT, '⚡ Power up: ')
  .toSMS(process.env.WHATSAPP_RECIPIENT, '📱 Daily dose: ');

// 🚀 Extreme long chains work perfectly!
await client
  .aiChat('Create weather report', process.env.AI_AGENT_ID)
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT, '🌤️ WeatherApp: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT, '⛅ TeleWeather: ')
  .toSMS(process.env.WHATSAPP_RECIPIENT, '🌡️ SMSWeather: ')
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT_2, '📱 Share: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT_2, '💬 Forward: ');
```

### Chaining Multiple Operations
```javascript
require('dotenv').config();

// Get profile, then send to multiple platforms
await client.getProfile()
             .toWhatsApp(process.env.WHATSAPP_RECIPIENT, 'My Profile: ')
             .toTelegram(process.env.TELEGRAM_RECIPIENT, 'Account Info: ');

// Check message status and forward
await client.getLastStatus('message-id')
             .toSMS(process.env.WHATSAPP_RECIPIENT, 'Message Status: ');
```

### Presence Management
```javascript
require('dotenv').config();

// Set typing status for 10 seconds
await client.updatePresence(process.env.WHATSAPP_RECIPIENT, 'composing', 10);

// Set recording status
await client.updatePresence(process.env.WHATSAPP_RECIPIENT, 'recording');
```

## Environment Variables

For security, credentials should be stored in environment variables rather than hardcoded.

### Setup Instructions

1. **Copy the example file:**
```bash
cp .env.example .env
```

2. **Edit `.env` with your credentials:**
```bash
# Apipedia Authentication (REQUIRED)
APIPEDIA_APP_KEY=your-app-key-here
APIPEDIA_AUTH_KEY=your-auth-key-here

# Device Management (Optional)
APIPEDIA_DEVICE_ID=your-device-uuid-here

# Recipients for Testing/Usage (Optional)
TEST_WHATSAPP_NUMBER=your-whatsapp-number
TEST_TELEGRAM_RECEIVER=your-telegram-chat-id
WHATSAPP_RECIPIENT=recipient-whatsapp-number
TELEGRAM_RECIPIENT=recipient-telegram-chat-id

# AI & Other Services (Optional)
AI_AGENT_ID=your-ai-agent-id-here
PHONE_TO_CHECK=phone-number-to-verify
```

3. **Use environment variables in your code:**
```javascript
require('dotenv').config();

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

// All sensitive values should come from environment
const deviceId = process.env.APIPEDIA_DEVICE_ID;
const phoneNumber = process.env.PHONE_TO_CHECK;
const recipientWhatsApp = process.env.WHATSAPP_RECIPIENT;
const recipientTelegram = process.env.TELEGRAM_RECIPIENT;
```

### Security Best Practices

- ✅ **Do:** Store all credentials in `.env`
- ✅ **Do:** Add `.env` to `.gitignore`
- ✅ **Do:** Use different credentials for dev, staging, and production
- ✅ **Do:** Rotate credentials regularly
- ❌ **Don't:** Commit `.env` to version control
- ❌ **Don't:** Hardcode credentials in your code
- ❌ **Don't:** Share your `.env` file or credentials
- ❌ **Don't:** Log or print sensitive values

### See `.env.example` for all available variables

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Comprehensive Chaining
```bash
npm run test:comprehensive
```

This will run extreme long chains to verify that the fluent API works perfectly even with 10+ chained operations!

### Test with Coverage
```bash
npm run test:coverage
```

## 🚀 Automatic Publishing

This package supports automatic publishing to npm via GitHub Actions. To set it up:

1. Create an npm automation token at [npm Token Creation](https://www.npmjs.com/settings/your-username/tokens)
2. Add the token as a GitHub secret in your repository settings:
   - Go to Settings → Secrets and Variables → Actions
   - Add a new secret named `NPM_TOKEN` with your npm token as the value
3. The GitHub Action will automatically publish to npm when changes are pushed to the main branch

The automatic publishing workflow is defined in `.github/workflows/npm-publish-semver.yml`.

## 🎯 Perfect Chaining Examples

The library now supports the **exact syntax you requested**:

```javascript
require('dotenv').config();

// ✅ This works perfectly!
await client
  .aiChat('message', process.env.AI_AGENT_ID)
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT, '📱 WA: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT, '💬 TG: ')
  .toSMS(process.env.WHATSAPP_RECIPIENT, '📨 SMS: ');

// ✅ Even extreme chains work flawlessly!
await client
  .aiChat('Create content', process.env.AI_AGENT_ID)
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT, '📱 WA: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT, '💬 TG: ')
  .toSMS(process.env.WHATSAPP_RECIPIENT, '📨 SMS: ')
  .toWhatsApp(process.env.WHATSAPP_RECIPIENT_2, '🔄 Share: ')
  .toTelegram(process.env.TELEGRAM_RECIPIENT_2, '⚡ Forward: ')
  .toSMS(process.env.WHATSAPP_RECIPIENT_2, '📤 Broadcast: ');
```