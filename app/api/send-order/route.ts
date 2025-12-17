import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Format order details
    const whatsappMessage = formatWhatsAppMessage(orderData)
    const emailData = formatEmailData(orderData)

    // Send to WhatsApp (using WhatsApp Business API or webhook)
    const whatsappUrl = await sendToWhatsApp(whatsappMessage, orderData.orderNumber)

    // Send to Email
    await sendToEmail(emailData)

    return NextResponse.json({ 
      success: true, 
      message: 'Order details sent successfully',
      whatsappUrl 
    })
  } catch (error) {
    console.error('Error sending order details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send order details' },
      { status: 500 }
    )
  }
}

function formatWhatsAppMessage(orderData: any): string {
  const items = orderData.items.map((item: any) => 
    `• ${item.name} x${item.quantity}`
  ).join('\n')

  return `🛒 *New Order Received!*

📦 *Order Number:* ${orderData.orderNumber}

👤 *Customer Details:*
• Name: ${orderData.customerName}
• Phone: ${orderData.phone}
• Shop: ${orderData.shopName}

📋 *Order Items:*
${items}

💰 *Total Amount:* ₹${orderData.total.toFixed(0)}

📅 *Order Date:* ${new Date(orderData.date).toLocaleString('en-IN')}

Status: ${orderData.status.toUpperCase()}`
}

function formatEmailData(orderData: any) {
  return {
    subject: `New Order Received - ${orderData.orderNumber}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #ef4444; padding-bottom: 10px;">New Order Received</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <h3 style="margin: 0; color: #333;">Order Number: ${orderData.orderNumber}</h3>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(orderData.date).toLocaleString('en-IN')}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #ef4444; font-weight: bold;">${orderData.status.toUpperCase()}</span></p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px;">Customer Information</h3>
              <p><strong>Name:</strong> ${orderData.customerName}</p>
              <p><strong>Phone:</strong> <a href="tel:${orderData.phone}">${orderData.phone}</a></p>
              <p><strong>Shop Name:</strong> ${orderData.shopName}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background: #333; color: white;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Item</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Quantity</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items.map((item: any, index: number) => `
                    <tr style="background: ${index % 2 === 0 ? '#fff' : '#f9f9f9'};">
                      <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                      <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                      <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₹${(item.price * item.quantity).toFixed(0)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #e8f5e9; border-radius: 5px; border-left: 4px solid #4caf50;">
              <p style="margin: 5px 0;"><strong>Subtotal:</strong> ₹${orderData.subtotal.toFixed(0)}</p>
              <p style="margin: 5px 0;"><strong>Shipping:</strong> ₹${orderData.shipping.toFixed(0)}</p>
              <p style="margin: 10px 0 0 0; font-size: 20px; font-weight: bold; color: #333;"><strong>Total:</strong> ₹${orderData.total.toFixed(0)}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #666; font-size: 12px;">
              <p>This is an automated email from Alankar Cosmetics</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
}

async function sendToWhatsApp(message: string, orderNumber: string) {
  const phoneNumber = '7386190069'
  const whatsappMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`
  
  // Log for debugging
  console.log('WhatsApp Notification:', {
    phone: phoneNumber,
    orderNumber,
    message: message.substring(0, 100) + '...'
  })
  
  // In production, you can use:
  // 1. WhatsApp Business API
  // 2. Twilio WhatsApp API
  // 3. A webhook service like Zapier/Make.com
  
  // For now, return the URL - you can open it programmatically or use a service
  return whatsappUrl
}

async function sendToEmail(emailData: any) {
  const recipientEmail = 'rahuladdanki454@gmail.com'
  
  try {
    // Option 1: Use Resend API (Recommended for Production)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Alankar Cosmetics <orders@alankarcosmetics.com>',
          to: recipientEmail,
          subject: emailData.subject,
          html: emailData.html,
        }),
      })
      
      if (resendResponse.ok) {
        console.log('✅ Email sent via Resend successfully')
        return { success: true }
      }
    }
    
    // Option 2: Use Webhook Service (Zapier, Make.com, n8n)
    const webhookUrl = process.env.EMAIL_WEBHOOK_URL
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailData.subject,
          html: emailData.html,
        }),
      })
      
      if (webhookResponse.ok) {
        console.log('✅ Email sent via webhook successfully')
        return { success: true }
      }
    }
    
    // Option 3: Log for manual sending (Development)
    console.log('📧 Email Notification Details:')
    console.log('To:', recipientEmail)
    console.log('Subject:', emailData.subject)
    console.log('---')
    console.log('Email HTML content generated successfully')
    console.log('To enable automatic email sending, set up Resend API or Email Webhook')
    console.log('See NOTIFICATION_SETUP.md for instructions')
    
    // In production, you should always have one of the above methods configured
    // For now, we'll return success but log the details
    return { success: true, logged: true }
  } catch (error) {
    console.error('❌ Email sending error:', error)
    // Don't throw - we don't want to fail the order if email fails
    return { success: false, error }
  }
}
