import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
let urlApi = "https://625b-2806-269-4403-80ef-e8f8-122c-673e-ec9c.ngrok.io/api/v1/clients";

export const Create = () => {
  const navigate = useNavigate();
  // Parametro url
  const { id } = useParams();
  // User values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [data, setData] = useState(null);
  const postUser = async () => {
    setLoading(true);
    setError(false);
    try {
      let bodyRequest = {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          lastName: "Espinoza",
          phone: "888888"
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(urlApi, bodyRequest);
      const data = await response.json();
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  const deleteUser = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${urlApi}${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  const updateUser = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${urlApi}${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);

      setError(true);
    }
  };

  const getUser = async () => {
    setError(false); // Si teniamos algún error previamente
    setLoading(true); // Activamos la pantalla de carga
    // Hacemos la llamada a nuestro backend
    fetch(urlApi + id)
      // Then en Javascript es para "entonces"
      .then((response) => {
        // Tomamos la respuesta del backend (es la response)
        if (response.ok) {
          // Si la respuesta es correcta
          // Regresamos la info transformada a json
          return response.json();
        } else {
          // Si no es correcta, ponemos nuestro error en true
          setError(true);
          // Quitamos la carga
          setLoading(false);
          // Regresamos el error por default
          return new Error(response.data);
        }
      })
      .then((data) => {
        // Entonces si todo ha salido bien podemos trabajar con la data del backend
        // Quitamos la carga
        setLoading(false);
        // Guardamos la info
        setName(data.name);
        setEmail(data.email);
      })
      .catch((error) => {
        // Si tenemos algún error en nuestro codigo guardamos el error
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
  return (
    <div className="page__container">
      {loading ? (
        <span>Cargando...</span>
      ) : error ? (
        <span>Ha ocurrido un error</span>
      ) : (
        <>
          <h1>Editar user</h1>
          <span>Rellena los campos para editar un user</span>
          <form
            onSubmit={() => {
              postUser();
            }}
          >
            <label for="name">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Ingresa el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label for="name">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa el email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Editar user</button>
          </form>
        </>
      )}
    </div>
  );
};
