import { useState } from "react"
import "./styleForm.css"

function validation(userData) {
    let errores = {}
    const passRegexchar = /^(?=.*\d).{6,10}$/
    const passRegexnum = /^(?=.*\d).+/;
    //const passRegexnum = new RegExp("[0-9]")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(userData.email)) {
        errores.email = "Ingrese su email"
    }
    if (userData.email.length >= 35) {
        errores.email = "Email inválido, exceso de caracteres"
    }
    if (!passRegexnum.test(userData.password)) {
        errores.password = "Debe contener al menos un número"
    }
    else if (!passRegexchar.test(userData.password)) {
        errores.password = "Debe contener entre 6 y 10 caracteres"
    }
    return errores;
}

function Form({ login }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })
    function handlerChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }
    // function handlerChange(event) {
    //     const { name, value } = event.target;
    //     const updatedUserData = {
    //       ...userData,
    //       [name]: value,
    //     };
    //     setUserData(updatedUserData);

    //     const updatedErrors = validation(updatedUserData);
    //     setErrors(updatedErrors);
    //   }



    function submitHandler(event) {
        event.preventDefault()
        if (!errors.email && !errors.password) {
            login(userData)
        } else {
            alert("email/password inválido")
        }
    }
    return (
        <div className="box">
            <div className="form-box">
                <form className="form" onSubmit={submitHandler}>
                    <h2>Bienvenido</h2>
                    <div className="inputBox">
                        <input
                            value={userData.email}
                            placeholder="Email"
                            name="email"
                            onChange={handlerChange}
                            type="text"
                        />
                        {errors.email && <span>{errors.email}</span>}

                    </div>
                    <div className="inputBox">
                        <input
                            value={userData.password}
                            placeholder="Contraseña"
                            name="password"
                            onChange={handlerChange}
                            type="password"
                        />
                        {errors.password && <span>{errors.password}</span>}

                    </div>
                    {!errors.email && !errors.password && (
                        <button type="submit">Iniciar sesión</button>
                    )}
                </form>
            </div>
        </div>
    );
}
export default Form