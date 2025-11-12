import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  socialMedia: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.socialMedia) {
      return NextResponse.json(
        { error: 'Name, email, social media link, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate social media link format (should be a URL or handle)
    // Accepts: full URLs, URLs without protocol, or handles starting with @
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;
    const handlePattern = /^@?[a-z0-9_.-]+$/i;
    const trimmedSocialMedia = body.socialMedia.trim();
    
    if (!urlPattern.test(trimmedSocialMedia) && !handlePattern.test(trimmedSocialMedia)) {
      return NextResponse.json(
        { error: 'Please provide a valid social media link or handle (e.g., https://facebook.com/yourprofile or @instagram_handle)' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Get n8n webhook URL from environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        // Send form data to n8n webhook
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: body.name,
            email: body.email,
            phone: body.phone || 'Not provided',
            socialMedia: body.socialMedia,
            message: body.message,
            timestamp: new Date().toISOString()
          }),
        });

        if (!webhookResponse.ok) {
          console.error('n8n webhook error:', await webhookResponse.text());
          // Continue anyway - don't fail the request if webhook fails
        }
      } catch (webhookError) {
        console.error('Failed to send to n8n webhook:', webhookError);
        // Continue anyway - don't fail the request if webhook fails
      }
    } else {
      console.warn('N8N_WEBHOOK_URL not configured. Skipping webhook call.');
    }

    // Log the submission
    console.log('Contact Form Submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone || 'Not provided',
      socialMedia: body.socialMedia,
      message: body.message,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

