import { useEffect } from "react";

const UnMountExp: React.FC = () => {
    useEffect(() => {
        const handleResize = () => {
            console.log("Window resized to:", window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <p>UseEffect UnMount Example</p>;
};

export default UnMountExp;
