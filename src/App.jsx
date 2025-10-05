import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./ApiSlice";
import "./App.css"; // Import CSS file

function App() {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;

  return (
    <div className="app-container">
      <h1 className="title">Posts from JSONPlaceholder</h1>
      <div className="posts-grid">
        {Array.isArray(data) &&
          data.map((post) => (
            <div className="post" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
