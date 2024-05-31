/*import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        // Replace with your email server configuration
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        from: process.env.EMAIL_FROM,
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  events: async ({ email }) => {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        // Generate a token for password reset (e.g., using crypto)
        const token = await generateResetToken(user.id);

        // Send password reset email with token
        sendVerificationRequest(user, token);
      }
    }
  },
});

async function generateResetToken(userId: string) {
  // Implement logic to generate a secure reset token
  // This is a placeholder, replace with your implementation
  return "your-secure-token";
}

async function sendVerificationRequest(user: any, token: string) {
  // Implement logic to send password reset email with the token
  // This is a placeholder, customize email content based on your provider
  console.log(`Sending password reset email to ${user.email} with token: ${token}`);
}
*/
