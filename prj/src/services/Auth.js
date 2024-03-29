import Client from "./api"

export const SignInUser = async (data) => {
  try {
    const res = await Client.post("/user/signin", data)
    localStorage.setItem("token", res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post("/user/register", data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkSession = async () => {
  try {
    const res = await Client.get("/user/session")
    return res.data
  } catch (error) {
    throw error
  }
}
