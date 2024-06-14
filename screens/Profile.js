import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { getUserInfo } from "../components/ResHandler";
import { Footer } from "../components/Footer";
import ProfileLent from "../components/ProfileLent";
import Button from "../components/button";
import { updateAbout } from "../components/ResHandler";
import { Entypo } from "@expo/vector-icons";
import Photo from "./Photo";
const numColumns = 3;

const Profile = ({ navigation, route }) => {
  const user = route.params?.user;
  const [usInfo, setUsInfo] = useState(null);
  const [editAbout, setEditAbout] = useState(false);
  const [about, setAbout] = useState(null);
  const [nick, setNick] = useState(null);
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [subscribes, setSubscribes] = useState(null);
  const [takingPhoto, setTakingPhoto] = useState(false);
  async function getInfo() {
    const temp = await getUserInfo(user);
    console.log(temp);
    setUsInfo(temp);
    setNick(temp[0].nickname);
    setName(temp[0].name);
    setAbout(temp[0].about);
    setAvatar(temp[0].avatar_uri);
    setPosts(temp[0].posts);
    setSubscribers(temp[0].subscribers);
    setSubscribes(temp[0].subscribes);
  }

  useEffect(() => {
    getInfo();
  }, []);
  const changeEditing = () => {
    setEditAbout(!editAbout);
  };
  const changeTakingPhoto = () => {
    setTakingPhoto(!takingPhoto);
  };
  const changeAbout = () => {
    updateAbout(about, user);
    getInfo();
    changeEditing();
  };
  function updateAvatar(photo) {}
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
      {takingPhoto ? (
        <Photo />
      ) : (
        <View style={{ flex: 1, backgroundColor: "#eee" }}>
          <View style={styles.profile}>
            <View style={styles.head}>
              <View style={styles.bgFill}>
                <Image
                  style={styles.filler}
                  source={require("../assets/rec4.png")}
                />
                <Text style={styles.prName}>{nick ? nick : ""}</Text>
              </View>
              <View style={styles.desc}>
                <TouchableOpacity onPress={changeTakingPhoto}>
                  <Image style={styles.profPic} source={{ uri: avatar }} />
                </TouchableOpacity>
                <View style={styles.descText}>
                  <View>
                    <Text style={styles.usName}>{name ? name : ""}</Text>
                  </View>

                  {!editAbout ? (
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={changeEditing}
                    >
                      {usInfo ? (
                        <Text style={styles.newInfo}>
                          {about ? about : "Укажите информацию о себе"}
                        </Text>
                      ) : (
                        <Text style={styles.newInfo}>
                          "Укажите информацию о себе"
                        </Text>
                      )}
                      <View style={{ marginTop: -12, marginLeft: 6 }}>
                        <Button
                          icon="edit"
                          title={""}
                          color={"#FF440"}
                          size={12}
                          onPress={changeEditing}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.editAbout}>
                      <TextInput
                        style={styles.input}
                        multiline
                        blurOnSubmit
                        onChangeText={(text) => setAbout(text)}
                        defaultValue={
                          about ? about : "Укажите информацию о себе"
                        }
                      />
                      <View style={styles.submit}>
                        <Button
                          style={{
                            width: "40%",
                            alignItems: "center",
                            paddingBottom: 10,
                          }}
                          title={"Отмена"}
                          color={"#FF4401"}
                          onPress={changeEditing}
                        />
                        <Button
                          style={{
                            width: "40%",
                            alignItems: "center",
                            paddingBottom: 10,
                          }}
                          title={"Сохранить"}
                          color={"#59AD58"}
                          onPress={changeAbout}
                        />
                      </View>
                    </View>
                  )}
                  <View style={styles.pubButton}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Publish")}
                    >
                      <Text style={styles.Public}>Опубликовать</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.stNum}>{posts ? posts : 0}</Text>
              <Text style={styles.stText}>Публикации</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.stNum}>{subscribers ? subscribers : 0}</Text>
              <Text style={styles.stText}>Подписчики</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.stNum}>{subscribes ? subscribes : 0}</Text>
              <Text style={styles.stText}>Подписки</Text>
            </View>
          </View>
          <View style={styles.posts}>
            <ProfileLent user={nick} />
          </View>
        </View>
      )}
      <Footer
        navigation={navigation}
        avatar={avatar}
        current={[null, null, null, 1]}
      />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  editAbout: {
    width: "100%",
  },
  submit: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    width: Dimensions.get("window").width - 20,

    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    padding: 7,
  },
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "#eee",
  },
  profile: {
    width: "100%",
    backgroundColor: "black",
    flexDirection: "column",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  head: {
    backgroundColor: "white",
    borderRadius: 24,
  },
  bgFill: {
    height: 136,
  },
  filler: {
    width: 430,
    height: 136,
    backgroundColor: "black",
    resizeMode: "contain",
  },
  prName: {
    position: "absolute",
    fontSize: 28,
    color: "white",
    left: 20,
    top: 10,
  },
  profPic: {
    position: "absolute",
    top: -51,
    left: Dimensions.get("screen").width / 2 - 51,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 51,
    width: 96,
    height: 96,
    backgroundColor: "white",
  },
  stats: {
    width: "100%",
    minHeight: 50,
    maxHeight: 100,
    backgroundColor: "white",
    marginTop: 8,
    borderRadius: 24,
    flexDirection: "row",
  },
  descText: {
    flexDirection: "column",
    alignItems: "center",
  },
  usName: {
    fontSize: 24,
    marginTop: 40,
  },
  usStatus: {
    fontSize: 12,
    color: "#59AD58",
    borderWidth: 1,
    borderColor: "#59AD58",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  newInfo: {
    fontSize: 12,
    color: "#FF4401",
    textAlign: "center",
  },
  Public: {
    color: "#FF4401",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  pubButton: {
    width: Dimensions.get("screen").width - 24,
    height: 40,
    backgroundColor: "#F9E8E1",
    marginVertical: 8,
    borderRadius: 8,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  stNum: {
    fontSize: (20 * Dimensions.get("screen").height) / 900,
  },
  stText: {
    fontSize: (14 * Dimensions.get("screen").height) / 1000,
    color: "#777777",
  },
  posts: {
    paddingTop: 10,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "white",
    marginTop: 10,
    height: "100%",
  },
  tag: {
    textAlign: "center",
    fontSize: 16,
    color: "#FF4401",
    marginTop: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  footer: {
    height: 64,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  menu: {
    width: 24,
    height: 24,
    marginRight: 21,
    resizeMode: "contain",
  },
  post: {
    flex: 1,

    margin: 1,
  },
  postPicture: {
    width: "100%",
    height: Dimensions.get("window").width / numColumns,
  },
  editAv: {
    position: "absolute",
    top: 25,
    left: Dimensions.get("screen").width / 2 + 30,
  },
});
