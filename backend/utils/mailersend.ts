import { z } from "zod";

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_TOKEN || process.env.MAILERSEND_API_KEY || "";
const DOMAIN_ID = "test-pzkmgq7x6v2l059v.mlsender.net";
const TEMPLATE_ID = "jpzkmgqyj5ml059v";

if (!MAILERSEND_API_KEY) {
  console.error("⚠️ MAILERSEND_API_TOKEN no está configurado!");
}

console.log("📧 MailerSend Config:", {
  apiKeyPresent: !!MAILERSEND_API_KEY,
  apiKeyLength: MAILERSEND_API_KEY?.length,
  apiKeyPrefix: MAILERSEND_API_KEY?.substring(0, 10),
  domain: DOMAIN_ID,
  template: TEMPLATE_ID,
});

export const BookingDataSchema = z.object({
  date: z.string(),
  time: z.string(),
  numberOfKids: z.number(),
  parentName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string().optional(),
});

export type BookingData = z.infer<typeof BookingDataSchema>;

export async function sendBookingEmail(bookingData: BookingData) {
  console.log("📧 Enviando email de confirmación a:", bookingData.email);
  console.log("🔑 Usando API Key:", MAILERSEND_API_KEY ? `${MAILERSEND_API_KEY.substring(0, 10)}...` : "FALTA");

  if (!MAILERSEND_API_KEY) {
    throw new Error("MAILERSEND_API_TOKEN no está configurado en las variables de entorno");
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
            email: bookingData.email,
            name: bookingData.parentName,
          },
        ],
        template_id: TEMPLATE_ID,
        variables: [
          {
            email: bookingData.email,
            substitutions: [
              {
                var: "customer_name",
                value: bookingData.parentName,
              },
              {
                var: "booking_date",
                value: bookingData.date,
              },
              {
                var: "booking_time",
                value: bookingData.time,
              },
              {
                var: "number_of_children",
                value: bookingData.numberOfKids.toString(),
              },
              {
                var: "phone",
                value: bookingData.phone,
              },
              {
                var: "special_requests",
                value: bookingData.notes || "Ninguna",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error de API MailerSend:", errorText);
      throw new Error(`Failed to send email: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Email enviado exitosamente:", result);

    return {
      success: true,
      message: "Email de confirmación enviado correctamente",
    };
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error al enviar el email"
    );
  }
}
