import Client from "./api"

export const SignInUser = async (data) => {
  try {

    const res = await Client.post("/user/signin", data)
    console.log("data", res)
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
    // Checks if the current token if it exists is valid
    const res = await Client.get("/user/session")
    console.log("check session", res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
