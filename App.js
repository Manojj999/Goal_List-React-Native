import React, { useState } from "react";
import { StyleSheet, Text, View,Button, TextInput, FlatList } from "react-native";

import GoalItem from "./Components/GoalItem";
import GoalInput from "./Components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddmode,setIsAddmode] = useState(false)

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddmode(false);
  };


  const removeGoalHandler = (GoalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== GoalId);
    });
  };

  const cancelGoal = () => {
    setIsAddmode(false);
  }
  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={() => setIsAddmode(true)}/>
      <GoalInput visible={isAddmode} onAddGoal={addGoalHandler} onCancel={cancelGoal}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
