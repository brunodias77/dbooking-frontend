/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { LOGIN_POST } from "../utils/api";
import { cookies } from "next/headers";

interface LoginState {
  ok: boolean;
  error: string;
  data: any;
}

export async function login(
  state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!email || !password) {
      throw new Error("Usuário e senha são obrigatórios");
    }
    const { url } = LOGIN_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("response", response);
    if (!response.ok) throw new Error("Senha ou usuário inválidos.");
    const data: { token: string } = await response.json();
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return { ok: true, error: "", data };
  } catch (error) {
    return { ok: false, error: (error as Error).message, data: null };
  }
}
