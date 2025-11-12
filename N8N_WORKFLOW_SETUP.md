# n8n Workflow Setup for Contact Form

This document explains how to set up an n8n workflow that handles contact form submissions by sending emails to both the business and the customer.

## Overview

The workflow will:
1. Receive form data via webhook
2. Send an email notification to the business (mysticalwardrobes01@gmail.com)
3. Send a confirmation email to the customer who submitted the form

## Prerequisites

- An n8n account (self-hosted or cloud)
- Email service configured in n8n (Gmail, SMTP, etc.)
- Access to your n8n instance

## Step 1: Create the Workflow

1. Log in to your n8n instance
2. Click "New Workflow" to create a new workflow
3. Name it "Contact Form Handler" or similar

## Step 2: Add Webhook Node

1. Add a **Webhook** node to the canvas
2. Configure it:
   - **HTTP Method**: POST
   - **Path**: `/contact-form` (or any path you prefer)
   - **Response Mode**: "Respond to Webhook"
   - **Response Code**: 200
   - **Response Data**: "All Incoming Items"
3. Click "Execute Node" to activate the webhook
4. **Copy the webhook URL** - you'll need this for the environment variable

## Step 3: Add Email Node for Business Notification

1. Add an **Email Send** node (or **Gmail** node if using Gmail)
2. Connect it after the Webhook node
3. Configure it to send to `mysticalwardrobes01@gmail.com`:

   **For Gmail node:**
   - **Operation**: Send Email
   - **To Email**: `mysticalwardrobes01@gmail.com`
   - **Subject**: `New Contact Form Submission from {{ $json.name }}`
   - **Email Type**: HTML
   - **Message**:
     ```html
     <h2>New Contact Form Submission</h2>
     <p><strong>Name:</strong> {{ $json.name }}</p>
     <p><strong>Email:</strong> {{ $json.email }}</p>
     <p><strong>Phone:</strong> {{ $json.phone }}</p>
     <p><strong>Social Media:</strong> {{ $json.socialMedia }}</p>
     <p><strong>Message:</strong></p>
     <p>{{ $json.message }}</p>
     <hr>
     <p><small>Submitted on: {{ $json.timestamp }}</small></p>
     ```

   **For SMTP/Email Send node:**
   - **From Email**: Your configured sender email
   - **To Email**: `mysticalwardrobes01@gmail.com`
   - **Subject**: `New Contact Form Submission from {{ $json.name }}`
   - **Email Type**: HTML
   - **Message**: Same as above

## Step 4: Add Email Node for Customer Confirmation

1. Add another **Email Send** node (or **Gmail** node)
2. Connect it after the business notification node (or in parallel)
3. Configure it to send to the customer:

   **For Gmail node:**
   - **Operation**: Send Email
   - **To Email**: `{{ $json.email }}`
   - **Subject**: `Thank you for contacting Mystical Wardrobes!`
   - **Email Type**: HTML
   - **Message**:
     ```html
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
       <h2 style="color: #B38882;">Thank You for Contacting Us!</h2>
       <p>Dear {{ $json.name }},</p>
       <p>Thank you for reaching out to Mystical Wardrobes. We have received your message and will get back to you soon.</p>
       <p>Here's a summary of your inquiry:</p>
       <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
         <p><strong>Your Message:</strong></p>
         <p>{{ $json.message }}</p>
       </div>
       <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at <strong>(+63) 976 277 4888</strong>.</p>
       <p>Best regards,<br>The Mystical Wardrobes Team</p>
       <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
       <p style="font-size: 12px; color: #666;">
         Mystical Wardrobes<br>
         Malabon City, Metro Manila, Philippines<br>
         Email: mysticalwardrobes01@gmail.com<br>
         Phone: (+63) 976 277 4888
       </p>
     </div>
     ```

   **For SMTP/Email Send node:**
   - **From Email**: Your configured sender email
   - **To Email**: `{{ $json.email }}`
   - **Subject**: `Thank you for contacting Mystical Wardrobes!`
   - **Email Type**: HTML
   - **Message**: Same as above

## Step 5: Add Error Handling (Optional but Recommended)

1. Add a **Set** node after the webhook to handle errors
2. Add an **IF** node to check if emails were sent successfully
3. Add error notification nodes if needed

## Step 6: Activate the Workflow

1. Click the "Active" toggle in the top right to activate the workflow
2. The webhook URL will be available once activated

## Step 7: Configure Environment Variable

1. Add the webhook URL to your `.env.local` file:
   ```env
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form
   ```
   Or if using n8n cloud:
   ```env
   N8N_WEBHOOK_URL=https://your-workspace.app.n8n.cloud/webhook/contact-form
   ```

2. Restart your Next.js development server or redeploy your application

## Testing

1. Submit a test form from your contact page
2. Check that:
   - The business email (`mysticalwardrobes01@gmail.com`) receives the notification
   - The customer email receives the confirmation
   - The form submission succeeds

## Troubleshooting

### Webhook not receiving data
- Check that the workflow is activated
- Verify the webhook URL in your environment variables
- Check n8n execution logs for errors

### Emails not sending
- Verify your email service (Gmail/SMTP) is properly configured in n8n
- Check email service credentials
- Review n8n execution logs for email sending errors

### Form submission fails
- Check browser console for errors
- Verify the API route is accessible
- Check Next.js server logs

## Workflow JSON Export

If you want to import this workflow directly, here's a basic structure you can use:

```json
{
  "name": "Contact Form Handler",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "contact-form",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "contact-form-webhook"
    },
    {
      "parameters": {
        "operation": "sendEmail",
        "toEmail": "mysticalwardrobes01@gmail.com",
        "subject": "New Contact Form Submission from {{ $json.name }}",
        "emailType": "html",
        "message": "<h2>New Contact Form Submission</h2><p><strong>Name:</strong> {{ $json.name }}</p><p><strong>Email:</strong> {{ $json.email }}</p><p><strong>Phone:</strong> {{ $json.phone }}</p><p><strong>Message:</strong></p><p>{{ $json.message }}</p><hr><p><small>Submitted on: {{ $json.timestamp }}</small></p>"
      },
      "name": "Notify Business",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "operation": "sendEmail",
        "toEmail": "{{ $json.email }}",
        "subject": "Thank you for contacting Mystical Wardrobes!",
        "emailType": "html",
        "message": "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\"><h2 style=\"color: #B38882;\">Thank You for Contacting Us!</h2><p>Dear {{ $json.name }},</p><p>Thank you for reaching out to Mystical Wardrobes. We have received your message and will get back to you soon.</p><p>Here's a summary of your inquiry:</p><div style=\"background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;\"><p><strong>Your Message:</strong></p><p>{{ $json.message }}</p></div><p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at <strong>(+63) 976 277 4888</strong>.</p><p>Best regards,<br>The Mystical Wardrobes Team</p></div>"
      },
      "name": "Confirm to Customer",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Notify Business", "type": "main", "index": 0}]]
    },
    "Notify Business": {
      "main": [[{"node": "Confirm to Customer", "type": "main", "index": 0}]]
    }
  },
  "active": true
}
```

## Notes

- Make sure your n8n instance is accessible from the internet (for webhooks)
- Consider adding rate limiting to prevent spam
- You may want to add a database node to store submissions for record-keeping
- The workflow can be extended to add Slack notifications, CRM integration, etc.

