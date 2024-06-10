import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import RecLent from "../components/RecLent";
import { Footer } from "../components/Footer";
const numColumns = 3;

export default function Rec({ navigation, route }) {
  var user = route.params?.user

  const [posts, setPosts] = useState(
  );
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Image
            style={styles.menu}
            source={require("../assets/header-icons/menu.png")}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.main}>
      <RecLent user={user}/>
      <Footer navigation={navigation} current={[null,2,null,null]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  lent: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "#DBDBDB",
    flexDirection: "row",
    flexwrap: "wrap",
  },
  post: {
    flex: 1,
    backgroundColor: "white",
    margin: 1,
  },
  postPicture: {
    width: "100%",
    height: Dimensions.get("window").width / numColumns,
  },
  menu: {
    width: 24,
    height: 24,
    marginRight: 21,
    resizeMode: "contain",
  },
});
