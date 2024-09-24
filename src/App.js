import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import Login from "./components/Login";
import CreateEditBook from "./components/CreateEditBook";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateEditBook />} />
          <Route path="/edit/:id" element={<CreateEditBook />} />
        </Routes>
    </Router>
  );
}

export default App;
