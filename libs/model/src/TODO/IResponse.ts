import { z } from "zod";
import { ITODO, ITODOList } from './ITODO'

function makeResponse<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    state: z.boolean(),
    data: itemSchema.optional(),
    error: z.object({
      message: z.string().nonempty()
    }).optional(),
    message: z.string().optional()
  });
}

export const IList = makeResponse(ITODOList);

export type TList = z.infer<typeof IList>;

export const IItem = makeResponse(ITODO);

export type TCreate = z.infer<typeof IItem>;

export const IVoid = makeResponse(z.void());

export type TVoid = z.infer<typeof IVoid>;