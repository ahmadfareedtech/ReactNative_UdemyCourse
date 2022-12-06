import { useState } from "react";
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {  
    
    const [goal, setGoal] = useState('')
    
    const goalInputHandler = (value) => {
        setGoal(value)
    }

    const addGoalHandler = () => {
        props.onAddGoal(goal)
        setGoal('')
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/goal.png')}/>
                <TextInput 
                    value={goal}
                    onChangeText={goalInputHandler} 
                    style={styles.textInput} 
                    placeholder="Your course goal!" />
                <View style={styles.btnContainer}>  
                    <View style={styles.btn}>
                        <Button color="#b180f0" onPress={addGoalHandler} title="Add Goal" />
                    </View>
                    <View style={styles.btn}>
                        <Button color="#f31282" title="Cancel" onPress={props.onCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
      },
      image: {
        width: 100,
        height: 100,
        margin: 20,
      },    
      textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        width: '100%',
        padding: 16,
        color: '#120438',
        backgroundColor: '#e4d0ff' 
      },
      btnContainer: {
        marginTop: 16,
        flexDirection: 'row'
      },
      btn: {
        width: 100,
        marginHorizontal: 8
      }
})