import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PokemonCard from './compoents/PokemonCard';
import MyModal from './compoents/MyModal';

const App = () => {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then((result) => result.json())
      .then((data) => {
        setTypes(allPokemonTypes(data.pokemon));
        setPokemons(data.pokemon);
      })
  }, []);

  function pokemonTypeFilter(data, type) {
    return data.filter((item) => item.type.includes(type));
  }

  function allPokemonTypes(data) {
    const types = new Set();
    data.forEach((pokemon) => {
      pokemon.type.forEach((type) => {
        types.add(type);
      });
    });
    return Array.from(types);
  }

  function handlePokemonCardPress(pokemon) {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  }

  

  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.flex}>
            <Text style={styles.title}>{item}:</Text>
            <FlatList
              data={pokemonTypeFilter(pokemons, item)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => handlePokemonCardPress(item)}>
                  <View>
                    <PokemonCard item={item} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              numColumns={3}
            />
          </View>
        )}
      />
      {showModal && <MyModal pokemon={selectedPokemon} setShowModal={setShowModal}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily:'HelveticaNeue',
    textDecorationLine:'underline'
  },
});

export default App;



