import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    userName: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      userName: formValues.userName,
      country: formValues.country,
      email: formValues.email,
      password: formValues.password
      // country: formValues.country
    })
    setFormValues({
      userName: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    navigate('/signin')
  }

  return (
    <div className="container">
      <div className="card-overlay centered">
        <h1 className="RegisterHeader"> Register</h1>
        <form className="content__form" onSubmit={handleSubmit}>
          <div className="content__inputs">
            <label htmlFor="name">
              <input
                onChange={handleChange}
                name="userName"
                type="text"
                value={formValues.userName}
                required
              />
              <span>Name</span>
            </label>

            <label htmlFor="country">
              <input
                onChange={handleChange}
                name="country"
                type="text"
                value={formValues.country}
                required
              />
              <span>Country</span>
            </label>

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

            <label htmlFor="confirmPassword">
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                required
              />
              <span>Confirm Password</span>
            </label>

            <button
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password)
              }
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
