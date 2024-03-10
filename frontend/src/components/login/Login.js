import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const history = useHistory();

    const [aadhar, setAadhar] = useState('');
    const [password, setPassword] = useState('');

    const LoginUser = async (e) => {
        e.preventDefault();

        localStorage.setItem("aadhar", aadhar);
        localStorage.setItem("aadhar-password", password);

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password,
                    aadhar,
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }

            const text = await res.text(); // Read the response as text
            if (res.status === 200) {
                alert(text); // Show the success message
                history.push('/Vote');
            } else {
                alert("Wrong login credentials");
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors appropriately
        }
    }

    return (
        <>
            <Container>
                <Form>
                    <form method="POST">
                        <div className="head">Login</div>
                        <div className="aadhar">
                            <label htmlFor="aadhar">Aadhar Number</label>
                            <input type="text" name="aadhar" id="aadhar" placeholder="Enter your Aadhar number" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" onClick={LoginUser}>Login</button>
                    </form>
                </Form>
            </Container>
        </>
    );
};

export default Login;

const Container = styled.div`
    height: 79vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.div`
    height: 60%;
    width: 30%;
    border-radius: 4px;
    box-shadow: 1px 1px 5px black;
    border: 2px solid black;
    padding: 2rem;

    /* Media queries for responsive design */

    form {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        height: 100%;

        .password , .aadhar {
            display: flex;
            flex-direction: column;
            padding: 0px 2rem;

            input {
                height: 1.4rem;
            }
        }

        .head {
            height: 17%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
        }
    }

    button {
        margin: 0px 2rem;
        height: 2rem;
        background: rgba(0,0,0,0.2);
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 4px;
    }
`;
