import { SignInUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: "", password: "" })
    setUser(payload)
    navigate("/")
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="RegisterHeader"> Sign in</h1>
        <form className="content__form" onSubmit={handleSubmit}>
          <div className="content__inputs">
            <label htmlFor="email">
              <input
                onChange={handleChange}
                name="email"
                type="text"
                value={formValues.email}
                required
              />
              <span>Email</span>
            </label>

            <label htmlFor="password">
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
              <span>Password</span>
            </label>

            <button disabled={!formValues.email || !formValues.password}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
