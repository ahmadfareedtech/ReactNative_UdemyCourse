import { useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import Button from "../components/UI/Button"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { useExpenses } from "../store/expenses-context"

function ManageExpense({route, navigation}) {
    const expensesCtx = useExpenses()
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId //converting to bool --- false is false and true is true 

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

    function confirmHandler() {
        if(isEditing) expensesCtx.updateExpense(editedExpenseId, {description: 'Test', amount: 29.99, date: new Date('2023-01-10')});
        else expensesCtx.addExpense({description: 'Test', amount: 29.99, date: new Date('2023-01-10')})
        navigation.goBack();}

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})