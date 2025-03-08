const Header = () => {

    return (
        <>
            <div className="bg-[url('/farrington.jpg')] bg-cover bg-center h-[28rem] flex justify-center items-center text-center">
                {/* <img src="/farrington.jpg" alt="Farrington Picture" /> */}
                <h1 className="text-red-500 text-4xl md:text-6xl drop-shadow-lg font-family font-oswald font-medium">{location.pathname === "/" ? "FARRINGTON HIGH SCHOOL LEO CLUB" : location.pathname.replace(/^\/|\/$/g, "").toUpperCase()}</h1>
            </div>

        </>
    );
};

export default Header;