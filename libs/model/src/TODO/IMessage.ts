import { z } from "zod";

export const ICreate = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  completed: z.boolean().optional().default(false),
});

export type TCreate = z.infer<typeof ICreate>;


export const IRemove = z.object({
  ids: z.array(z.string()).nonempty()
})

export type TRemove = z.infer<typeof IRemove>;

