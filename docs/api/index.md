# API Documentation

## WhatsApp Messaging APIs

### Individual Messaging API
Endpoint: `https://waconsole.apipedia.id/api/create-message`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `message`: Text message content
- `file`: Optional media file for sending with the message

### Bulk Messaging V1 API (Same Message)
Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev1`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
- `message`: Text message content to send to all recipients

### Bulk Messaging V2 API (Different Messages)
Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev2`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
- `message`: Pipe-separated list of messages matching the numbers (e.g., "message1|message2")

## Telegram Messaging APIs

### Telegram Send Message
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_message`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `body`: Text content of the message

### Telegram Send Image
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_image`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `image_url`: URL of the image to send
- `caption`: Optional caption text for the image

### Telegram Send Location
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_location`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

### Telegram Send Buttons
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_buttons`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `body`: Text content of the message
- `buttons`: Formatted button data for inline keyboard

### Telegram Send Document
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_document`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `document_url`: URL of the document to send
- `caption`: Optional caption text for the document
- `filename`: Optional filename to show for the document
## Device Management APIs

### Check Contact Number
Endpoint: `https://waconsole.apipedia.id/api/device/contact/check`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `device_id`: Device UUID (e.g., "7da1f5ba-81fb-4d5d-bbce-f407427cf364")
- `phone`: Phone number to check in international format (e.g., "628998937095")

### Get Session Status
Endpoint: `https://waconsole.apipedia.id/api/device/session/status`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `device_id`: Device UUID (e.g., "7da1f5ba-81fb-4d5d-bbce-f407427cf364")

Response Includes:
- `connected`: Boolean indicating if device is connected
- `authenticated`: Boolean indicating if device is authenticated
- `phone`: Phone number of the authenticated device

### Get Last Webhook Update
Endpoint: `https://waconsole.apipedia.id/api/device/webhook/last-update`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `device_id`: Device UUID (e.g., "7da1f5ba-81fb-4d5d-bbce-f407427cf364")

Returns:
- Last webhook message received by the device
- Useful for debugging and monitoring message flow

### Get Newsletter ID
Endpoint: `https://waconsole.apipedia.id/api/device/webhook/newsletter-id`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `device_id`: Device UUID (e.g., "7da1f5ba-81fb-4d5d-bbce-f407427cf364")

Returns:
- Newsletter ID for WhatsApp Channel broadcasts
- Remote JID in newsletter format
- Extracted from last webhook update

## SMS APIs

### Regular SMS
Endpoint: `https://waconsole.apipedia.id/api/sms/send-reguler`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `msg`: SMS message content

### VIP SMS
Endpoint: `https://waconsole.apipedia.id/api/sms/send-vip`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `msg`: SMS message content

### OTP SMS
Endpoint: `https://waconsole.apipedia.id/api/sms/send-otp`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `msg`: OTP message content

### VVIP SMS
Endpoint: `https://waconsole.apipedia.id/api/sms/send-vvip`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `msg`: SMS message content

## AI Chat API

### Send Message to AI
Endpoint: `https://waconsole.apipedia.id/api/chat-ai/send-message`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `message`: Your message to the AI agent
- `agent_id`: ID of the AI agent to use
- `format`: Response format ('text' or 'json')

## Profile & Status APIs

### Get Profile
Endpoint: `https://waconsole.apipedia.id/api/profile/raw`
Method: GET
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication

### Update Presence
Endpoint: `https://waconsole.apipedia.id/api/presence/update`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Target phone number
- `presence`: Presence type ('composing', 'recording', 'online', etc.)
- `duration`: Optional duration in seconds

## Message Status APIs

### Get All Message Statuses
Endpoint: `https://waconsole.apipedia.id/api/messages/status/all`
Method: GET
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `message_id`: ID of the message to check

### Get Last Status
Endpoint: `https://waconsole.apipedia.id/api/status/last`
Method: GET
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `message_id`: ID of the message to check

### Get Last Receipt Status
Endpoint: `https://waconsole.apipedia.id/api/messages/status/last/receipt`
Method: GET
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `message_id`: ID of the message to check
