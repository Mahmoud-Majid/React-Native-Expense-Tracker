import { FlatList, StyleSheet, Text, View } from 'react-native'
import ExpenseItem from './ExpenseItem'

const renderExpense = ({ item }) => {
    return <ExpenseItem {...item} />
}
const ExpensesList = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

export default ExpensesList;

