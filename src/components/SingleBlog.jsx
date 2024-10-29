const SingleBlog = ({ post }) => {
    return (
        <li className="blog-item">
            <div className="title-image-container">
                <span>{post.title}</span>
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="blog-image"
                    />
                )}
            </div>
            <div className="blog-info-container">
                <span>Categoria: {post.category}</span>
                <p>Descrizione: {post.content}</p>
                <p>
                    {post.tags.length > 0
                        ? post.tags.map((tag, index) => (
                              <span key={index} className="tag-block">
                                  #{tag}
                              </span>
                          ))
                        : "Nessun tag"}
                </p>
                <p>Stato: {post.published ? "Pubblicato" : "Non pubblicato"}</p>
            </div>
        </li>
    );
};

export default SingleBlog;
