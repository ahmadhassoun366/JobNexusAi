import React, { useState } from 'react'
import signup from '../assets/img/signup.png';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();


    const handlePassword = (e) => {
        setPassword(e.target.value);
		setPasswordError('');
		setPasswordMatch(true);
    };

    const handleConfPassword = (e) => {
        setConfPassword(e.target.value);
		setPasswordError('');
		setPasswordMatch(true);
    };

	const validatePasswords = () => {
		if (password !== confPassword) {
		  setPasswordMatch(false);
		} else {
		  setPasswordMatch(true);
		}
	  };

    const handleReset = async (e) => {

		const data = {
			password,
            token,
		};

		await fetch(`${process.env.REACT_APP_JOB_API_URL}/api/password_reset/confirm/`, {
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
			  navigate('/login')
			})
			.catch((error) => {
			  // Handle the error
			  console.error(error);
			});
	};


  return (
    <>
    <Navbar/>
<section className="bg-white">
		<div className="flex justify-center items-center container w-full">
			<div className="	 px-6 my-12 bg-r">
				<div className=" flex justify-center items-center w-full shadow-2xl">
					{/* <div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-xl shadow-2xl"
						style={{backgroundImage:`url(`+signup+`)`}}
					></div> */}
					<div className="w-full lg:w-3/4 bg-white p-5 rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
						<h2 className="mt-2 text-3xl font-bold text-gray-900">
							New  Password</h2>
							<p className="mb-4 text-sm text-gray-700 mt-5">
								We get it, stuff happens. Just enter your email address below and we'll send you a
								link to reset your password!
							</p>
						</div>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleReset}>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									New Password
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder="New password..."
                                    value={password}
                                    onChange={handlePassword}
								/>
							</div>
                            <div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Confirm New Password
								</label>
								<input
									className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
										!passwordMatch ? 'border-red-500' : 'border-gray-200'
									}`}
									type="password"
									placeholder="Confrim New Password..."
                                    value={confPassword}
                                    onChange={handleConfPassword}
									onBlur={validatePasswords}
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
							{!passwordMatch && <p className="text-red-500">Passwords do not match</p>}
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