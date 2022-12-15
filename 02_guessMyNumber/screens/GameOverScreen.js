import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import PrimaryButton from "../components/PrimaryButton"
import Title from "../components/ui/Title"
import Colors from "../constants/Colors"

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {
    const {width, height} = useWindowDimensions()

    let imageSize = 300

    if (width < 380) {
        imageSize = 150
    }

    if (height < 400) {
        imageSize = 80
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        margin: 25
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>Game Over</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')} />
                </View>
                <Text style={[styles.summaryText, {marginVertical: height < 400 ? 0 : 24}]}>
                    Ur phone needed 
                    <Text style={styles.highlight}> {roundsNumber} </Text>
                    rounds 2 guess the number
                    <Text style={styles.highlight}> {userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        // margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        // marginVertical: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500

    }
})