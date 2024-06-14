import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { getUsers } from "./ResHandler";
import { getRestaurants } from "./ResHandler";
import { getDishes } from "./ResHandler";

export default function Search({ param, text }) {
  const [searchResult, setSearchResult] = useState([]);
  const [users, setUsers] = useState();
  const [rests, setRests] = useState();
  const [dishes, setDishes] = useState();
  useEffect(() => {
    if (param == 1) {
      getUserData(text);
      getRestData(text);
      getDishData(text);
    } else if (param == 2) {
      getUserData(text);
    } else if (param == 3) {
      getRestData(text);
    } else if (param == 4) {
      getDishData(text);
    }
  }, [text]);
  async function getUserData(text) {
    const temp = await getUsers(text);
    if (temp == 400) {
      setUsers(null);
    } else {
      setUsers(temp);
    }
  }
  async function getRestData(text) {
    var temp = await getRestaurants(text);
    if (temp == 400) {
      setRests(null);
    } else {
      setRests(temp);
    }
  }
  async function getDishData(text) {
    var temp = await getDishes(text);
    if (temp == 400) {
      setDishes(null);
    } else {
      setDishes(temp);
    }
  }
  useEffect(() => {}, [users, rests, dishes]);

  const ListUsers = ({ item }) => {
    //ВСЕ_______________________________________________________________________________________
    return (
      <View style={styles.users}>
        <Image style={styles.pic} source={{ uri: item.avatar_uri }} />
        <View style={styles.usData}>
          <Text style={{ fontWeight: "bold" }}>{item.nickname}</Text>
          <Text>Подписчиков: {item.subscribers}</Text>
        </View>
      </View>
    );
  };
  const ListRestaurants = ({ item }) => {
    return (
      <View style={styles.rests}>
        <Image style={styles.pic} source={{ uri: item.avatar_uri }} />
        <Text>{item.nickname}</Text>
      </View>
    );
  };
  const ListDishes = ({ item }) => {
    return (
      <View style={styles.dishes}>
        <Image style={styles.pic} source={{ uri: item.img_uri }} />
        <Text>{item.name}</Text>
      </View>
    );
  };
  const keyExtractor = (item) => item?.id;
  if (param == 1) {
    return (
      <View style={styles.lent}>
        <View style={styles.block}>
          <Text style={styles.title}>ЛЮДИ</Text>
          {users ? (
            <FlatList
              data={users}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListUsers item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>

        <View style={styles.block}>
          <Text style={styles.title}>РЕСТОРАНЫ</Text>
          {rests ? (
            <FlatList
              data={rests}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListRestaurants item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>

        <View style={styles.block}>
          <Text style={styles.title}>БЛЮДА</Text>
          {dishes ? (
            <FlatList
              data={dishes}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListDishes item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>
      </View>
    );
  } else if (param == 2) {
    return (
      <View style={styles.lent}>
        <View style={styles.block}>
          <Text style={styles.title}>ЛЮДИ</Text>
          {users ? (
            <FlatList
              data={users}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListUsers item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>
      </View>
    );
  } else if (param == 3) {
    return (
      <View style={styles.lent}>
        <View style={styles.block}>
          <Text style={styles.title}>РЕСТОРАНЫ</Text>
          {rests ? (
            <FlatList
              data={rests}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListRestaurants item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>
      </View>
    );
  } else if (param == 4) {
    return (
      <View style={styles.lent}>
        <View style={styles.block}>
          <Text style={styles.title}>БЛЮДА</Text>
          {dishes ? (
            <FlatList
              data={dishes}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => <ListDishes item={item} />}
              initialNumToRender={5}
            />
          ) : (
            <Text style={styles.title}>Нет результатов</Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lent: { backgroundColor: "#eee", width: "100%", height: "100%" },
  users: {
    flexDirection: "row",
    marginLeft: 10,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rest: {},
  usData: {
    marginLeft: 15,
    flexDirection: "column",
    paddingVertical: 6,
  },
  title: {
    width: "100%",
    color: "#777777",
    margin: 10,
    fontSize: 14,
  },
  block: {
    width: "100%",

    marginVertical: 10,
    backgroundColor: "white",
  },
});
