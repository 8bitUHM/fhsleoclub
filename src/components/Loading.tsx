const Loading = () => {

    return (
        <>
            <div className="inline-flex cursor-not-allowed items-center rounded-md px-4 py-2 text-xl md:text-3xl leading-6 font-semibold text-red-900 transition duration-150 ease-in-out">
                <svg
                    className="mr-3 -ml-1 size-6 md:size-8 animate-spin text-red-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                Loading...
            </div>
        </>
    );
};

export default Loading;