import React from 'react'
import { useState } from 'react';

export default function Form() {
    const [formData, setData] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        gender: '',
        skills: '',
        email: '',
        phone: '',
        address: ''
    })

    function setUserData<T>(key: string, value: T): void {
        setData((prev) => ({ ...prev, [key]: value }));
    }

    function validateField(key: string, value: string) {
        if (key === 'email') {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(value)) {
                alert('Please enter a valid email address');
                return false;
            }
        }
        if (key === 'age') {
            if (Number(value) < 1) {
                alert('Please enter a valid age')
                return false;
            }
        }
        if (key === 'phone') {
            if (value.length !== 10) {
                alert('Please enter a valid phone number. (10 digits)');
                return false;
            }
            if (Number(value) < 0) {
                alert('Please enter a valid phone number. It can not be negative');
                return false;
            }
        }
        if (value === "") {
            alert(`This field cannot be empty: ${key}`);
            return false;
        }
        return true;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const fields = Object.keys(formData);
        for (let key of fields) {
            const value = formData[key as keyof typeof formData];
            if (!validateField(key, value.toString())) {
                return;
            }
        }

        window.alert(JSON.stringify(formData, null, 2));
    }

    return (
        <div className="container-lg mt-5 mb-5 d-flex justify-content-center align-items-center min-vh-100">
            <form className="shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder="Enter first name" onChange={(e) => { setUserData<string>('firstName', e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder="Enter last name" onChange={(e) => { setUserData<string>('lastName', e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" placeholder="Enter age" onChange={(e) => { setUserData<Number>('age', Number(e.target.value)) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="male" onChange={(e) => { setUserData<string>('gender', e.target.value) }} />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="female" onChange={(e) => { setUserData<string>('gender', e.target.value) }} />
                        <label className="form-check-label">Female</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <select className="form-select" onChange={(e) => { setUserData<string>('skills', e.target.value) }}>
                        <option value="">Select a skill</option>
                        <option value="react">React</option>
                        <option value="node">Node.js</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => { setUserData<string>('email', e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" onChange={(e) => { setUserData<string>('phone', e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows={3} placeholder="Enter address" onChange={(e) => { setUserData<string>('address', e.target.value) }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>


    );
}
