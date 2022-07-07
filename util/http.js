import axios from 'axios';

const BACKEND_URL = 'https://expense-tracker-rn-6ea1e-default-rtdb.firebaseio.com/';

export const storeExpense = async (expense) => {
    const res = await axios.post(`${BACKEND_URL}/expenses.json`, expense);
    const id = res.data.name;
    return id;
}

export const fetchExpense = async () => {
    const res = await axios.get(`${BACKEND_URL}/expenses.json`);

    const expenses = [];
    for (const key in res.data) {
        expenses.push({
            id: key,
            amount: res.data[key].amount,
            date: new Date(res.data[key].date),
            description: res.data[key].description,
        });
    }

    return expenses;
}

export const updateExpense = (id, expenseData) => {
    return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}


export const deleteExpense = (id) => {
    return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
