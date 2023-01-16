import { useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import Button from "../components/UI/Button"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { useExpenses } from "../store/expenses-context"

function ManageExpense({route, navigation}) {
    const expensesCtx = useExpenses()
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId //converting to bool --- false is false and true is true 

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function deleteExpense() {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if(isEditing) expensesCtx.updateExpense(editedExpenseId, expenseData);
        else expensesCtx.addExpense(expenseData)
        navigation.goBack();}

    return (
        <View style={styles.container}>
            <ExpenseForm 
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'} 
                onCancel={cancelHandler} 
                defaultValues={selectedExpense}
            />
           
            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash"  
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpense} 
                    />
                </View>
            }
        </View>
    )
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})