import { Platform, StyleSheet, Text } from "react-native"
import Colors from "../../constants/Colors"

const Title = ({children}) => {
    return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        // borderWidth: Platform.select({ios: 0, android: 2}),
        borderWidth: 0,
        borderColor: Colors.accent500,
        padding: 12,
        maxWidth: '80%'
    }
})