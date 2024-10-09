import React, { useState} from 'react';

const App = () => {
    const [userInput, setUserInput] = useState(
        {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }
    );

    const [inputError, setInputError] = useState(
        {
            firstName: [],
            lastName: [],
            password: [],
            confirmPassword: []
        }
    );

    const [valid, setValid] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInput((prevState) => {
            return {...prevState, [name]: value};
        });
    }

    const validateForm = (e) => {
        e.preventDefault();
        let error = {
            firstName: [],
            lastName: [],
            password: [],
            confirmPassword: []
        };

        if(userInput.firstName.trim() === '') {
            error.firstName.push('First Name is required');
        }

        if (userInput.lastName.trim() === '') {
            error.lastName.push('Last Name is required');
        }

        if (userInput.password.trim() === '') {
            error.password.push('Password is required');
        }

        if (userInput.confirmPassword === '') {
            error.confirmPassword.push('Confirm Password is required');
        }

        if (userInput.password !== userInput.confirmPassword) {
            error.password.push('Password and Confirm Password should match');
            error.confirmPassword.push('Password and Confirm Password should match');
        }

        if(userInput.firstName.length < 5) {
            error.firstName.push('First Name should be at least 5 characters');
        }

        if(userInput.lastName.length < 5) {
            error.lastName.push('Last Name should be at least 5 characters');
        }

        if (
            error.password.length === 0 &&
            error.firstName.length === 0 &&
            error.lastName.length === 0 &&
            error.confirmPassword.length === 0
        ){
            setValid(true);
        }else{
            setValid(false);
        }

        setInputError(error);
    }

    return (
        <div className="grid grid-cols-12 auto-rows-auto">
            {

                valid &&
                <div className="col-start-4 col-span-6 flex flex-col m-8 gap-4 bg-green-800 p-4 rounded text-white font-semibold text-2xl">
                    <h1>Form Validated!</h1>
                </div>
            }

            <form className="col-start-4 col-span-6 flex flex-col m-8 gap-4 bg-gray-100 p-4 rounded">
                <div className="p-2 rounded flex flex-col justify-evenly">
                    <label className="flex" htmlFor="first-name">First Name</label>
                    <input className="flex p-2 rounded " placeholder="John" value={userInput.firstName}
                           onChange={handleChange} name="firstName" id="firstName" type="text"/>
                    {inputError.firstName.length > 0 &&
                        inputError.firstName.map((error, index) => {
                            return <span key={index} className="text-red-500">{error}</span>
                        })}
                </div>

                <div className="p-2 rounded flex flex-col justify-evenly">
                    <label className="flex" htmlFor="last-name">Last Name</label>
                    <input className="flex p-2 rounded " placeholder="Doe" value={userInput.lastName}
                           onChange={handleChange} name="lastName" id="lastName" type="text"/>
                    {inputError.lastName.length > 0 &&
                        inputError.lastName.map((error, index) => {
                            return <span key={index} className="text-red-500">{error}</span>
                        })}
                </div>


                <div className="p-2 rounded flex flex-col justify-evenly">
                    <label className="flex" htmlFor="password">Password</label>
                    <input className="flex p-2 rounded " placeholder="Johndoe123" value={userInput.password}
                           onChange={handleChange} name="password" id="password" type="password"/>
                    {inputError.password.length > 0 &&
                        inputError.password.map((error, index) => {
                            return <span key={index} className="text-red-500">{error}</span>
                        })}
                </div>


                <div className="p-2 rounded flex flex-col justify-evenly">
                    <label className="flex" htmlFor="confirm-password">Confirm Password</label>
                    <input className="flex p-2 rounded " placeholder="Johndoe123" value={userInput.confirmPassword}
                           onChange={handleChange} name="confirmPassword" id="confirmPassword" type="password"/>
                    {inputError.confirmPassword.length > 0 &&
                        inputError.confirmPassword.map((error, index) => {
                            return <span key={index} className="text-red-500">{error}</span>
                        })}
                </div>

                <div className="flex justify-end">
                    <button onClick={validateForm}
                            className="max-w-fit bg-green-800 px-4 py-2 text-white font-semibold rounded "
                            type="submit">Validate
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;