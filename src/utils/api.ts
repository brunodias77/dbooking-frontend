export const API_URL = "http://localhost:8080";

export function LOGIN_POST() {
  return {
    url: API_URL + "/auth/login",
  };
}
