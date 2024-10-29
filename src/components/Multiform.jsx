import { useState } from "react";
import SingleBlog from "./Singleblog";

const Multiform = () => {
    // State per memorizzare la lista di articoli del blog
    const [blogs, setBlogs] = useState([]);

    const categories = [
        "Antipasti",
        "Primi Piatti",
        "Secondi Piatti",
        "Dolci",
        "Bevande",
        "Colazioni",
        "Cucina Vegetariana",
        "Cucina Vegana",
        "Street Food",
    ];

    const tags = [
        "Ricette Facili",
        "Senza Glutine",
        "Senza Lattosio",
        "Cucina Italiana",
        "Cucina Asiatica",
        "Cottura al Forno",
        "Spezie",
        "Ingredienti Freschi",
    ];

    // Dati di default per un nuovo blog
    const initialData = {
        title: "",
        image: "",
        content: "",
        category: "",
        tags: [],
        published: false,
    };

    // State per memorizzare i dati dell'articolo corrente in fase di creazione
    const [formData, setFormData] = useState(initialData);

    //Creo funzione empty
    const isEmpty = (field) => field.trim().length === 0;
    const isInvalid =
        isEmpty(formData.title) ||
        isEmpty(formData.image) ||
        isEmpty(formData.content);

    //Funzione per gestire il submit del form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            return;
        }
        //Aggiungo l'articolo alla lista dei blog
        setBlogs((curr) => [...curr, formData]);
        //Resetto i campi input
        setFormData(initialData);
    };

    // Funzione per aggiornare un campo specifico nel form dell'articolo
    const handleField = (key, newValue) => {
        setFormData((data) => ({ ...data, [key]: newValue }));
    };

    // Funzione per gestire l'aggiunta o rimozione di un tag nell'articolo
    const handleTagChange = (tag) => {
        setFormData((prevData) => {
            // Controllo se il tag è già presente
            const isTagSelected = prevData.tags.includes(tag);
            const newTags = isTagSelected
                ? prevData.tags.filter((t) => t !== tag) // Rimuovo il tag se era selezionato
                : [...prevData.tags, tag]; // Aggiungo il tag se non era selezionato

            return { ...prevData, tags: newTags };
        });
    };

    return (
        <>
            <div className="main-container">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-element">
                            <label htmlFor="title">Titolo Blog: </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Inserisci il titolo del blog"
                                value={formData.title}
                                className="input-field"
                                onChange={(e) =>
                                    handleField("title", e.target.value)
                                }
                            />
                        </div>
                        <div className="form-element">
                            <label htmlFor="image">URL Immagine: </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                placeholder="Inserisci l'URL dell'immagine"
                                value={formData.image}
                                className="input-field"
                                onChange={(e) =>
                                    handleField("image", e.target.value)
                                }
                            />
                        </div>
                        <div className="form-element">
                            <label htmlFor="content">Descrizione: </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                rows="10"
                                placeholder="Inserisci una descrizione per il Blog..."
                                onChange={(e) =>
                                    handleField("content", e.target.value)
                                }
                                className="input-field"
                            />
                        </div>
                        <div className="form-element">
                            <label htmlFor="category">Categoria: </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    handleField("category", e.target.value)
                                }
                                className="input-field"
                            >
                                <option value="">
                                    Seleziona una categoria
                                </option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="checkbox-container">
                            <div className="form-element tags">
                                <label>Tags: </label>
                                {tags.map((tag) => (
                                    <div key={tag} className="tag-item">
                                        <input
                                            type="checkbox"
                                            id={tag}
                                            checked={formData.tags.includes(
                                                tag
                                            )}
                                            onChange={() =>
                                                handleTagChange(tag)
                                            }
                                            className="checkbox"
                                        />
                                        <label
                                            htmlFor={tag}
                                            className="tag-label"
                                            style={{ marginBottom: "0" }}
                                        >
                                            {tag}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="publish-container">
                                <label
                                    htmlFor="published"
                                    style={{ marginBottom: "0" }}
                                >
                                    Pubblica:
                                </label>
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) =>
                                        handleField(
                                            "published",
                                            e.target.checked
                                        )
                                    }
                                    className="checkbox"
                                />
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" className="my-button">
                                <span>Aggiungi</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 74 74"
                                >
                                    <circle
                                        stroke-width="3"
                                        stroke="black"
                                        r="35.5"
                                        cy="37"
                                        cx="37"
                                    />
                                    <path
                                        fill="black"
                                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="blog-list-container">
                {blogs.length > 0 && (
                    <h2 className="lista-dei-blog">Lista dei Blogs</h2>
                )}
                <ul className="blog-list">
                    {blogs.map((post, index) => (
                        <SingleBlog key={index} post={post} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Multiform;
