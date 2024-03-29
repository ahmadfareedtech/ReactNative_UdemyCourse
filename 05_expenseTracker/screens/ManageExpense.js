import { useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import ErrorOverlay from "../components/UI/ErrorOverlay"
import IconButton from "../components/UI/IconButton"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import { GlobalStyles } from "../constants/styles"
import { useExpenses } from "../store/expenses-context"
import { storeExpense, updateExpense, deleteExpense } from "../util/http"

function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()
    const expensesCtx = useExpenses()
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId //converting to bool --- false is false and true is true 

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete data!')
            setIsSubmitting(false)
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            }
            else {
                const id = await storeExpense(expenseData)
                expensesCtx.addExpense({...expenseData, id: id})
            }

            navigation.goBack()
        } catch (error) {
            setError('Could not save data!')
            setIsSubmitting(false)
        }
    }

    function errorHandler() {
        setError(null)
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

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
                        onPress={deleteExpenseHandler} 
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