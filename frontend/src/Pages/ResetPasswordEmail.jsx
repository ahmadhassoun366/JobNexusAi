import React, { useState } from 'react'
import signup from '../assets/img/signup.png';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';



const ResetPassword = () => {
	const [email, setEmail] = useState('');

	const handleEmail = (e) => {
		setEmail(e.target.value);
	  };

	const handleReset = async (e) => {

		const data = {
			email,
		};

		await fetch(`${process.env.REACT_APP_JOB_API_URL}/api/password_reset/`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
	
		  })
			.then((response) => response.json())
			.then((data) => {
			  // Handle the response data
			  console.log(data);
			  alert("Done");
			})
			.catch((error) => {
			  // Handle the error
			  console.error(error);
			});
	};


  return (
    <>
    <Navbar/>
<section className="font-mono bg-white">
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-xl shadow-2xl"
						style={{backgroundImage:`url(`+signup+`)`}}
					></div>
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
							<h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
							<p className="mb-4 text-sm text-gray-700">
								We get it, stuff happens. Just enter your email address below and we'll send you a
								link to reset your password!
							</p>
						</div>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleReset}>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Enter your email
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									type="email"
									placeholder="Email"
									value={email}
									onChange={handleEmail}
								/>
							</div>
                            
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Reset Password
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link   to="/register"
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="./register.html"
								>
									Create an Account!
								</Link>
							</div>
							<div className="text-center">
								<Link to="/login"
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="./index.html"
								>
									Already have an account? Login!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
    
    </>
  )
}

export default ResetPassword;