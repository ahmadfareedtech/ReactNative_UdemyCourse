import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useExpenses } from "../store/expenses-context"

function AllExpenses() {
    const expensesCtx = useExpenses()
    return (
        <ExpensesOutput expensesPeriod='Total' expenses={expensesCtx.expenses} fallbackText='No expenses registered!'/>
    )
}

export default AllExpenses