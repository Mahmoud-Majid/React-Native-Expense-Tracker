import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            // invert the array so the newest expenses are at the top, cuz firebase ordered them by date of creation not our date

            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            return state.map(expense => {
                if (expense.id === action.payload.id) {
                    return {
                        ...expense,
                        ...action.payload.data
                    }
                }
                return expense;
            });
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesProvider = ({ children }) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => {
        dispatch({
            type: 'ADD',
            payload: expenseData
        });
    }

    const setExpenses = (expenses) => {
        dispatch({
            type: 'SET',
            payload: expenses
        });
    }

    const updateExpense = (id, expenseData) => {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: id,
                data: expenseData
            }
        });
    }

    const deleteExpense = (id) => {
        dispatch({
            type: 'DELETE',
            payload: id
        });
    }

    const value = {
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesProvider;