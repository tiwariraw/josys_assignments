import React, { ReactNode } from 'react';
import MyContext from './MyContext';

interface User {
    name: string;
    age: number;
}

interface ProviderProps {
    children: ReactNode;
}

interface ProviderState {
    user: User;
}

class Provider extends React.Component<ProviderProps, ProviderState> {
    state: ProviderState = {
        user: { name: 'Abc Xyz', age: 30 },
    };

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default Provider;
