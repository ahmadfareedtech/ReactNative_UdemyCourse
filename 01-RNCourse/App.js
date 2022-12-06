import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {

  const [courseGoals, setCourseGoals] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const startAddGoalHandler = () => {
    setModalVisible(true)
  }

  const endAddGoalHandler = () => {
    setModalVisible(false)
  }

  const addGoalHandler = (goal) => {
    setCourseGoals(
      prevState => [...prevState, {text: goal, id: Math.random().toString()}]
      )
      endAddGoalHandler()
  }

  const deleteHandler = (id) => {
    setCourseGoals(prevstate => prevstate.filter(goal => goal.id !== id))
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button 
          title="Add New Goal" 
          color="#a065ec" 
          onPress={startAddGoalHandler} 
        />
        <GoalInput visible={modalVisible} onCancel={endAddGoalHandler} onAddGoal={addGoalHandler} />
        <View  style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            renderItem={itemData => {
              // const index = itemData.index
                return <GoalItem onDeleteItem={deleteHandler}  text={itemData.item.text} id={itemData.item.id} />
              }
            }
            keyExtractor={(item, index) => item.id} 
            alwaysBounceVertical={false} />
        </View>
      </View>
    </>
  );
}
// just for commit check
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, //so it takes full height 
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  }
});
