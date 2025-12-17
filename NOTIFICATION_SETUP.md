# Order Notification Setup Guide

This guide explains how to set up order notifications to WhatsApp and Email.

## Current Setup

When a customer places an order, the system will:
1. Send order details to WhatsApp: **7386190069**
2. Send order details to Email: **rahuladdanki454@gmail.com**

## Email Setup Options

### Option 1: Using EmailJS (Recommended for Quick Setup)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your environment variables or update the API route

### Option 2: Using Resend (Recommended for Production)

1. Sign up at [Resend](https://resend.com/)
2. Get your API key
3. Add `RESEND_API_KEY` to your environment variables
4. Update the API route to use Resend

### Option 3: Using a Webhook Service

1. Use services like Zapier, Make.com, or n8n
2. Create a webhook that receives order data
3. Configure it to send emails
4. Add the webhook URL to `EMAIL_WEBHOOK_URL` environment variable

## WhatsApp Setup Options

### Option 1: WhatsApp Business API (Recommended for Production)

1. Set up WhatsApp Business API account
2. Get API credentials
3. Update the API route to use WhatsApp Business API

### Option 2: Using Twilio WhatsApp API

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get WhatsApp API credentials
3. Update the API route to use Twilio

### Option 3: Current Implementation (Simple)

The current implementation creates a WhatsApp link that can be opened. For automatic sending, you'll need to use one of the API options above.

## Environment Variables

Create a `.env.local` file in your project root:

```env
# Email Configuration
EMAIL_WEBHOOK_URL=your_webhook_url_here
# OR
RESEND_API_KEY=your_resend_api_key_here

# WhatsApp Configuration
WHATSAPP_API_KEY=your_whatsapp_api_key_here
# OR
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

## Testing

1. Place a test order
2. Check the console logs for notification details
3. Verify email and WhatsApp messages are received

## Troubleshooting

- Check browser console for errors
- Verify API credentials are correct
- Check email spam folder
- Ensure WhatsApp number is correct format (with country code)

