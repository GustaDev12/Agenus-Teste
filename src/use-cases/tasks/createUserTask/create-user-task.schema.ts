import { z } from 'zod'

export const createUserTaskSchema = z.object({
    title: z.string({ error: 'Title is required' }).min(4, { error: 'Title must be at least 4 characters long' }),
    description: z.string({ error: 'Description is required' }).min(4, { error: 'Description must be at least 4 characters long' }),
    status: z.enum(['PENDING', 'COMPLETED'], { error: 'Status must be PENDING or COMPLETED' }), 
})

export type createUserTaskDTO = z.infer<typeof createUserTaskSchema>