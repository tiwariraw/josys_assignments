import React, { useState, useCallback } from 'react';
import List from './List';

const UseCallBack: React.FC = () => {
    const [number, setNumber] = useState<number>(1);
    const [dark, setDark] = useState<boolean>(false);

    // const getItems = (): number[] => {
    //     return [number, number + 1, number + 2];
    // };

    const getItems = useCallback((): number[] => {
        return [number, number + 1, number + 2];
    }, [number]);

    const theme: React.CSSProperties = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333',
    };

    return (
        <div style={theme}>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value, 10))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Toggle Theme
            </button>
            <List getItems={getItems} />
        </div>
    );
}
export default UseCallBack;