
const { z } = require("zod");

const categoryRequestSchema=z.object({
    title:z.string().min(3),
    description:z.string().nullable(),
status:z.string().regex(/active|inactive/),
parentId:z.string().nullable()
})
module.exports={categoryRequestSchema};