/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { RegisterResponse } from "@/types/register-response";
import { REGISTER_POST } from "@/utils/api";
import apiError from "@/utils/api-error";
import { login } from "./login";

interface RegisterState {
  ok: boolean;
  error: string;
  data: RegisterResponse;
}

export default async function register(state: {}, formData: FormData) {
  const firstName = formData.get("FirstName") as string;
  const lastName = formData.get("LastName") as string;
  const birthDate = formData.get("birthDate") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!firstName || !lastName || !birthDate || !phone || !email || !password)
      throw new Error("Preencha os dados.");
    if (password.length < 6)
      throw new Error("A senha deve ter mais de 6 dígitos.");
    const { url } = REGISTER_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        birthDate,
        phone,
        email,
        password,
      }),
    });
    if (!response.ok) throw new Error("Nao foi possivel criar o usuario.");
    const data = await response.json();
    console.log("Aqui no register");
    console.log(data);
    return { ok: true, error: "", data };
  } catch (error: unknown) {
    return apiError(error);
  }
}
