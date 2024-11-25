import React, { useReducer, useState } from 'react';
import './BankApp.css';

const initialState = {
    balance: 0,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'deposit':
            return { ...state, balance: state.balance + action.payload };
        case 'withdraw':
            return {
                ...state,
                balance: state.balance >= action.payload
                    ? state.balance - action.payload
                    : state.balance,
            };
        default:
            return state;
    }
};

const BankApp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        // console.log(amount, "amount")
        const NumAmount = parseFloat(amount);
        // console.log(NumAmount, "NumAmount")
        if (NumAmount > 0) {
            dispatch({ type: 'deposit', payload: NumAmount });
        } else {
            alert('Enter a valid amount to deposit.');
        }
        setAmount('');
    };

    const handleWithdraw = () => {
        // console.log(amount, "amount")
        const NumAmount = parseFloat(amount);
        // console.log(NumAmount, "NumAmount")
        if (NumAmount > 0) {
            if (NumAmount <= state.balance) {
                dispatch({ type: 'withdraw', payload: NumAmount });
            } else {
                alert('Insufficient balance.');
            }
        } else {
            alert('Enter a valid amount to withdraw.');
        }
        setAmount('');
    };

    return (
        <div className="bank-app">
            <h1>UseReducer Example (BankAPP)</h1>
            <h2>Current Balance: ₹{state.balance.toFixed(2)}</h2>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
            />
            <div>
                <button onClick={handleDeposit} className="deposit-button">
                    Deposit
                </button>
                <button onClick={handleWithdraw} className="withdraw-button">
                    Withdraw
                </button>
            </div>
        </div>
    );
};

export default BankApp;
