import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {

  const [goal, setGoal] = useState('')
  const [courseGoals, setCourseGoals] = useState([])

  const goalInputHandler = (value) => {
    setGoal(value)
  }

  const addGoalHandler = () => {
    setCourseGoals(prevState => [...prevState, goal]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={goalInputHandler} style={styles.textInput} placeholder="Your course goal!" />
        <Button onPress={addGoalHandler} title="Add Goal" />
      </View>
      <View  style={styles.goalsContainer}>
        <ScrollView>
          {courseGoals.map((goal, i) => (
            <View key={i} style={styles.goalItem}>
              <Text style={styles.goalText}>
                {goal}
              </Text>
            </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
// just for commit check
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, //so it takes full height 
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 24,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  }, 
  goalText: {
    color: 'white'
  }
});
