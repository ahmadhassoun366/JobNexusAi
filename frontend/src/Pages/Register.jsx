import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  const [accountType, setAccountType] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setPasswordMatch(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
    setPasswordMatch(true);
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Perform the sign-up logic based on the selected account type
    if (accountType === 'recruiter') {
      // Make a POST request to the recruiter API
      // Replace the API endpoint with your actual endpoint

      const registrationData = {
        first_name,
        last_name,
        phone,
        email,
        password,
      };

      fetch('http://127.0.0.1:8000/users/api/recruiter_register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),

      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    } else if (accountType === 'jobseeker') {
      // Make a POST request to the job seeker API
      // Replace the API endpoint with your actual endpoint

      const registrationData = {
        first_name,
        last_name,
        phone,
        email,
        password,
      };

      fetch('http://127.0.0.1:8000/users/api/seeker_register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
             body: JSON.stringify(registrationData),

      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleFirstNameChange = (e) => {
    setFirst_name(e.target.value);
  };
  
  const handleLastNameChange = (e) => {
    setLast_name(e.target.value);
  };
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
      <Navbar />
      
<section className=" bg-white">
		<div className="container mx-auto">
			<div className="flex justify-center px-6 ">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex mt-12 mb-20 shadow-2xl">
					
        <div
          className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style={{backgroundImage: `url('https://media.licdn.com/dms/image/C4D12AQFCpiN-GPl5Hg/article-cover_image-shrink_720_1280/0/1623919781732?e=2147483647&v=beta&t=aLbrq90FmbO8jqYP76trWBn6UirnoPb7uHOGjClzu-0')`}}
        ></div>
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h2 className="mt-2 text-3xl font-bold text-gray-900 text-center">Create an Account!</h2>
						

            <div className="mt-5">
            <p className="mt-2 text-base text-gray-600 font-bold">Job Seeker or Recruiter ?</p>

                <div className=" md:flex md:items-center md:-mx-2 justify-center gap-14 mt-5">
                  <button
                    className={`flex justify-center m-2 w-full px-4 py-2 text-white rounded-lg text-base  shadow-lg  md:w-auto md:mx-2 focus:outline-none ${
                      accountType === 'recruiter' ? 'bg-gray-900' : 'bg-gray-700'
                    }`}
                    onClick={() => setAccountType('recruiter')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">Recruiter</span>
                  </button>

                  <button
                    className={`flex justify-center m-2 w-full px-4 py-2 text-white rounded-lg text-base  shadow-lg  md:w-auto md:mx-2 focus:outline-none ${
                      accountType === 'jobseeker' ? 'bg-gray-900' : 'bg-gray-700'
                    }`}
                    onClick={() => setAccountType('jobseeker')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="mx-2">JobSeeker</span>
                  </button>
                </div>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded " onSubmit={handleSignUp}>
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" >
										First Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="text"
										placeholder="First Name"
                    value={first_name}
                    onChange={handleFirstNameChange}
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700" >
										Last Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="text"
										placeholder="Last Name"
                    value={last_name}
                    onChange={handleLastNameChange}
									/>
								</div>
							</div>
              
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" >
									Email
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								
									type="email"
									placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
								/>
							</div>

              <div className="mb-4 md:mr-2 md:mb-0">
              <label className="block mb-2 text-sm font-bold text-gray-700" >Phone number</label>
                  <input
                    value={phone}
                    onChange={handlePhoneChange}
                    type="text"
                    placeholder="+961 XXX XXX"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>

							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Password
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="password"
										placeholder="******************"
                    value={password}
                    onChange={handlePasswordChange}
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700" >
										Confirm Password
									</label>
									<input
										type="password"
										placeholder="******************"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={validatePasswords}
                    className={`block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                      !passwordMatch ? 'border-red-500' : 'border-gray-200'
                    }`}
									/>
								</div>
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-11/12 px-4 py-2 font-bold text-white bg-gray-700 rounded-lg hover:bg-gray-900 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Register Account
								</button>

							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
              {!passwordMatch && <p className="text-red-500">Passwords do not match</p>}

<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</a>
							</div>
							<div className="text-center">
								<Link
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									to="/login"
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

      <Footer />
    </>
  );
};

export default Register;
