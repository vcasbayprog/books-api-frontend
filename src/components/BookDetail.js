import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  if (!book) return <div className="text-center">Cargando...</div>;

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{book.name}</h2>
          <p className="card-text"><strong>Autor:</strong> {book.author}</p>
          <p className="card-text"><strong>Editorial:</strong> {book.editorial}</p>
          <p className="card-text"><strong>Año:</strong> {book.year}</p>
          <p className="card-text"><strong>Género:</strong> {book.genre}</p>
          <p className="card-text"><strong>Páginas:</strong> {book.pages}</p>
          <p className="card-text">
            <small className="text-muted">Última actualización: hace poco</small>
          </p>
          <button className="btn btn-primary mt-3" onClick={handleBack}>
            Volver a la Página Principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
