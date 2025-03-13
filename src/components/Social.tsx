const Social = () => {

    // console.log(location.pathname)

    return (
        <>
            <div className="h-[8rem] my-12 flex justify-center items-center text-balance">
                <a href="https://www.instagram.com/fhs_leo_club/" className="flex flex-row items-center text-center">
                    <img src="/fhs-leo-club-logo.png" className="w-20 h-20 mx-3" alt="Leo Club Logo" />
                    <div className="flex flex-col">
                        <h2 className="text-5xl md:text-6xl drop-shadow-lg font-family font-oswald font-medium py-3">Instagram @ fhs_leo_Club</h2>
                        <p className="text-2xl md:text-3xl">Farrington Highschool Leo Club 🦁❤️🧡</p>
                    </div>
                </a>
            </div>
        </>
    );
};

export default Social;