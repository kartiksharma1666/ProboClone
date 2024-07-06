import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const QuestionPage = () => {
  const [question, setQuestion] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Page</Text>
      <Text style={styles.label}>Enter your question:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question here"
        value={question}
        onChangeText={setQuestion}
      />
      <Button
        title="Submit Question"
        onPress={() => console.log('Question submitted:', question)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default QuestionPage;
