import { z } from 'zod'

export const updateUserSchema = z.object({
    name: z.string({ error: 'Name is required' }).min(4, { error: 'Name must be at least 4 characters long' }).optional(),
    email: z.string({ error: 'Email is required' }).email({ error: 'Invalid email format' }).optional(),
})

export type updateUserDTO = z.infer<typeof updateUserSchema>