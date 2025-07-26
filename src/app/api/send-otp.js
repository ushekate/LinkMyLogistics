import pbclient from '@/lib/db';
import nodemailer from 'nodemailer'

export async function POST(req) {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
        // Save OTP in PocketBase
        await pbclient.collection('email_otps').create({
            email,
            code: otp,
            expires_at: expiresAt.toISOString()
        });

        // Send OTP Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Verification Code",
            html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to send OTP" }), { status: 500 });
    }
}
