import React, { Component } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"
import firebase from "react-native-firebase"

export default class AddTodo extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection("todos")
    this.state = {
      text: ""
    }
  }
  addTodoHandler = () => {
    this.ref.add({
      name: this.state.text,
      completed: false
    })
    this.setState({ text: "" })
  }
  changeTextHandler = text => {
    this.setState({ text: text })
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder="Cadastre a tarefa:"
            onChangeText={text => this.changeTextHandler(text)}
            value={this.state.text}
          />
        </View>
        <TouchableOpacity style={styles.icon} onPress={this.addTodoHandler}>
          <Icon name="pluscircle" type="antdesign" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    margin: 5,
    borderColor: "#BCC4C5",
    borderWidth: 1,
    borderRadius: 50
  },
  icon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    top: 12,
    right: 15
  }
})
