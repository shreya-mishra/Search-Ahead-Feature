import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DATA from "./MockData/Data";

const App = () => {
  const [searchInput, setSearchInput] = useState("");

  const [suggestion, setSuggestion] = useState({ filtered: [], all: [] });

  useEffect(() => {
    setTimeout(() => {
      setSuggestion((prev) => ({
        all: [...DATA.products, ...DATA.places, ...DATA.names],
        filtered: [...DATA.products, ...DATA.places, ...DATA.names]
      }));
    }, 7000);
  }, []);

  const handleSearch = (text) => {
    console.log(text);
    setSearchInput(text);
    suggestion.all.length > 0 &&
      setSuggestion((prev) => ({
        ...prev,
        filtered: prev.all.filter((ele) =>
          ele.toLowerCase().startsWith(text.toLowerCase())
        )
      }));
  };

  return (
    <View style={styles.typeAheadView}>
      <TextInput
        style={styles.inputBox}
        onChangeText={(text) => handleSearch(text)}
        value={searchInput}
        placeholder="search something"
      />

      {suggestion.filtered.map((ele) => (
        <ul>{ele}</ul>
      ))}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  inputBox: {
    margin: 20,
    borderWidth: 2,
    padding: 10
  },
  typeAheadView: {}
});

// component didi mount - initial render hoti h like a constructor
// component did update - state change or update component
// component did unmount - cleanup function - jo viewport pe wo view ni dikh ra hota after going to next screen- memeory leak issue
// useEffect(() => {
//   console.log("gelo");
//   return () => console.log("hell");
// }, []);
