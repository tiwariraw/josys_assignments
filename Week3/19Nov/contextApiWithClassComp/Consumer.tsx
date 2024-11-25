import React from 'react';
import MyContext from './MyContext';

class Consumer extends React.Component {
    static contextType = MyContext;

    render() {
        const context = this.context;

        const { user }: any = context;
        return <div>User Name: {user.name}</div>;
    }
}

export default Consumer;
