import { z } from "zod";
export const createGroupSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    avatarUrl: z.string().optional(),
    members: z.array(z.string()).optional(),
});