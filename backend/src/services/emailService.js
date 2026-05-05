// Mock email service - in production, integrate with SendGrid
class EmailService {
  async sendWelcomeEmail(email, name) {
    try {
      // In production, use SendGrid or similar
      console.log(`Welcome email sent to ${email}`);
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendOrderConfirmation(email, orderNumber) {
    try {
      console.log(`Order confirmation sent to ${email} for order ${orderNumber}`);
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendShippingNotification(email, orderNumber, trackingNumber) {
    try {
      console.log(`Shipping notification sent to ${email}`);
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
