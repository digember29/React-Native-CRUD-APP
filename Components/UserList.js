import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const UserList = ({ user, onItemPress }) => {
  return (
    <TouchableOpacity style={styles.list} onPress={onItemPress}>
      <View style={styles.left}>
        <Text>{user.first_name} {user.last_name}</Text>
        <Text>{user.mobile}</Text>
      </View>
      <View style={styles.right}>
        <Text>{user.email}</Text>
        <Text>{user.dob}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default UserList

const styles = StyleSheet.create({
  list: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 8,
    shadowColor: '#00000029',
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowRadius: 3.84,
    alignItems: 'center'
  }
})
