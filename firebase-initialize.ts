import { db } from './firebase-config'
import { collection, addDoc } from 'firebase/firestore'

//Define the exercise data
const exerciseData = [
    {
        englishPhrase: 'The house is small 1.',
        germanPhrase: 'Das ______ ist klein.',
        correctAnswer: 'hause',
        answerOptions: ['hause', 'schaf', 'bereiden', 'folgen']
      },
      {
        englishPhrase: 'The house is small 2',
        germanPhrase: 'Das ______ ist klein.',
        correctAnswer: 'hause',
        answerOptions: ['hause', 'schaf', 'bereiden', 'folgen']
      },
]

// Reference the Firestore collection
const exercisesCollection = collection(db, 'exercises')

// Add the exercise to Firestore
addDoc(exercisesCollection, exerciseData)
  .then((docRef) => {
    console.log(`Exercise added with ID: ${docRef.id}`)
  })
  .catch((error) => {
    console.error('Error adding exercise: ', error)
  })