import React, { useEffect, useState } from 'react';

interface ListProps {
    getItems: () => number[];
}

const List: React.FC<ListProps> = ({ getItems }) => {
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        setItems(getItems());
        console.log('Updating Items');
    }, [getItems]);

    return (
        <>
            {items.map((item, ind) => (
                <div key={ind}>{item}</div>
            ))}
        </>
    );
}
export default List;