import { Image, Pressable, StyleSheet, Text, View } from "react-native"

const MealItem = ({title, imageUrl, duration, complexity, affordability}) => {
    return (
        <>
        <View styles={styles.mealItem}>
            <Pressable>
            <View style={styles.image}>
                <Image source={{uri: imageUrl}} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}</Text>
            <Text style={styles.detailItem}>{complexity}</Text>
            <Text style={styles.detailItem}>{affordability}</Text>
            </View>
            </Pressable>
        </View>
        </>
    )
}

export default MealItem

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12
    }
})