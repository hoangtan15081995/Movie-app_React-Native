import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MovieCard from '../Components/MovieCard';
import Colors from '../constants/Color';

function BookMarkScreen() {
  const { bookMarkMovies } = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {bookMark.length ? (
          <FlatList
            data={bookMark}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate('Movie', {movieId: item.id})}
              />
            )}
          />
        ) : (
          <View>
            <Text style={styles.textStyle}>Empty Movie List</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  textStyle: {
    fontSize: 20,
    color: "black"
  }
});

export default BookMarkScreen