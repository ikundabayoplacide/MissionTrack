import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT), // 587 for STARTTLS
      secure: process.env.EMAIL_SECURE === 'true', // false for STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // allows self-signed certificates
      },
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error);
      } else {
        console.log('✅ Email transporter is ready to send messages');
      }
    });
  }

  // Send password reset email
  async sendPasswordResetEmail(to: string, resetToken: string) {
    try {
      const resetUrl = `http://localhost:5500/reset-password/${resetToken}`;

      const mailOptions = {
        from: `"MissionTrack Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Password Reset Request',
        html: `
            <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Password Reset - MissionTrack</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" 
                         style="background:#ffffff; border-radius:8px; padding:30px; 
                                box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td align="center" style="border-bottom:1px solid #eee; padding-bottom:20px;">
                        <h2 style="margin:0; color:#333;">MissionTrack Support</h2>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:30px 20px; color:#333;">
                        <h3 style="margin-top:0;">Password Reset Request</h3>
                        <p>Hello,</p>
                        <p>We received a request to reset your MissionTrack account password.</p>
                        <p>If you made this request, please click the button below to reset your password:</p>

                        <!-- Reset Button -->
                        <p style="text-align:center; margin:30px 0;">
                          <a href="${resetUrl}" 
                             style="background:#ff6600; color:#fff; text-decoration:none; 
                                    padding:12px 25px; border-radius:6px; font-weight:bold;">
                            Reset My Password
                          </a>
                        </p>

                        <p style="color:#555;">If you didn’t request this, you can safely ignore this email.  
                        Your password will remain unchanged.</p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td align="center" 
                          style="border-top:1px solid #eee; padding-top:20px; color:#999; font-size:12px;">
                        <p>© 2025 MissionTrack. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent:', info.messageId);
      console.log('Preview URL (for Ethereal):', nodemailer.getTestMessageUrl(info));
      return info;
    } catch (error: unknown) {
      console.error('❌ Failed to send password reset email:', error);
      
      // Type guard to safely access error properties
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      throw new Error(`Failed to send password reset email: ${errorMessage}`);
    }
  }

  // Test email connection
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ Email connection test passed');
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('❌ Email connection test failed:', errorMessage);
      return false;
    }
  }
}

export default new EmailService();