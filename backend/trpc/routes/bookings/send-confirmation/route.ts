import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_TOKEN || process.env.MAILERSEND_API_KEY || "";
const DOMAIN_ID = "test-pzkmgq7x6v2l059v.mlsender.net";
const TEMPLATE_ID = "jpzkmgqyj5ml059v";

if (!MAILERSEND_API_KEY) {
  console.error("⚠️ MAILERSEND_API_TOKEN is not configured!");
}

console.log("📧 MailerSend Config:", {
  apiKeyPresent: !!MAILERSEND_API_KEY,
  apiKeyLength: MAILERSEND_API_KEY?.length,
  apiKeyPrefix: MAILERSEND_API_KEY?.substring(0, 10),
  domain: DOMAIN_ID,
  template: TEMPLATE_ID,
});

const BookingSchema = z.object({
  customerName: z.string(),
  email: z.string().email(),
  date: z.string(),
  time: z.string(),
  numberOfChildren: z.number(),
  childrenAges: z.string().optional(),
  phone: z.string(),
  specialRequests: z.string().optional(),
});

export const sendConfirmationProcedure = publicProcedure
  .input(BookingSchema)
  .mutation(async ({ input }) => {
    console.log("Sending confirmation email to:", input.email);
    console.log("Using API Key:", MAILERSEND_API_KEY ? `${MAILERSEND_API_KEY.substring(0, 10)}...` : "MISSING");

    if (!MAILERSEND_API_KEY) {
      throw new Error("MAILERSEND_API_TOKEN is not configured in environment variables");
    }

    try {
      const response = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERSEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: {
            email: `noreply@${DOMAIN_ID}`,
            name: "TorrePark",
          },
          to: [
            {
              email: input.email,
              name: input.customerName,
            },
          ],
          template_id: TEMPLATE_ID,
          variables: [
            {
              email: input.email,
              substitutions: [
                {
                  var: "customer_name",
                  value: input.customerName,
                },
                {
                  var: "booking_date",
                  value: input.date,
                },
                {
                  var: "booking_time",
                  value: input.time,
                },
                {
                  var: "number_of_children",
                  value: input.numberOfChildren.toString(),
                },
                {
                  var: "children_ages",
                  value: input.childrenAges || "No especificado",
                },
                {
                  var: "phone",
                  value: input.phone,
                },
                {
                  var: "special_requests",
                  value: input.specialRequests || "Ninguna",
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("MailerSend API error:", errorText);
        throw new Error(`Failed to send email: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log("Email sent successfully:", result);

      return {
        success: true,
        message: "Email de confirmación enviado correctamente",
      };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error(
        error instanceof Error ? error.message : "Error al enviar el email"
      );
    }
  });

export default sendConfirmationProcedure;
