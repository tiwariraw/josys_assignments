import React, { useLayoutEffect, useRef, useState } from "react";

const FadingEffect: React.FC = () => {
    const headingRef = useRef(null);
    const [opacity, setOpacity] = useState<number>(0);

    useLayoutEffect(() => {
        const fadeEffect = () => {
            let opacityValue = 0;
            const interval = setInterval(() => {
                if (opacityValue < 1) {
                    opacityValue += 0.02;
                    setOpacity(opacityValue);
                } else {
                    clearInterval(interval);
                }
            }, 30);
        };

        fadeEffect();
    }, []);

    return (
        <h1
            ref={headingRef}
            style={{
                opacity,
                transition: "opacity 0.5s ease-in-out",
            }}
        >
            Lets Learn Hooks in React Functional Components
        </h1>
    );
};

export default FadingEffect;
