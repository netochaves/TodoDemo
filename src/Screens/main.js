import React, { Component } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import AddTodo from "../components/addTodo"
import firebase from "react-native-firebase"
import TodoItem from "../components/todoItem"

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection("todos")
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(querySnapshot => {
      const todos = []
      querySnapshot.forEach(doc => {
        const { name, completed } = doc.data()
        todos.push({
          doc,
          key: doc.id,
          name,
          completed
        })
      })
      this.setState({ todos: todos })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTodo />
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => (
            <TodoItem
              completed={item.completed}
              name={item.name}
              id={item.key}
              doc={item.doc}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E3E3"
  }
})
