# apipedia-waconsole Documentation

Welcome to the documentation for the apipedia-waconsole library. This Node.js library enables you to send WhatsApp and Telegram messages through the Apipedia Waconsole API.

## Table of Contents

### API Documentation
- [API Overview](api/index.md) - Complete API documentation for all endpoints
- [WhatsApp Methods](api/)
  - [whatsapp() Method](api/whatsapp.md) - Individual messaging with text and media
  - [bulkV1() Method](api/bulkV1.md) - Bulk messaging with same message to multiple recipients
  - [bulkV2() Method](api/bulkV2.md) - Bulk messaging with different messages to multiple recipients
- [Telegram Methods](api/telegram/)
  - [telegramSendMessage()](api/telegram/send_message.md) - Send text message to Telegram
  - [telegramSendImage()](api/telegram/send_image.md) - Send image message to Telegram
  - [telegramSendLocation()](api/telegram/send_location.md) - Send location message to Telegram
  - [telegramSendButtons()](api/telegram/send_buttons.md) - Send message with buttons to Telegram
  - [telegramSendDocument()](api/telegram/send_document.md) - Send document to Telegram
- [Device Management Methods](api/device-management.md) - Session monitoring, contact verification, and webhook management
  - [checkContactNumber()](api/device-management.md#checkcontactnumberdeviceid-phone) - Verify WhatsApp contact registration
  - [getSessionStatus()](api/device-management.md#getsessionstatusdeviceid) - Check session authentication status
  - [getLastWebhookUpdate()](api/device-management.md#getlastwebhookupdatedeviceid) - Retrieve last webhook message
  - [getNewsLetterId()](api/device-management.md#getnewsletteriddeviceid) - Extract Newsletter ID for channels

### Examples
- [Basic Usage](examples/basic-usage.md) - Getting started with the library
- [WhatsApp Examples](examples/bulk-messaging.md) - Complete examples for WhatsApp bulk messaging
- [Telegram Examples](examples/telegram/index.md) - Complete examples for Telegram messaging
- [Device Management Examples](examples/device-management.md) - Complete examples for device management operations

### Testing
- [Test Documentation](tests/index.md) - Information about the test suite and how to run tests

## Features

- Send text messages to WhatsApp contacts
- Send messages with media attachments (images, documents, etc.) to WhatsApp
- Bulk messaging capabilities (V1 and V2) for WhatsApp
- Telegram messaging capabilities (text, images, locations, buttons, documents)
- Device management features:
  - Verify WhatsApp contact registration
  - Check session authentication status
  - Monitor webhook updates for debugging
  - Extract Newsletter IDs for channel broadcasts
- Support for file paths, URLs, and streams as media
- Fluent chaining API for cross-platform operations
- Proper error handling with detailed messages
- Simple and intuitive API

## Quick Start

```bash
npm install apipedia-waconsole
```

```javascript
const apipedia = require('apipedia-waconsole');

const client = apipedia('your-appkey', 'your-authkey');

// Send a text message
client.whatsapp('1234567890', 'Hello, World!');

// Send bulk messages (same message to multiple recipients)
client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');

// Send bulk messages (different messages to multiple recipients) 
client.bulkV2(['628998937095', '6281615677582'], ['Message for first', 'Message for second']);

// Send Telegram text message
client.telegramSendMessage('368628054', 'Hello from Telegram Bot!');

// Send Telegram image
client.telegramSendImage('368628054', 'https://example.com/photo.jpg', 'Photo caption');
```