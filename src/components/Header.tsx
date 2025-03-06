const Header = () => {

    return (
        <>
            <div className="bg-[url('/farrington.jpg')] bg-cover bg-center h-screen flex justify-center items-center">
                {/* <img src="/farrington.jpg" alt="Farrington Picture" /> */}
                <h1 className="text-white">{location.pathname === "/" ? "FARRINGTON HIGH SCHOOL LEO CLUB" : location.pathname.replace(/^\/|\/$/g, "").toUpperCase()}</h1>
            </div>

        </>
    );
};

export default Header;