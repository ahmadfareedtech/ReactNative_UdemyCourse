import { useNavigation } from "@react-navigation/native"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import MealDetails from "../MealDetails"

const MealItem = ({id, title, imageUrl, duration, complexity, affordability}) => {

    const navigation = useNavigation()

    const selectMealItemHandler = () => {
        navigation.navigate('MealDetail', {
            mealId: id
        })
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{color: '#ccc'}}
                style={({pressed}) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealItemHandler}
            >
                <View style={styles.image}>
                    <Image style={styles.image} source={{uri: imageUrl}} />
                </View>
                <Text style={styles.title}>{title}</Text>
                <MealDetails
                    duration={duration}
                    complexity={complexity}
                    affordability={affordability}
                />
            </Pressable>
        </View>
    )
}

export default MealItem

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
    buttonPressed: {
        opacity: 0.5
    }
})