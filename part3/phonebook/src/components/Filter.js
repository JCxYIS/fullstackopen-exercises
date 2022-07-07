const Filter = (props) => {
    return (
        <div>
            filter: <input onChange={event => props.setFilter(event.target.value)} />
        </div>
    )
}

export default Filter;