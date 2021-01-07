import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import UserList from './Components/UserList'
import AddUserModal from './Components/AddUserModal'
import EditUserModal from './Components/EditUserModal'

const App = () => {
  const [users, setUsers] = useState([])
  const [sortedValue, setSortedValue] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const asyncStorageKey = 'users'
  const [isAddModalOpened, setIsAddModalOpened] = useState(false)
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const openAddUserModal = () => {
    setIsAddModalOpened(true)
  }

  const onUserPress = (user) => {
    setIsEditModalOpened(true)
    setSelectedUser(user)
  }

  const saveUser = (user) => {
    let key = Math.random().toString()
    user.key = key
    const newUsers = [user, ...users]
    setUsers(newUsers)
    setIsAddModalOpened(false)
    storeUsersInAsyncStorage(newUsers)
  }

  const updateUser = (user) => {
    const tempUsers = [...users]
    const newUsers = tempUsers.map((temp, index) => {
      if (temp.key !== user.key) return temp
      if (temp.key === user.key) return user
    })
    // console.log(newUsers, "new Users")
    setUsers(newUsers)
    setIsEditModalOpened(false)
    storeUsersInAsyncStorage(newUsers)
  }

  const storeUsersInAsyncStorage = async (newUsers) => {
    await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(newUsers))
  }

  useEffect(() => {
    const getUsersFromAsyncStorage = async () => {
      const users = JSON.parse(await AsyncStorage.getItem(asyncStorageKey))
      if (!users || typeof (users) !== 'object') return
      setUsers(users)
    }
    getUsersFromAsyncStorage()
  }, [])


  const sortUsers = (value) => {
    // console.log(value, "value")
    const tempUsers = [...users]
    if (value === 'name') {
      let sorted = tempUsers.sort((a, b) => {
        let nameA = a.first_name + a.last_name
        let nameB = b.first_name + b.last_name
        return nameA > nameB ? 1 : -1
      })
      setUsers(sorted)
    }
    if (value === 'country') {
      let sorted = tempUsers.sort((a, b) => {
        return a.country > b.country ? 1 : -1
      })
      setUsers(sorted)
    }
    if (value === 'city') {
      let sorted = tempUsers.sort((a, b) => {
        return a.city > b.city ? 1 : -1
      })
      setUsers(sorted)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>All Users</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={openAddUserModal}
        >
          <Text style={styles.btnText}>Add User</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sort}>
        <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 4, marginVertical: 10, }}>
          <Picker
            selectedValue={sortedValue}
            style={styles.input}
            onValueChange={sortUsers}>
            <Picker.Item label="Sort By" value="" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Country" value="country" />
            <Picker.Item label="City" value="city" />
          </Picker>
        </View>
      </View>
      <View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserList
              user={item}
              onItemPress={() => {
                onUserPress(item)
              }}
            />
          )}
          keyExtractor={(item) => `${item.key}`}
        />
      </View>

      {
        isAddModalOpened && (
          <AddUserModal modalVisible={isAddModalOpened} saveUser={saveUser} />
        )
      }

      {isEditModalOpened && (
        <EditUserModal selectedUser={selectedUser} updateUser={updateUser} modalVisible={isEditModalOpened} />
      )}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  top: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#3f3f33',
    borderRadius: 3,
    paddingBottom: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    borderColor: '#000',
    color: '#1a1a1a',
    borderRadius: 4,
    padding: 12,
    margin: 0,
    borderWidth: 1,
  },
})
