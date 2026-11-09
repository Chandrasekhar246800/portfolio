import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data }) => {
    console.info(`[Contact Message Received] ${data.name} <${data.email}>: ${data.subject}`);

    return {
      success: true,
      receivedAt: new Date().toISOString(),
      message: "Thank you! Your message has been received.",
    };
  });
