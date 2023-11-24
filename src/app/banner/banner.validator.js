const { urlencoded } = require("express");
const { z } = require("zod");

const bannerCreateSchema=z.object({
    title:z.string().min(3),
    url:z.string().url().default(null),

    status:z.string().regex(/active|inactive/)
})
module.exports={bannerCreateSchema};