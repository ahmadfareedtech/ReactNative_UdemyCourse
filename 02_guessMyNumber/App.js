import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)

  const pickNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setGameIsOver(false) // when we pick a number we must set game over to false 
  }
  
  const gameOverHandler = () => {
    setGameIsOver(true)
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />
  }


  return (
    <LinearGradient colors={[Colors.primary700 , Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground 
      source={require('./assets/background.png')} 
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
      >
          {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
