export const API_URL = "http://localhost:8080";

export function LOGIN_POST() {
  return {
    url: API_URL + "/auth/login",
  };
}

export function REGISTER_POST() {
  return {
    url: API_URL + "/auth/register-user",
  };
}
