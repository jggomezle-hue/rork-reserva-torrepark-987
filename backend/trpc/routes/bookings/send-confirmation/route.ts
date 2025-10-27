import { publicProcedure } from '../../../create-context';
import { z } from 'zod';
import { sendBookingEmail } from '../../../../utils/mailersend';

const bookingSchema = z.object({
  date: z.string(),
  time: z.string(),
  numberOfChildren: z.number(),
  customerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  childrenAges: z.string().optional(),
  specialRequests: z.string().optional(),
});

export const sendConfirmationProcedure = publicProcedure
  .input(bookingSchema)
  .mutation(async ({ input }) => {
    return await sendBookingEmail(input);
  });

export default sendConfirmationProcedure;
