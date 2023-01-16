import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

function ExpenseForm ({submitButtonLabel, onCancel, onSubmit, defaultValues}) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            
            setInputs(curInputs => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
           <View style={styles.inputRow}>
                <Input style={styles.rowInput} 
                    label="Amount"
                    invalid={!inputs.amount.isValid} 
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} 
                />
                <Input style={styles.rowInput} 
                    label="Date"
                    invalid={!inputs.date.isValid} 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }} 
                />
           </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid} 
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                    // autoCorrect: false, // default true
                    // autoCapitalize: 'none',
                }} 
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Input values - Please check your entered data!</Text>}
             <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})