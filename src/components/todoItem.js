import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CheckBox, Icon } from "react-native-elements"
import firebase from "react-native-firebase"

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection("todos")
  }
  checkBoxHandler = () => {
    this.props.doc.ref.update({
      completed: !this.props.completed
    })
  }
  deleteTodo = () => {
    this.props.doc.ref.delete()
  }
  render() {
    return (
      <View style={styles.item}>
        <CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={this.checkBoxHandler}
          checked={this.props.completed}
        />
        <Text
          style={
            (styles.text,
            {
              textDecorationLine: this.props.completed ? "line-through" : "none"
            })
          }
        >
          {this.props.name}
        </Text>
        <TouchableOpacity style={styles.icon} onPress={this.deleteTodo}>
          <Icon name="trash" type="evilicon" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 25
  },
  icon: {
    paddingLeft: 25,
    paddingRight: 25
  }
})
