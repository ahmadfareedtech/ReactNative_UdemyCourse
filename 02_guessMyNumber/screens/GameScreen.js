import { StyleSheet, Text, View } from "react-native"

const GameScreen = () => {
    return <View style={styles.screen}>
        <Text>Opponents's Guess</Text>
        <View>
            <Text>Higher or lower?</Text>
        </View>
        <View>
            <View></View>
        </View> 
    </View>
}

export default GameScreen 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12
    }
})