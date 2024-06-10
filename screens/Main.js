import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import Lent from "../components/Lent";
import Stories from "../components/Stories";
import { Footer } from "../components/Footer";

const Main = ({ navigation, route }) => {
  var storiess = route.params?.storie;
  var user = route.params?.user
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Image
            style={styles.colocol}
            source={require("../assets/header-icons/notif.png")}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.main}>
      <StatusBar style="auto" />

      <Stories storiess={storiess} />
      <Lent user = {user}/>


      <Footer navigation = {navigation} current={[1,null,null,null]}/>
    </View>
  );
}
export default Main
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginLeft: 20,
    fontSize: 28,
  },
  icon: {
    width: 30,
    height: 30,
  },
  colocol: {
    width: 24,
    height: 24,
    marginRight: 21,
    resizeMode: "contain",
  },
});
