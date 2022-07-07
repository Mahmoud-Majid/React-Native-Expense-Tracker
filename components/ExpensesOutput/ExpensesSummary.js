import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {

    const totalExpenses = expenses.reduce((total, expense) => {
        return total + expense?.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.total}>${totalExpenses.toFixed(2)}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400
    },
    total: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500
    }
});