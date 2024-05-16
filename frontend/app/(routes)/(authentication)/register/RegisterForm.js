'use client';

import { useState } from "react";
import Form from "../../../components/authentication/Form";
import './Register.scss'

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());
        const age = calculateAge(new Date(data.year, data.month, data.day));
        
        if(age < 18) {
            alert('You need to be over 18 to sign up');
        } else {
            alert('Signed up');
        }

    }
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    function calculateAge(dob) {
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        let month = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        if(month < 0) {
            age--;
            month += 12;
        }
        else if(month == 0) {
            if(day < 0) {
                age--;
                days += daysInMonth(dob.getFullYear(), dob.getMonth()+1); 
            } else {
                age++;
            }
        }
        return age;
    }

    return (
        <Form>
            <h4 className="form-title">Create an account</h4>
            <hr/>
            <h2>Welcome to woork!</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className="input-container">
                    <input name="firstName" type="text" placeholder="First Name" className="form-input" required/>
                    <input name="lastName" type="text" placeholder="Last Name" className="form-input" required/>
                </div>
                <br/>
                <label>Email</label>
                <div className="input-container">
                    <input name="email" type="email" placeholder="company@mail.com" className="form-input" required/>
                </div>
                <br/>
                <label>Phone number</label>
                <div className="input-container">
                    <select name="country_code" className="form-input" required defaultValue="">
                        <option value="" disabled>Country/Region</option>
                        <option value="1">Mexico (+52)</option>
                        <option value="2">United States (+1)</option>
                    </select>
                    <input name="phoneNumber" type="text" placeholder="Phone number" className="form-input"/>
                </div>
                <br/>
                <label>Birth date</label>
                <div className="input-container">
                    <select name="month" className="form-input" required defaultValue={month} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {[...Array(12)].map((x, i) => 
                            <option value={i+1}>{months[i]}</option>
                        )}
                    </select>
                    <select name="day" className="form-input" required defaultValue={day}>
                        {[...Array(daysInMonth(selectedMonth, selectedYear))].map((x, i) => 
                            <option value={i+1}>{i+1}</option>
                        )}
                    </select>
                    <select name="year" className="form-input" required defaultValue={year} onChange={(e) => setSelectedYear(e.target.value)}>
                        {[...Array(124)].map((x, i) => 
                            <option value={year-123+i}>{year-123+i}</option>
                        )}
                    </select>
                </div>
                <br/>
                <div className="input-container">
                    <button type="sumbit" className="form-input">Submit</button>
                </div>
            </form>
        </Form>
    )
}