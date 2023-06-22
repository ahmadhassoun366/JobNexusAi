<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../Components/RecruiterNav'

const EditJob = () => {
    let { id } = useParams();

    let [companies, setCompanies] = useState([]);
    let [countries, setCountries] = useState([]);
    let [types, setTypes] = useState([]);
    let [locationTypes, setLocationTypes] = useState([]);

    let [title, setTitle] = useState("");
    let [company, setCompany] = useState(1);
    let [country, setCountry] = useState(1);
    let [type, setType] = useState(1);
    let [locationType, setLocationType] = useState(1);
    let [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_JOB_API_URL}users/api/job/${id}/`)
            .then(response => {
                setTitle(response.data[0]?.title);
                setCompany(response.data[0]?.company.id);
                setCountry(response.data[0]?.country.id);
                setType(response.data[0]?.type.id);
                setLocationType(response.data[0]?.locationType.id);
                setDescription(response.data[0]?.description);
            })
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/companies/`)
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/countries/`)
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/job_types/`)
            .then(response => setTypes(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/job_location_types/`)
            .then(response => setLocationTypes(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const updateJob = () => {
        let jobData = {
            "title": title,
            "company": company,
            "country": country,
            "type": type,
            "locationType": locationType,
            "description": description
        }
        console.log(jobData);
        axios.put(`${process.env.REACT_APP_JOB_API_URL}/users/api/edit_job/${id}/`, jobData)
            .then(response => {
                console.log('Updated successfully:', response.data);
                alert("Updated Successfully!");
                window.location.href = "http://localhost:3000/recruiter";
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <Navbar/>
            <main className="main bg-gray-50 px-6 md:px-16 py-6">
            <div className="w-2/4 max-w mx-auto bg-white p-10 m-5 rounded-2xl shadow-2xl">
                    <form>
                        <h1 className="text-2xl mb-2">  </h1>

                        <div className="job-info border-b-2 py-2 mb-5">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="title">Title</label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} value={title} />
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
                                    <label className="block text-gray-700 text-sm mb-2" htmlFor="location-type">
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
                                <textarea type="text" 
                                  className="border shadow-inner"
                                  name="description" id="description" cols="76" rows="7" value={description} onChange={(event) => { setDescription(event.target.value) }}></textarea>
                            </div>

                        </div>
                    </form>
                    <div className="flex justify-center items-center">
                        <button onClick={() => updateJob()} className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-5 rounded">
                            Update
                        </button>
                    </div>
                </div>
            </main>
        </>)
}
=======
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditJob = () => {
    let { id } = useParams();

    let [companies, setCompanies] = useState([]);
    let [countries, setCountries] = useState([]);
    let [types, setTypes] = useState([]);
    let [locationTypes, setLocationTypes] = useState([]);

    let [title, setTitle] = useState("");
    let [company, setCompany] = useState(0);
    let [country, setCountry] = useState(0);
    let [type, setType] = useState(0);
    let [locationType, setLocationType] = useState(0);
    let [description, setDescription] = useState("");
    let [deadline, setDeadline] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/job/${id}/`)
            .then(response => {
                setTitle(response.data[0]?.title);
                setCompany(response.data[0]?.company.id);
                setCountry(response.data[0]?.country.id);
                setType(response.data[0]?.type.id);
                setLocationType(response.data[0]?.locationType.id);
                setDescription(response.data[0]?.description);
                setDeadline(response.data[0]?.deadline)
            })
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/companies/`)
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/countries/`)
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/job_types/`)
            .then(response => setTypes(response.data))
            .catch(error => console.error(error));

        axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/job_location_types/`)
            .then(response => setLocationTypes(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const updateJob = () => {
        let jobData = {
            "title": title,
            "company": company,
            "country": country,
            "type": type,
            "locationType": locationType,
            "description": description,
            "deadline": deadline
        }
        console.log(jobData);
        axios.put(`${process.env.REACT_APP_JOB_API_URL}/users/api/edit_job/${id}/`, jobData)
            .then(response => {
                console.log('Updated successfully:', response.data);
                alert("Updated Successfully!");
                window.location.href = "http://localhost:3000/recruiter";
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <main className="main bg-white px-6 md:px-16 py-6">
                <div className="w-full max-w-xl mx-auto">
                    <form>
                        <h1 className="text-2xl mb-2">  </h1>

                        <div className="job-info border-b-2 py-2 mb-5">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm mb-2" htmlFor="title">Title</label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} value={title} />
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
                                    <label className="block text-gray-700 text-sm mb-2" htmlFor="location-type">
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
                            <label htmlFor="deadline" className="block text-gray-700 text-sm mb-2">Deadline</label>
                            <input type="date" name="deadline" id="deadline" cols="76" rows="7" value={deadline} onChange={(event) => {
                                let deadlineDate = event.target.value.toString();
                                setDeadline(deadlineDate);
                                console.log(deadlineDate);
                            }}></input>
                        </div>

                            <div>
                                <label htmlFor="description" className="block text-gray-700 text-sm mb-2">Description</label>
                                <textarea type="text" name="description" id="description" cols="76" rows="7" value={description} onChange={(event) => { setDescription(event.target.value) }}></textarea>
                            </div>

                        </div>
                    </form>
                    <div>
                        <button onClick={() => updateJob()} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded">
                            Update
                        </button>
                    </div>
                </div>
            </main>
        </>)
}
>>>>>>> 115d1572d6b888ef821d4001f62bb8cd8fb043e7
export default EditJob