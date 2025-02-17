import { z as zod } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

// ----------------------------------------------------------------------

export const subscriptionsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(zod.object({ userId: zod.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      if (userId === ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const [createdSubscription] = await db
        .insert(subscriptions)
        .values({ viewerId: ctx.user.id, creatorId: userId })
        .returning();

      return createdSubscription;
    }),

  remove: protectedProcedure
    .input(zod.object({ userId: zod.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      if (userId === ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const [deletedSubscription] = await db
        .delete(subscriptions)
        .where(
          and(
            eq(subscriptions.viewerId, ctx.user.id),
            eq(subscriptions.creatorId, userId)
          )
        )
        .returning();

      return deletedSubscription;
    }),
});
