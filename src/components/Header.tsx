const Header = () => {

    return (
        <>
            <header className="bg-[url('/farrington.jpg')] bg-cover bg-center h-[28rem] flex justify-center items-center text-center text-balance">
                <h1 className="text-white text-5xl md:text-6xl drop-shadow-lg font-family font-oswald font-medium">{location.pathname === "/" ? "FARRINGTON HIGH SCHOOL LEO CLUB" : location.pathname === "/contact/" ? "FOLLOW US ON" : location.pathname.replace(/^\/|\/$/g, "").toUpperCase()}</h1>
            </header>
        </>
    );
};

export default Header;