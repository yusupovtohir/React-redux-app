import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import { Input } from "../ui";
import { ValidationError } from "./";
import AuthService from "../service/auth";

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { isLoading, loggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const registerHandler = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = { username: name, email, password }
    try {
      const response = await AuthService.userRegister(user)
      console.log(response.user);
      dispatch(signUserSuccess(response.user))
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate])

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <form>
          <h1 className="mb-5">Logo</h1>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <ValidationError />
          <Input label={'Username'} state={name} setState={setName} />
          <Input label={'Email'} state={email} setState={setEmail} />
          <Input label={'Password'} type={'password'} state={password} setState={setPassword} />

          <button className="w-100 btn btn-lg btn-primary mt-1" disabled={isLoading} type="submit" onClick={registerHandler}>
            {isLoading ? 'loading...' : 'Register'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
