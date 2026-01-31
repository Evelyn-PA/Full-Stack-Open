const Notification = ({ message }) => {
    if (!message) {
        return null
    }
    const error = {
        color: message.color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div style={error}>
            {message.text}
        </div>
    )
}
export default Notification 