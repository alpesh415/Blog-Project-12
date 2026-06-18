import React, { useState, useEffect } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    blog: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !product.title.trim() ||
      !product.image.trim() ||
      !product.blog.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedProducts;

    if (editIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editIndex] = product;
      setEditIndex(null);
    } else {
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProduct({
      title: "",
      image: "",
      blog: "",
    });
  }

  function Delete(index) {
    const updated = products.filter((_, i) => i !== index);

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  function Edit(index) {
    setProduct(products[index]);
    setEditIndex(index);
  }

  const filteredProducts = [...products]
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      padding: "30px",
      fontFamily: "Arial",
    },

    formCard: {
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "25px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    },

    heading: {
      textAlign: "center",
      marginBottom: "20px",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      resize: "none",
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
    },

    topBar: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },

    search: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "none",
    },

    select: {
      padding: "10px",
      borderRadius: "10px",
      border: "none",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "20px",
    },

    card: {
      background: "white",
      borderRadius: "15px",
      padding: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },

    image: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    title: {
      marginTop: "10px",
      color: "#333",
    },

    blog: {
      color: "#666",
      marginTop: "10px",
      lineHeight: "1.6",
    },

    btnGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },

    editBtn: {
      flex: 1,
      background: "green",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    deleteBtn: {
      flex: 1,
      background: "red",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    noData: {
      textAlign: "center",
      color: "white",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.heading}>📝 Blog Manager</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Blog Title"
            value={product.title}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={product.image}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="blog"
            rows="4"
            placeholder="Enter Blog Content"
            value={product.blog}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            {editIndex !== null ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="🔍 Search By Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((item, index) => (
          <div key={index} style={styles.card}>
            <img
              src={item.image}
              alt={item.title}
              style={styles.image}
            />

            <h3 style={styles.title}>{item.title}</h3>

            <p style={styles.blog}>{item.blog}</p>

            <div style={styles.btnGroup}>
              <button
                style={styles.editBtn}
                onClick={() => Edit(index)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => Delete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <h2 style={styles.noData}>No Blogs Found</h2>
      )}
    </div>
  );
}