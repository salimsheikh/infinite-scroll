import React, { useState, useEffect } from 'react';

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    const data = await response.json();
    setItems((prevItems) => [...prevItems, ...data]);
    setLoading(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="infinite-scroll-component">
      {items.map((item) => (
        <div key={item.id} className="item">
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
      {loading && (
        <div className="loading">
          {/* <img src="/loading.gif" alt="Loading..." /> */}
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollComponent;