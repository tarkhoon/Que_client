import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
} from "react-native";
import RecLent from "../components/RecLent";
import { Footer } from "../components/Footer";
import LookUp from "../components/LookUp";
import Button from "../components/button";
import { getUserInfo } from "../components/ResHandler";
const numColumns = 3;

export default function Rec({ navigation, route }) {
  var user = route.params?.user;
  const [type, setType] = useState(1);
  const [search, setSearch] = useState("");
  const [looking, setLooking] = useState(false);
  const [avatar, setAvatar] = useState();
  async function getAvatar() {
    var temp = await getUserInfo(user);
    setAvatar(temp[0].avatar_uri);
  }
  const changeType = (_type) => {
    setType(_type);
  };
  const find = (text) => {
    setSearch(text);
  };
  const Looking = () => {
    setType(1);
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <View style={styles.lookHeader}>
            <TextInput
              style={styles.input}
              placeholder="Поиск"
              onChangeText={(text) => find(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => notLooking()}
            >
              <Text style={styles.cancelText}>Отменить</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
      title: "",
      headerRight: () => {},
    });
    setLooking(true);
  };
  const notLooking = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Button
            icon="magnifying-glass"
            title={""}
            color="black"
            size={30}
            onPress={() => Looking()}
          />
        </TouchableOpacity>
      ),
      title: "Рекомендации",
      headerLeft: () => {},
      headerStyle: {},
    });
    setSearch("");
    setLooking(false);
  };
  React.useLayoutEffect(() => {
    getAvatar();
    if (looking) Looking();
    else notLooking();
  }, [navigation]);
  return (
    <View style={styles.main}>
      {looking ? (
        <View>
          <View style={styles.chooseLooking}>
            <TouchableOpacity onPress={() => changeType(1)}>
              <Text
                style={[
                  styles.cancelText,
                  { color: `${type == 1 ? "#FF4401" : "black"}` },
                ]}
              >
                Все
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeType(2)}>
              <Text
                style={[
                  styles.cancelText,
                  { color: `${type == 2 ? "#FF4401" : "black"}` },
                ]}
              >
                Люди
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeType(3)}>
              <Text
                style={[
                  styles.cancelText,
                  { color: `${type == 3 ? "#FF4401" : "black"}` },
                ]}
              >
                Заведения
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeType(4)}>
              <Text
                style={[
                  styles.cancelText,
                  { color: `${type == 4 ? "#FF4401" : "black"}` },
                ]}
              >
                Блюда
              </Text>
            </TouchableOpacity>
          </View>
          <LookUp param={type} text={search} />
        </View>
      ) : (
        <View></View>
      )}

      {looking ? <View></View> : <RecLent user={user} />}
      <Footer
        navigation={navigation}
        avatar={avatar}
        current={[null, 2, null, null]}
      />
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
  input: {
    width: (Dimensions.get("window").width * 70) / 100,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#eee",
    padding: 7,
    height: 40,
    fontSize: 16,
    paddingLeft: 14,
  },
  lookHeader: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  cancel: {
    alignContent: "center",
    height: 40,
    width: (Dimensions.get("window").width * 30) / 100,
    paddingTop: 20,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FF4401",
  },
  chooseLooking: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
