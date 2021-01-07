import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const EditUserModal = ({ selectedUser, updateUser, modalVisible }) => {
  const [date, setDate] = useState(new Date())
  const [dateChanged, setDateChanged] = useState(false)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(selectedUser)

  const formatDate = (date) => {
    if (date) {
      const updatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      return updatedDate
    }
    else return
  }

  const onChangeDob = (event, selectedDate) => {
    console.log(selectedDate, "selectedDate")
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate)
      const currentDate = formattedDate || date;
      setDateChanged(true)
      setDate(selectedDate);
      // console.log(currentDate, "current Date")
      setUser((user) => ({
        ...user,
        dob: currentDate
      }))
    }
  };

  const onChangeHandler = (value, name) => {
    setUser((user) => ({
      ...user,
      [name]: value
    }))
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ padding: 20 }}>
              <Text style={styles.title}>ADD USER</Text>
              <View style={styles.form}>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="First Name"
                    value={user.first_name}
                    onChangeText={(value) => onChangeHandler(value, 'first_name')}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="Last Name"
                    value={user.last_name}
                    onChangeText={(value) => onChangeHandler(value, 'last_name')}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="Email"
                    value={user.email}
                    onChangeText={(value) => onChangeHandler(value, 'email')}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="Mobile"
                    value={user.mobile}
                    onChangeText={(value) => onChangeHandler(value, 'mobile')}
                    style={styles.input}
                    keyboardType="number-pad"
                  />

                </View>
                <View style={styles.formItem}>
                  <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
                    <Text>{dateChanged ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : 'DD-MM-YYYY'}</Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDob}
                    />
                  )}
                </View>
                <View style={{ ...styles.formItem, borderColor: 'black', borderWidth: 1, borderRadius: 4 }}>
                  <Picker
                    selectedValue={user.country}
                    style={styles.input}
                    onValueChange={(value) => {
                      setUser((user) => ({
                        ...user,
                        country: value
                      }))
                    }}>
                    <Picker.Item label="Select Country" value="" />
                    <Picker.Item label="India" value="in" />
                    <Picker.Item label="USA" value="us" />
                    <Picker.Item label="Afganistan" value="af" />
                    <Picker.Item label="Turkey" value="tr" />
                  </Picker>
                </View>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="State"
                    value={user.state}
                    onChangeText={(value) => onChangeHandler(value, 'state')}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formItem}>
                  <TextInput
                    placeholder="City"
                    value={user.city}
                    onChangeText={(value) => onChangeHandler(value, 'city')}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formItem}>
                  <TouchableOpacity style={styles.btn} onPress={() => updateUser(user)}>
                    <Text style={styles.btnText}>UPDATE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default EditUserModal

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#1A1A1ADE',
  },
  modalView: {
    top: '7%',
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingBottom: '20%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formItem: {
    marginVertical: 10
  },
  input: {
    borderColor: '#000',
    color: '#1a1a1a',
    borderRadius: 4,
    padding: 12,
    margin: 0,
    borderWidth: 1,
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
    color: '#fff'
  }
})
