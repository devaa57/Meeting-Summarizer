const Loading = () => {
    return (
        <div className="loading-card">

            <div className="loader"></div>

            <h2>Processing Meeting...</h2>

            <p>
                Uploading → Transcribing → Summarizing
            </p>

        </div>
    );
};

export default Loading;