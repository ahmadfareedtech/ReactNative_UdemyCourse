import axios from 'axios';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../store/auth-context';

function WelcomeScreen() {

  const [fetchMessage, setFetchMessage] = useState('')

  const authCtx = useAuth()
  const token = authCtx.token

  useEffect(() => {
    axios.get(`https://react-native-2023-default-rtdb.firebaseio.com/Message.json?auth=${token}`)
    .then((response) => {
      console.log(response.data)
      setFetchMessage(response.data)
    })
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});