import { z } from 'zod'

export const updateTaskSchema = z.object({
    title: z.string({ error: 'Title is required' }).min(4, { error: 'Title must be at least 4 characters long' }).optional(),
    description: z.string({ error: 'Description is required' }).min(4, { error: 'Description must be at least 4 characters long' }).optional(),
    status: z.enum(['PENDING', 'COMPLETED'], { error: 'Status must be PENDING or COMPLETED' }).optional(),
})

export type updateTaskDTO = z.infer<typeof updateTaskSchema>