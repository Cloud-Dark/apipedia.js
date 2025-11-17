# Device Management Examples

Complete examples for using device management methods with Apipedia.js

## Example 1: Check Contact Registration

Verify if a phone number is registered on WhatsApp:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function checkWhatsAppContact() {
  try {
    console.log('Checking if contact is registered on WhatsApp...');

    const response = await client.checkContactNumber(
      process.env.APIPEDIA_DEVICE_ID,
      process.env.PHONE_TO_CHECK
    );

    const result = response.getResult();

    if (result.data.exists) {
      console.log('✅ Contact is registered on WhatsApp');
      console.log('WhatsApp JID:', result.data.phone);
    } else {
      console.log('❌ Contact is NOT registered on WhatsApp');
    }
  } catch (error) {
    console.error('Error checking contact:', error.message);
  }
}

checkWhatsAppContact();
```

---

## Example 2: Monitor Session Status

Check if your WhatsApp session is connected and authenticated:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function monitorSessionStatus() {
  try {
    console.log('Checking WhatsApp session status...\n');

    const response = await client.getSessionStatus(
      process.env.APIPEDIA_DEVICE_ID
    );

    const sessionData = response.getResult();
    const { connected, authenticated, phone } = sessionData.data;

    console.log('Session Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Connected:     ${connected ? '✅ Yes' : '❌ No'}`);
    console.log(`Authenticated: ${authenticated ? '✅ Yes' : '❌ No'}`);
    console.log(`Phone Number:  ${phone}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Additional status checks
    if (!connected) {
      console.log('⚠️  Warning: Device is not connected. Please check your connection.');
    }

    if (!authenticated) {
      console.log('⚠️  Warning: Device is not authenticated. Please re-authenticate.');
    }

    if (connected && authenticated) {
      console.log('✅ Your WhatsApp session is healthy and ready to use!');
    }
  } catch (error) {
    console.error('Error monitoring session:', error.message);
  }
}

monitorSessionStatus();
```

---

## Example 3: Debug Webhook Messages

Retrieve and inspect the last webhook message received:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function debugWebhookMessages() {
  try {
    console.log('Fetching last webhook update...\n');

    const response = await client.getLastWebhookUpdate(
      process.env.APIPEDIA_DEVICE_ID
    );

    const webhookData = response.getResult();

    console.log('Last Webhook Update:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Timestamp:    ${webhookData.data.formattedTime}`);
    console.log(`Type:         ${webhookData.data.type}`);
    console.log(`Message Type: ${webhookData.data.data.type}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (webhookData.data.data.messages && webhookData.data.data.messages.length > 0) {
      const message = webhookData.data.data.messages[0];
      console.log('Message Details:');
      console.log('  From:', message.key.participant || message.key.remoteJid);
      console.log('  Contact Name:', message.pushName);
      console.log('  Timestamp:', new Date(message.messageTimestamp * 1000).toISOString());
      console.log('  Content:', message.message.conversation);
    }
  } catch (error) {
    console.error('Error debugging webhook:', error.message);
  }
}

debugWebhookMessages();
```

---

## Example 4: Extract Newsletter ID for Channels

Get Newsletter ID for broadcasting to WhatsApp Channels:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function getNewsletterIDForChannels() {
  try {
    console.log('Extracting Newsletter ID...\n');

    const response = await client.getNewsLetterId(
      process.env.APIPEDIA_DEVICE_ID
    );

    const newsletterData = response.getResult();

    if (newsletterData.data.found) {
      console.log('✅ Newsletter Found!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`Newsletter ID: ${newsletterData.data.newsletter_id}`);
      console.log(`Remote JID:    ${newsletterData.data.remote_jid}`);
      console.log(`Extracted At:  ${new Date(newsletterData.data.timestamp * 1000).toISOString()}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      console.log('Use this Newsletter ID to broadcast to your WhatsApp Channel!');
      console.log(`ID to copy: ${newsletterData.data.newsletter_id}`);
    } else {
      console.log('❌ No newsletter found.');
      console.log('Steps to fix:');
      console.log('1. Open WhatsApp Channels on your phone');
      console.log('2. Create a new channel (if you don\'t have one)');
      console.log('3. Send or receive a test message in the channel');
      console.log('4. Run this script again to extract the Newsletter ID');
    }
  } catch (error) {
    console.error('Error extracting newsletter:', error.message);
  }
}

getNewsletterIDForChannels();
```

---

## Example 5: Device Health Check Dashboard

Complete health check with all device information:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function deviceHealthCheckDashboard() {
  try {
    console.clear();
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║     WhatsApp Device Health Check Dashboard     ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    // Check 1: Session Status
    console.log('📊 Checking Session Status...');
    const sessionResponse = await client.getSessionStatus(
      process.env.APIPEDIA_DEVICE_ID
    );
    const sessionData = sessionResponse.getResult();
    const sessionStatus = {
      connected: sessionData.data.connected,
      authenticated: sessionData.data.authenticated,
      phone: sessionData.data.phone
    };

    // Check 2: Last Webhook Update
    console.log('📨 Fetching Last Webhook Update...');
    const webhookResponse = await client.getLastWebhookUpdate(
      process.env.APIPEDIA_DEVICE_ID
    );
    const webhookData = webhookResponse.getResult();

    // Check 3: Newsletter ID
    console.log('📢 Checking Newsletter Availability...');
    const newsletterResponse = await client.getNewsLetterId(
      process.env.APIPEDIA_DEVICE_ID
    );
    const newsletterData = newsletterResponse.getResult();

    // Display Results
    console.log('\n═══════════════════════════════════════════════════');
    console.log('SESSION STATUS');
    console.log('═══════════════════════════════════════════════════');
    console.log(`Connected:      ${sessionStatus.connected ? '✅' : '❌'}`);
    console.log(`Authenticated:  ${sessionStatus.authenticated ? '✅' : '❌'}`);
    console.log(`Phone:          ${sessionStatus.phone}`);

    console.log('\n═══════════════════════════════════════════════════');
    console.log('LAST ACTIVITY');
    console.log('═══════════════════════════════════════════════════');
    console.log(`Last Update:    ${webhookData.data.formattedTime}`);
    console.log(`Message Type:   ${webhookData.data.type}`);

    console.log('\n═══════════════════════════════════════════════════');
    console.log('CHANNEL STATUS');
    console.log('═══════════════════════════════════════════════════');
    if (newsletterData.data.found) {
      console.log(`Newsletter:     ✅ Active`);
      console.log(`Newsletter ID:  ${newsletterData.data.newsletter_id}`);
    } else {
      console.log(`Newsletter:     ⚠️  Not Available`);
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log('OVERALL STATUS');
    console.log('═══════════════════════════════════════════════════');

    const isHealthy = sessionStatus.connected && sessionStatus.authenticated;
    if (isHealthy) {
      console.log('✅ Device is healthy and ready for messaging!');
    } else {
      console.log('❌ Device needs attention. Please check connection and authentication.');
    }

    console.log('═══════════════════════════════════════════════════\n');
  } catch (error) {
    console.error('Error running health check:', error.message);
  }
}

deviceHealthCheckDashboard();
```

---

## Example 6: Chained Operations with Notifications

Perform device checks and send results to multiple platforms:

```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);

async function chainedDeviceNotifications() {
  try {
    console.log('Running chained device checks with notifications...\n');

    // Check session and notify via WhatsApp
    console.log('1️⃣  Checking session and sending to WhatsApp...');
    await client.getSessionStatus(process.env.APIPEDIA_DEVICE_ID)
                .toWhatsApp(
                  process.env.WHATSAPP_RECIPIENT,
                  '📊 Device Session Status:\n'
                );

    // Get webhook update and send to multiple channels
    console.log('2️⃣  Getting webhook update and forwarding...');
    await client.getLastWebhookUpdate(process.env.APIPEDIA_DEVICE_ID)
                .toWhatsApp(
                  process.env.WHATSAPP_RECIPIENT,
                  '📨 Last Webhook Update:\n'
                )
                .toTelegram(
                  process.env.TELEGRAM_RECIPIENT,
                  '🔔 Latest Message Activity:\n'
                );

    // Extract newsletter and notify
    console.log('3️⃣  Extracting newsletter ID...');
    await client.getNewsLetterId(process.env.APIPEDIA_DEVICE_ID)
                .toTelegram(
                  process.env.TELEGRAM_RECIPIENT,
                  '📢 Newsletter Information:\n'
                );

    console.log('\n✅ All checks completed and notifications sent!');
  } catch (error) {
    console.error('Error in chained operations:', error.message);
  }
}

chainedDeviceNotifications();
```

---

## Running the Examples

1. **Set up environment variables** in `.env`:
```bash
APIPEDIA_APP_KEY=your-app-key
APIPEDIA_AUTH_KEY=your-auth-key
APIPEDIA_DEVICE_ID=your-device-id
PHONE_TO_CHECK=phone-number-to-verify
WHATSAPP_RECIPIENT=recipient-number
TELEGRAM_RECIPIENT=telegram-chat-id
```

2. **Run an example**:
```bash
node example1-check-contact.js
node example2-monitor-session.js
node example3-debug-webhooks.js
node example4-get-newsletter.js
node example5-health-check.js
node example6-chained-notifications.js
```

3. **View the results** in console output or your messaging apps

---

## Tips & Tricks

- 🔄 **Polling**: Use `setInterval()` to regularly check session status
- 📊 **Logging**: Store check results for audit trails
- 🚨 **Alerts**: Send notifications when status changes
- 📈 **Analytics**: Track webhook frequency and message types
- 🔌 **Reconnection**: Auto-reconnect logic when connection drops
