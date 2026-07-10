import zod, { email } from "zod";

export const zodLogin = zod.object({
  email : zod.email(),
  password:zod.string().min(5)
})

export const zodSignUp = zod.object({
  email:zod.email(),
  password:zod.string().min(5),
  tenantId:zod.string()
})

export const zodCreate =zod.object({
  title:zod.string(),
  content:zod.string()
})