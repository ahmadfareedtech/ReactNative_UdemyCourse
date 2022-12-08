import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/ui/Title"

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({userNumber, onGameOver}) => {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
      if (currentGuess === userNumber) {
        onGameOver()
      }
    
    }, [currentGuess, userNumber, onGameOver])
    

    const nextGuessHandler = (direction) => { // direction  => lower or greater
        
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert(
                "Don't Lie",
                "You know this is wrong!", 
                [{text: 'Sorry!', styles: 'cancel'}]
             )
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess - 1
        } else {
            minBoundary = currentGuess + 1
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower?</Text>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                    <PrimaryButton  onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default GameScreen 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    }
})