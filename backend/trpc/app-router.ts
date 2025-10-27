import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import sendConfirmationProcedure from "./routes/bookings/send-confirmation/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  bookings: createTRPCRouter({
    sendConfirmation: sendConfirmationProcedure,
  }),
});

export type AppRouter = typeof appRouter;
