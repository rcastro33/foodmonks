import { React, Fragment, useState } from "react";
import styled from "styled-components";
import logo from "../assets/foodMonks-sinfondo.png";
import { userLogin } from "../services/Requests";
import { LoginFailure } from "./LoginFailure";

const Styles = styled.div`
  .text-center {
    position: absolute;
    left: 50%;
    top 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .form-signin {
    width: 500px;
  }

  .form-floating {
    margin-bottom: 10px;
  }

  button {
    color: white;
    background-color: #e87121;
    border: none;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
      background-color: #e87121;
    }
    &:hover {
      background-color: #da6416;
    }
    $:active {
      background-color: #e87121;
    }
  }

  input {
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
    }
  }

`;

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(values).then((response) => {
      if (response.status === 200) {
        setError(null);
        localStorage.setItem("token", response.data.token);
        window.location.replace("/");
      } else {
        setError("Algo salio mal! Prueba de nuevo");
      }
    }).catch((err) => {
      if(err && err.response) {
        switch(err.response.status) {
          case 401:
            console.log("401 status");
            setError("Correo o contraseña incorrecto Prueba de nuevo!");
            break;
          default:
            setError("Algo salio mal! Prueba de nuevo");
        } 
      } else {
        setError("Algo salio mal! Prueba de nuevo");
      }
    });
  };

  return (
    <Styles>
      <Fragment>
        <div className="text-center">
          <main className="form-signin">
            <form id="inputs" onSubmit={handleSubmit}>
              <a href="/">
                <img
                  className="mb-4"
                  src={logo}
                  alt=""
                  width="200"
                  height="200"
                />
              </a>
              <h1 className="h3 mb-3 fw-normal">Ingrese con su mail</h1>

              <div className="form-floating">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  required
                />
                <label for="floatingInput">Correo electronico</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <label for="floatingPassword">Contraseña</label>
              </div>

              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> No cerrar sesión
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Entrar
              </button>
              <p className="mt-5 mb-3 text-muted">
                ¿No tienes cuenta?<a href="/register">Registrate</a>
              </p>
            </form>
            {error && <LoginFailure error={error} />}
          </main>
        </div>
      </Fragment>
    </Styles>
  );
}

export default Login;
