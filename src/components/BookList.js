import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Verificación de autenticación

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token de localStorage
    navigate("/"); 
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Libros</h1>
      <div className="d-flex justify-content-between mb-4">
        {!isAuthenticated ? (
          <button className="btn btn-primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
        {isAuthenticated && (
          <button className="btn btn-success" onClick={handleCreate}>
            Crear Nuevo Libro
          </button>
        )}
      </div>

      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Autor: {book.author}</p>
                <p className="card-text text-muted">Publicado en: {book.year}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-info btn-block mb-2"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    Ver Detalle
                  </button>
                  {isAuthenticated && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(book._id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(book._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
