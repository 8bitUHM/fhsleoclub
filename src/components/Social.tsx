const Social = () => {

    return (
        <>
            <div className="h-[10rem] bg-red-900 flex justify-center items-center text-balance">
                <a href="https://www.instagram.com/fhs_leo_club/" className="flex flex-row justify-center items-center">
                    <img src="/fhs-leo-club-logo.png" className="w-20 h-20 mx-3 self-center" alt="Leo Club Logo" />
                    <div className="flex flex-col">
                        <h2 className="text-white text-4xl md:text-5xl drop-shadow-lg font-family font-oswald font-medium py-3">Instagram @ FHS_LEO_CLUB</h2>
                        <p className="text-white text-xl md:text-3xl">Farrington Highschool Leo Club 🦁❤️🧡</p>
                    </div>
                </a>
            </div>
        </>
    );
};

export default Social;