import React, { useState} from "react";
import {
  StyleSheet,
  View, 
  Alert,
  Dimensions,
  TextInput,
  ScrollView
} from "react-native";

import Image from 'react-native-image-auto-height';
import Button from '../components/button';
import { StatusBar } from "expo-status-bar";
import { Footer } from "../components/Footer";
import Photo from '../screens/Photo'
import * as ImagePicker from 'expo-image-picker'
import * as handler from '../components/ResHandler'

export default function Publish({ navigation, route }) {
    var user = route.params?.user; //email of user

    const [rate,setRate] = useState(1);
    const [photo, setPhoto] = useState(null);
    const [description,setDescription] = useState("")
    const [restaurant,setRestaurant] = useState("")

    function updatePhoto(photo){
        setPhoto(photo)
        setFlag(false)
    }
    const [flag, setFlag]=useState(false);
    const publicate = async()=>{
        var img_url = ''
        if(!rate){
            Alert.alert("Оцените заведение")
            return("")
        }
        
        if(!description){
            Alert.alert("Опишите заведение")
            return("")
        } 
        
        if(!restaurant){
            Alert.alert("Укажите заведение")
            return("")
        }

        if(!photo) {
            Alert.alert("Добавьте фото")
            return("")
        }else img_url = await handler.uploadPhoto(photo)
        
        handler.publicate(user,rate,description,restaurant,img_url)
        setRate(1)
        setPhoto(null)
        setDescription("")
        setRestaurant("")
        Alert.alert("Пост опубликован")
    }

    const choosePhoto = async()=>{
        try{
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            })
            if(!result.canceled){
                setPhoto(result.assets[0].uri);
            }

                
        }catch(e){
            console.log(e);
        }
        
    }
    
    const updateRate = (value)=>{
        setRate(value)
    }
    const [isTyping, setisTyping] = useState('');
    return(
        <View style={styles.main}>
            <StatusBar style="auto" />
            {flag
            ?
            <Photo onTookPhoto={updatePhoto}/> 
            :            
            <View>
                <View style={[styles.photo,{display:`${isTyping}`}]}>
                
                    {photo
                    ? 
                    <View style={{flex: 1}}>

                        <ScrollView >
                            <Image source={{uri: photo}} style={styles.image}/> 
                        </ScrollView>

                        <View style={styles.button}>
                        <Button icon="retweet" 
                            onPress={()=>{setFlag(false); setPhoto(null)}}
                            style={styles.button}
                            />
                        </View>
                    </View>
                    : 
                    <View style={styles.choose}>
                        <Button  
                        title={"Выбрать из галереи"} 
                        icon="folder-images" 
                        color='#FF4401'
                        onPress={choosePhoto}
                        /> 
                        <Button  
                        title={"Сделать фото"} 
                        icon="camera" 
                        color='#FF4401'
                        onPress={()=>{setFlag(true)}}
                        /> 
                    </View>
                    }
                </View>
                <ScrollView style={{height: Dimensions.get('window').height,
                }}>
                <TextInput
                    style={styles.inputtext}
                    placeholder="Введите свой текст"
                    placeholderTextColor={'black'}
                    multiline
                    blurOnSubmit
                    onChangeText={(text) => setDescription(text)}
                    onFocus={()=>{
                        setisTyping('none')
                    }}
                    onBlur={()=>{
                        setisTyping('')
                    }}
                    
                />
                <View style={styles.rate}>
                <Button  
                    icon="star" 
                    color= {rate> 0? '#FF4401':'black'}
                    onPress={()=>{updateRate(1)}}
                /> 
                <Button  
                    icon="star" 
                    color= {rate> 1? '#FF4401':'black'}
                    onPress={()=>{updateRate(2)}}
                /> 
                <Button  
                    icon="star" 
                    color= {rate> 2? '#FF4401':'black'}
                    onPress={()=>{updateRate(3)}}
                /> 
                <Button  
                    icon="star" 
                    color= {rate> 3? '#FF4401':'black'}
                    onPress={()=>{updateRate(4)}}
                /> 
                <Button  
                    icon="star" 
                    color= {rate> 4? '#FF4401':'black'}
                    onPress={()=>{updateRate(5)}}
                /> 
                </View>
                <TextInput
                    style={styles.inputrestaurant}
                    placeholder="Введите название заведения"
                    placeholderTextColor={'black'}
                    value={restaurant}
                    blurOnSubmit
                    onChangeText={(text) => setRestaurant(text)}
                    onFocus={()=>{
                        setisTyping('none')
                    }}
                    onBlur={()=>{
                        setisTyping('')
                    }}
                    
                />
                <View style={styles.submit}>
                <Button  
                    icon="plus" 
                    title={'Опубликовать'}
                    color= {'black'}
                    value={restaurant}
                    onPress={()=>{publicate()}}
                /> 
                </View>
                </ScrollView>
            </View>}
            
            <Footer navigation = {navigation}current={[null,null,1,null]}/>
        </View>
        
    )
}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      flexDirection: "column",
      paddingBottom: 20,
      backgroundColor: "#fff",
    },
    photo:{
      height:Dimensions.get('window').width,
      width: Dimensions.get('window').width,
      backgroundColor: '#fafafa',
    },
    image:{
        width: Dimensions.get('window').width,
        height: 'auto'
    },
    button:{
      position:'absolute',
      bottom: 10,
    },
    inputtext:{
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height/2 - 300,
        borderRadius: 10,
        marginLeft: 10,
        marginTop:10,
        borderWidth:1,
        borderColor: '#a1a1a1',
        padding:7
    },
    inputrestaurant:{
        width: Dimensions.get('window').width - 20,
        
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        borderWidth:1,
        borderColor: '#a1a1a1',
        padding:7
    },
    choose:{
        marginTop: Dimensions.get('window').width/2-50,
        flexDirection:"column", 
        justifyContent:'space-between', 
        paddingHorizontal:50
    },
    rate:{
        marginTop: 5, 
        flexDirection:"row", 
        justifyContent:'space-between', 
        paddingHorizontal:50
    },
    submit:{
        borderWidth:1,
        width: Dimensions.get('window').width - 100,
        marginLeft:50,
        marginTop: 10,
        borderRadius: 30,
        borderColor: '#FF4401',
        backgroundColor:'#FF4401',
        color:'white'
    }
  });
  