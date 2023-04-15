/*
* progress bar component
* */
const MyProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        width: '50%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 2
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default MyProgressBar;