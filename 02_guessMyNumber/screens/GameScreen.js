import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, useWindowDimensions, View } from "react-native"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionsText from "../components/ui/InstructionsText";
import Title from "../components/ui/Title"
import { Ionicons } from '@expo/vector-icons' 
import GuessLogItem from "../components/game/GuessLogItem";

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
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const {width, height} = useWindowDimensions()

    useEffect(() => {
      if (currentGuess === userNumber) {
        onGameOver(guessRounds.length)
      }
    
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
    
        minBoundary = 1
        maxBoundary = 100
    
    }, [])
    
    

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
        setGuessRounds(prevState => [newRndNumber, ...prevState])
    }

    const guessRoundsListLength = guessRounds.length

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionsText style={styles.InstructionText}>Higher or lower?</InstructionsText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton  onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton  onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
                {content}
            <View style={styles.listContainer}>
                {/* guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>) */}
                <FlatList 
                data={guessRounds} 
                renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}/>} 
                keyExtractor={(item) => item} />
            </View>
        </View>
    )
}

export default GameScreen 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    }, 
    InstructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }, 
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})