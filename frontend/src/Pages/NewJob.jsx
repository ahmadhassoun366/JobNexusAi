<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from 'axios';

const NewJob = () => {
    let [companies, setCompanies] = useState([]);
    let [countries, setCountries] = useState([]);
    let [types, setTypes] = useState([]);
    let [locationTypes, setLocationTypes] = useState([]);

    //let [recruiter, setRecruiter] = useState([]);

    let [title, setTitle] = useState("");
    let [company, setCompany] = useState(1); //change to 1 after creating a new database
    let [country, setCountry] = useState(1); //change to 1 after creating a new database
    let [type, setType] = useState(1);
    let [locationType, setLocationType] = useState(1);
    let [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/api/companies/")
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/countries/")
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/job_types/")
            .then(response => setTypes(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/job_location_types/")
            .then(response => setLocationTypes(response.data))
            .catch(error => console.error(error));
    }, []);

    const addjob = () => {
        let job = {
            "title": title,
            "company": company,
            "country": country,
            "recruiter": 2, //recruiter
            "type": type,
            "locationType": locationType,
            "description": description
        }
        console.log(job)
        axios.post("http://127.0.0.1:8000/users/api/add_job/", job)
            .then(response => {
                console.log('Added successfully:', response.data);
                alert("Added Successfully!");
                window.location.href = "http://localhost:3000/recruiter";
            })
            .catch(error => console.error(error))
    }

    return (

        <main className="main bg-white px-6 md:px-16 py-6">
            <div className="w-full max-w-xl mx-auto">
                <form>
                    <h1 className="text-2xl mb-2">Add New Job</h1>

                    <div className="job-info border-b-2 py-2 mb-5">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="title">Title</label>
                            <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} />
                        </div>


                        <div className="md:flex md:justify-between">

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="company">
                                    Company
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="company" name="company" value={company} onChange={(event) => setCompany(event.target.value)}>
                                        {companies.map((company) => (
                                            <option key={company?.id} value={company?.id}>{company?.name}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="type">
                                    Type
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="type" name="type" value={type} onChange={(event) => setType(event.target.value)}>
                                        {types.map((type) => (
                                            <option key={type?.id} value={type?.id}>{type?.type}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="md:flex md:justify-between">

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="country">
                                    Country
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="country" name="country" value={country} onChange={(event) => setCountry(event.target.value)}>
                                        {countries.map((country) => (
                                            <option key={country?.id} value={country?.id}>{country?.name}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="locationType">
                                    Location Type
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="locationType" name="locationType" value={locationType} onChange={(event) => setLocationType(event.target.value)}>
                                        {locationTypes.map((locationType) => (
                                            <option key={locationType?.id} value={locationType?.id}>{locationType?.locationType}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm mb-2">Description</label>
                            <textarea name="description" id="description" cols="76" rows="7" onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>


                    </div>
                </form>
                <div>
                    <button onClick={() => addjob()} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded">
                        Add
                    </button>
                </div>
            </div>
        </main>)
}

=======
import React, { useState, useEffect } from "react";
import axios from 'axios';

const NewJob = () => {
    let [companies, setCompanies] = useState([]);
    let [countries, setCountries] = useState([]);
    let [types, setTypes] = useState([]);
    let [locationTypes, setLocationTypes] = useState([]);

    //let [recruiter, setRecruiter] = useState([]);

    let [title, setTitle] = useState("");
    let [company, setCompany] = useState(2); //change to 1 after creating a new database
    let [country, setCountry] = useState(3); //change to 1 after creating a new database
    let [type, setType] = useState(1);
    let [locationType, setLocationType] = useState(1);
    let [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/api/companies/")
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/countries/")
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/job_types/")
            .then(response => setTypes(response.data))
            .catch(error => console.error(error));

        axios.get("http://127.0.0.1:8000/users/api/job_location_types/")
            .then(response => setLocationTypes(response.data))
            .catch(error => console.error(error));
    }, []);

    const addjob = () => {
        let job = {
            "title": title,
            "company": company,
            "country": country,
            "recruiter": 3, //recruiter
            "type": type,
            "locationType": locationType,
            "description": description
        }
        console.log(job)
        axios.post("http://127.0.0.1:8000/users/api/add_job/", job)
            .then(response => {
                console.log('Added successfully:', response.data);
                alert("Added Successfully!");
                window.location.href = "http://localhost:3000/recruiter";
            })
            .catch(error => console.error(error))
    }

    return (

        <main className="main bg-white px-6 md:px-16 py-6">
            <div className="w-full max-w-xl mx-auto">
                <form>
                    <h1 className="text-2xl mb-2">Add New Job</h1>

                    <div className="job-info border-b-2 py-2 mb-5">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="title">Title</label>
                            <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} />
                        </div>


                        <div className="md:flex md:justify-between">

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="company">
                                    Company
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="company" name="company" value={company} onChange={(event) => setCompany(event.target.value)}>
                                        {companies.map((company) => (
                                            <option key={company?.id} value={company?.id}>{company?.name}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="type">
                                    Type
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="type" name="type" value={type} onChange={(event) => setType(event.target.value)}>
                                        {types.map((type) => (
                                            <option key={type?.id} value={type?.id}>{type?.type}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="md:flex md:justify-between">

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="country">
                                    Country
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="country" name="country" value={country} onChange={(event) => setCountry(event.target.value)}>
                                        {countries.map((country) => (
                                            <option key={country?.id} value={country?.id}>{country?.name}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/12 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="locationType">
                                    Location Type
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="locationType" name="locationType" value={locationType} onChange={(event) => setLocationType(event.target.value)}>
                                        {locationTypes.map((locationType) => (
                                            <option key={locationType?.id} value={locationType?.id}>{locationType?.locationType}</option>
                                        ))}
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm mb-2">Description</label>
                            <textarea name="description" id="description" cols="76" rows="7" onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>


                    </div>
                </form>
                <div>
                    <button onClick={() => addjob()} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded">
                        Add
                    </button>
                </div>
            </div>
        </main>)
}

>>>>>>> main
export default NewJob