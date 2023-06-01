import { View, Text,StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react';
import axios from 'axios'
 import Icon from 'react-native-vector-icons/AntDesign'
export default function App() {
  const [list,setList] =useState([])
  const [item,setItem] = useState('')
  const [done,setDone]=useState(false)
   useEffect(() => {
     fetchData();
   }, []);
   const fetchData = async () => {
     try {
       const response = await axios.get(
         'http://192.168.131.101:3000/api/items',
       );
       const data = response.data;
       setList(data)
     } catch (error) {
       console.error(error);
     }
   };
//for get data
   const saveData = async () =>{
    try{
      const task = await axios.post(
        'http://192.168.131.101:3000/api/items',
      {item});
      console.log(task.data)
    }
    catch(err){
      console.log(err)
    }
    clearInput();
   }
   const clearInput=()=>{
    setDone(true)
    setItem('')
     setTimeout(()=>{
      setDone(false)
     },1000)
   }
   //for delete data
   
//  to do work list
   
   const renderItem=({item,index})=>{
     const deleteData = async () => {
            try {
        const deleteTask = await axios.delete(
          'http://192.168.131.101:3000/api/items',
          {data: {item: item.item}},
        ); 
        console.log(deleteTask.data)
      }
      catch (err){
        console.log(err)
      }
     };
     const textColor = index % 2 === 0 ? style.evenText : style.oddText;
    return (
      <View style={style.list}>
        <Text style={[style.listText, textColor]}>
          -{'>'} {item.item}
        </Text>
        <View style={style.icon}>
          <TouchableOpacity onPress={deleteData}>
            <Icon
              style={{marginLeft: 10,padding:5}}
              name="delete"
              color="red"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );};

  return (
    <View style={style.container}>
      <View style={style.container2}>
        <View style={style.header}>
          <Image style={style.logo} source={require('./logo.png')} />
          <Text style={style.headerText}>To-Do</Text>
        </View>
        <View>
          <Text style={style.what}>What's up, joy!</Text>
          <Text style={style.task}>Today's Tasks</Text>
        </View>
        <View style={style.newTask}>
          <TextInput
            selectionColor={'black'}
            placeholder="Type here your new task..."
            placeholderTextColor={'grey'}
            style={style.input}
            onChangeText={setItem}
            value={item}
          />
          <TouchableOpacity onPress={saveData} style={style.add}>
            <Text style={style.add}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {done ? (
            <ActivityIndicator
              style={style.loader}
              size={40}
              color={'#4F86F7'}
            />
          ) : null}
        </View>
        <FlatList
          style={style.containerTask}
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'gray',
    elevation: 1,
    borderStartWidth: 2,
    borderEndWidth: 2,
  },
  headerText: {
    color: '#4F86F7',
    fontSize: 35,
    fontWeight: '600',
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  what: {
    color: '#283035',
    fontSize: 35,
    fontWeight: '600',
    marginTop: 5,
  },
  task: {
    color: '#4F86F7',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  containerTask: {
    marginTop: 20,
  },
  list: {
    padding: 15,
    borderColor:'grey',
    borderWidth:0.5,
    borderRadius:10,
    height: 'auto',
    flexDirection:'row',
    alignItems:'center',
    marginRight:15
  },
  icon:{
   flexDirection:'row',
  marginLeft:'auto'
  
   
  },
  listText: {
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
    marginRight:70
  },
  evenText: {
    color: 'green',
  },
  oddText: {
    color: '#4F86F7',
  },
  newTask: {
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
  },
  add: {
    color: 'green',
    fontSize: 40,
    marginLeft: 'auto',
    paddingRight: 10,

  },
  input: {
    color: 'black',
    fontSize: 15,
    marginRight:50
  },
  loader:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  }
});