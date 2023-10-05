import { z } from "zod";
import { ICreate } from './IMessage'

export const ITODO = ICreate.extend({
  id: z.string().nonempty()
})

export type TTODO = z.infer<typeof ITODO>;

export const ITODOList = z.array(ITODO);

export type TTODOList = z.infer<typeof ITODOList>