// import React, { useEffect, useState } from 'react';
// import useStorage from './UseStorage';


// interface User {
//     name: string;
//     age: number;
// }

// const Storage: React.FC = () => {
//     const { getItem, setItem, removeItem } = useStorage();
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const newUser: User = { name: 'bc', age: 30 };
//         setItem('user', newUser);

//         const storedUser = getItem('user') as User;
//         setUser(storedUser);

//         const timer = setTimeout(() => {
//             removeItem('user');
//             setUser(null);
//         }, 5000);

//         return () => clearTimeout(timer);
//     }, [getItem, setItem, removeItem]);

//     return (
//         <div>
//             <h1>LocalStorage Example</h1>
//             {user ? (
//                 <div>
//                     <p>Name: {user.name}</p>
//                     <p>Age: {user.age}</p>
//                 </div>
//             ) : (
//                 <p>No user stored in localStorage.</p>
//             )}
//         </div>
//     );
// };

// export default Storage;

import React, { useEffect, useState } from 'react';
import useStorage from './UseStorage';


interface User {
    name: string;
    age: number;
}

const Storage: React.FC = () => {
    const { getItem, setItem, removeItem } = useStorage();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const newUser: User = { name: 'Abc', age: 30 };
        setItem('user', newUser);

        const storedUser = getItem('user') as User;
        setUser(storedUser);

        const timer = setTimeout(() => {
            removeItem('user');
            setUser(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h1>LocalStorage Example</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
            ) : (
                <p>No user stored in localStorage.</p>
            )}
        </div>
    );
};

export default Storage;
