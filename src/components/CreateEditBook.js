import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateEditBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    editorial: "",
    year: "",
    genre: "",
    pages: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/books/${id}`)
        .then((response) => setBook(response.data))
        .catch((error) => console.error("Error fetching book:", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (id) {
        // Editar libro
        await axios.put(`http://localhost:5000/api/books/${id}`, book, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Crear nuevo libro
        await axios.post("http://localhost:5000/api/books", book, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };
  const handleBack = () => {
    navigate("/"); // volver a la página principal
  };
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4">{id ? "Editar Libro" : "Crear Nuevo Libro"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Nombre del Libro</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Nombre del libro"
              value={book.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="author">Autor</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              placeholder="Autor"
              value={book.author}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="editorial">Editorial</label>
            <input
              type="text"
              className="form-control"
              id="editorial"
              name="editorial"
              placeholder="Editorial"
              value={book.editorial}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="year">Año</label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              placeholder="Año de publicación"
              value={book.year}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="genre">Género</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              placeholder="Género"
              value={book.genre}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="pages">Páginas</label>
            <input
              type="number"
              className="form-control"
              id="pages"
              name="pages"
              placeholder="Número de páginas"
              value={book.pages}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            {id ? "Actualizar Libro" : "Crear Libro"}
          </button>
        </form>
        <button className="btn btn-primary mt-3" onClick={handleBack}>
            Volver a la Página Principal
          </button>
      </div>
    </div>
  );
};

export default CreateEditBook;
