import React, { useMemo, useState } from 'react';

const UseMemo: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [dark, setDark] = useState<boolean>(false);

    // Without useMemo, slowFunction is called on every render
    const doubleNumber = slowFunction(number);

    //here usememo memoize the result of slowfun
    // const doubleNumber = useMemo(() => slowFunction(number), [number]);

    const themeStyles: React.CSSProperties = {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
    };

    return (
        <>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value, 10))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>

            <div style={themeStyles}>{doubleNumber}</div>
        </>
    );
}

function slowFunction(num: number): number {
    console.log('Calling Slow Function');
    for (let i = 0; i <= 1000000000; i++) { }
    return num * 2;
}
export default UseMemo;