import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image, 
  Dimensions,
} from "react-native";


import Button from '../components/button';


import {Camera} from "expo-camera/legacy";
import * as MediaLibrary from "expo-media-library";

export default function  Photo ({onTookPhoto}) {
    const windowWidth = Dimensions.get('window').width;
 
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
   

    useEffect( () => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const handlePhoto = (image)=>{
        onTookPhoto(image)
    }

    
    const takePicture = async()=>{
        if(cameraRef){
            try{
                const data = await cameraRef.current.takePictureAsync();
                
                setImage(data.uri);
                
            }catch(e){
                console.log(e);
            }
        }
    }
    const usePicture = async () =>{
        if(image){
            try{

                //await MediaLibrary.createAssetAsync(image);
                //console.log("res --- >"+ await uploadPhoto(image))
                handlePhoto(image)
                setImage(null);
            }catch(e){
                console.log(e);
            }
        }
    }

    if(hasCameraPermission === false){
        return <Text>Нет доступа к камере</Text>
    }

  return (
    <View style={styles.main}>
        <View style= {styles.cameraContainer}>
            {!image ?
            <Camera 
            style={styles.camera} 
            type={type}
            flashMode={flash}
            ref={cameraRef}
            >
                <View style={{
                    position: 'absolute',
                    left:0,
                    top: 20,
                    marginLeft: 10,
                    flexDirection:'column',
                    justifyContent:'space-between',
                    
                }}>
                    <Button icon={"retweet"} onPress={()=>{
                        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                    }} />
                    <Button icon={"flash"} 
                    color={flash === Camera.Constants.FlashMode.off ? '#f1f1f1' : 'yellow'}
                    onPress={()=>{
                        setFlash(flash === Camera.Constants.FlashMode.off 
                            ? Camera.Constants.FlashMode.on 
                            : Camera.Constants.FlashMode.off)
                    }} />
                </View>
            </Camera>
            :
            <Image source={{uri: image}} style={styles.camera}/>
            }

            <View style = {[{width: windowWidth}, styles.button]}>
                {image?
                <View style={{
                    flexDirection:"row", 
                    justifyContent:'space-between', 
                    paddingHorizontal:50
                }}>

                    <Button title={"Переснять"} icon="retweet" onPress={()=> setImage(null)}/>
                    <Button title={"Использовать"} icon="check" onPress={usePicture }/>
                </View>
                :
                <Button  icon="camera" onPress={takePicture}/>
                }
            </View>
            
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  title: {
    marginLeft: 20,
    fontSize: 28,
  },
  cameraContainer:{
    flex: 1,
    backgroundColor:'#000',

  },
  camera:{
    flex: 1,
  },
  button:{
    position:'absolute',
    bottom: 10,
  }
});
