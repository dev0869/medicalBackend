
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import { Link } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const Formdata = (data) => {
    setData(data)
    reset()
  }

  useEffect(() => {
    const formdata = async () => {
      try {
        const res = await axios.post("https://devfolio.onrender.com/api/user/login", data)
        // const res = await axios.post("https://api.freeapi.app/api/v1/users/login", data)
        console.log(res.data);
        localStorage.setItem('AccessToken',res.data.data.AccessToken)
        localStorage.setItem('refreshToken',res.data.data.RefeshToken)

      } catch (error) {
        console.log(error);
      }
    }
    formdata()
  }, [data])



  return (
    <section className="bg-gray-50 py-8 w-full h-screen dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(Formdata)}>


              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input {...register("email", { required: "Email is Required" })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input {...register("password", { required: "password is req" })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

              </div>

              <button type="submit" className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Didn0t have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

