import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore'

interface Exercise {
    id: string;
    englishPhrase: string;
    germanPhrase: string;
    correctAnswer: string;
    userSelectedAnswer?: string; 
    isCorrect?: boolean; 
    answerOptions: string[]
  }
  

const MainView: React.FC = () => {

  // Mock exercise data (you will fetch this from Firebase in the actual app)
  // const mockExercise: Exercise = {
  //   id: '1',
  //   englishPhrase: 'The *house* is small.',
  //   germanPhrase: 'Das ______ ist klein.',
  //   correctAnswer: 'hause',
  //   answerOptions: ['hause', 'schaf', 'bereiden', 'folgen']
  // }

  const defaultExercise: Exercise = {
    id: '',
    englishPhrase: '',
    germanPhrase: '',
    correctAnswer: '',
    answerOptions: [],
  };
  const [exercise, setExercise] = useState<Exercise>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Function to handle user selection
  const handleSelectAnswer = (selectedAnswer: string) => {
    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === exercise?.correctAnswer

    // Update the exercise state to show the result
    setExercise((prevExercise) => ({
      ...prevExercise!,
      userSelectedAnswer: selectedAnswer,
      isCorrect,
    }))
    setShowFeedback(true);

  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'exercises'), (snapshot) => {
      const exercises = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Select a random exercise from the fetched data
      const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
      // console.log(randomExercise)
      setExercise(randomExercise); // Use defaultExercise as a fallback
      setShowFeedback(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);
  

  // Function to load a new exercise (you will fetch this from Firebase in the actual app)
  const loadNewExercise = () => {
    // Simulate loading a new exercise
    setExercise(null); // Set exercise to null
    setShowFeedback(false)
    setTimeout(() => {
      const unsubscribe = onSnapshot(collection(db, 'exercises'), (snapshot) => {
        const exercises = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Select a random exercise from the fetched data
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        // console.log(randomExercise)
        setExercise(randomExercise); // Use defaultExercise as a fallback
        setShowFeedback(false)
      });
    }, 1000); // Simulating a delay
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {exercise ? (
        <View>
          <Text>Fill in the missing word</Text>
          <Text>{exercise.englishPhrase}</Text>
          <Text>{exercise.germanPhrase}</Text>

          {/* Render answer buttons */}
          {exercise.answerOptions.map((answer) => (
            <TouchableOpacity
              key={answer}
              onPress={() => handleSelectAnswer(answer)}
              disabled={exercise.userSelectedAnswer !== undefined}
            >
              <View
                style={{
                  backgroundColor:
                    exercise.userSelectedAnswer === answer
                      ? exercise.isCorrect
                        ? 'cyan' // Turn cyan if correct
                        : 'red' // Turn red if incorrect
                      : 'white',
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                }}
              >
                <Text>{answer}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Render "CHECK ANSWER" or "CONTINUE" button */}
          <Button
            title={exercise.userSelectedAnswer !== undefined ? 'CHECK ANSWER' : 'CONTINUE'}
            onPress={loadNewExercise}
            color={exercise.isCorrect ? 'cyan' : 'red'}
          />

          {/* Display feedback for correct or incorrect answer */}
          {showFeedback && (exercise.isCorrect ? <Text>Great Job!</Text> : <Text>Answer: {exercise.correctAnswer}</Text>)}
        </View>
      ) : (
        <Text>Loading exercise...</Text>
      )}
    </View>
  )
}

export default MainView
