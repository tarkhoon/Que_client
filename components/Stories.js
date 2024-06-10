import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";


export default function Stories(storiess) {
  const [stories, setStories] = useState(
    Object.values(storiess)[0]
  );
  const ListItem = ({item})=>{
    return(
      <View style={styles.storie}>
              <Image
                style={styles.stPic}
                source={{ uri: item.img }}
              />
              <Text style={styles.stText}>{item.name}</Text>
      </View>
    )
  }
  return (
    <View style={styles.Stories}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentcontainerstyle={{
          flexdirection: "row",
          flexwrap: "wrap",
        }}
      >
        <FlatList
          contentContainerStyle={{ flexDirection: "row" }}
          data={stories}
          renderItem={({ item }) => (
            <ListItem item={item}/>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Stories: {
    marginTop:15,
    width: "100%",
    height: 114,
  },
  storie: {
    width: 93,
    height: 114,
  },
  stPic: {
    width: 87,
    height: 87,
    borderRadius: 43.5,
  },
  stText: {
    textAlign: "center",
    fontSize: 14,
  },
});
