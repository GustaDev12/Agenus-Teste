import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string({ error: 'Name is required' }).min(4, { error: 'Name must be at least 4 characters long' }),
    email: z.string({ error: 'Email is required' }).email({ error: 'Invalid email format' }),
})

export type createUserDTO = z.infer<typeof createUserSchema>