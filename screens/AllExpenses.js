import { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context'
import { fetchExpense } from '../util/http';

const AllExpenses = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        const getExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await fetchExpense();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Failed to fetch expenses');
            }
            setIsFetching(false);
        }

        getExpenses();
    }, [])

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />;
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput
            expenses={expensesCtx.expenses}
            expensesPeriod='Total'
            fallbackText="No registered expenses found!"
        />
    )
}

export default AllExpenses