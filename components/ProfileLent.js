import React, { useEffect, useState, memo, useCallback } from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";

import Image from "react-native-image-auto-height";
import { getUserPosts } from "./ResHandler";
import { getLikes } from "./ResHandler";

const ProfileLent = ({ user }) => {
  const [refreshing, setRefreshing] = useState(false);
  let [posts, setPosts] = useState(null);
  let [likes, setLikes] = useState([]);
  function getData() {
    const data = getUserPosts(user);
    console.log(data);
    data.then((res) => {
      setPosts(res.data);
    });
  }
  async function Likes() {
    var data = await getLikes(user);
    var temp = [];
    if (data)
      data.forEach((element) => {
        temp.push(element.postId);
      });
    setLikes(temp);
  }
  useEffect(() => {
    getData();
    Likes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      Likes();
      console.log("do");
      setRefreshing(false);
    }, 2000);
  }, []);

  if (posts) {
    const ListItem = ({ item }) => {
      return (
        <View style={styles.item}>
          <Image style={styles.postPicture} source={{ uri: item.img_uri }} />
        </View>
      );
    };

    return (
      <View style={styles.lent}>
        <FlatList
          style={{ width: Dimensions.get("screen").width }}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={posts}
          renderItem={({ item }) => <ListItem item={item} />}
          initialNumToRender={6}
        />
      </View>
    );
  } else return <View></View>;
};
export default memo(ProfileLent);
const styles = StyleSheet.create({
  lent: {
    width: "100%",
    marginTop: 8,
    marginBottom: 60,
    paddingHorizontal: 1,
    minHeight: 300,
  },
  postPicture: {
    height: Dimensions.get("screen").width / 3 - 10,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  item: {
    width: Dimensions.get("screen").width / 3 - 1,
  },
});
