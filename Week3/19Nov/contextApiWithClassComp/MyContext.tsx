import React from 'react';

interface User {
    name: string;
    age: number;
}

interface MyContextType {
    user: User;
}

const MyContext = React.createContext<MyContextType | undefined>(undefined);

export default MyContext;
