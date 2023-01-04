import { useLayoutEffect } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import IconButton from "../components/IconButton"
import List from "../components/MealDetail/List"
import Subtitle from "../components/MealDetail/Subtitle"
import MealDetails from "../components/MealDetails"
import { MEALS } from "../data/dummy-data"

const MealDetailScreen = ({route, navigation}) => {
    const mealId = route.params.mealId

    const selectedMeal = MEALS.find(meal => meal.id === mealId)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon='star' color='white'/>
            }
        })
    }, [navigation])
    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails 
                textStyle={styles.detailText}
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
            />
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>            
                <List data={selectedMeal.ingredients} />
                <Subtitle>Steps</Subtitle>            
                <List data={selectedMeal.steps} />
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%',
        alignSelf: 'center'
    }
})