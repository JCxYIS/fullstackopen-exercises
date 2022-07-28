const CreateBlog = ({onSubmit, setTitle, setAuthor, setUrl}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                title
                <input type="text" name="title" onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                author
                <input type="text" name="author" onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url
                <input type="text" name="url" onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateBlog