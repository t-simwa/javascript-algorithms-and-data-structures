function getAverage(scores) { // Defines a function to calculate the average score from an array of scores.
    let sum = 0; // Initializes a variable 'sum' to hold the total of the scores.

    for (const score of scores) { // Loops through each score in the 'scores' array.
        sum += score; // Adds the current score to the 'sum' variable.
    }

    return sum / scores.length; // Returns the average by dividing the total sum by the number of scores.
}

function getGrade(score) { // Defines a function to return the grade based on the score.
    if (score === 100) { // Checks if the score is 100.
        return "A++"; // Returns "A++" for a perfect score.
    } else if (score >= 90) { // Checks if the score is 90 or above.
        return "A"; // Returns "A" for scores in the 90-99 range.
    } else if (score >= 80) { // Checks if the score is 80 or above.
        return "B"; // Returns "B" for scores in the 80-89 range.
    } else if (score >= 70) { // Checks if the score is 70 or above.
        return "C"; // Returns "C" for scores in the 70-79 range.
    } else if (score >= 60) { // Checks if the score is 60 or above.
        return "D"; // Returns "D" for scores in the 60-69 range.
    } else {
        return "F"; // Returns "F" for scores below 60.
    }
}

function hasPassingGrade(score) { // Defines a function to check if the score is passing.
    return getGrade(score) !== "F"; // Returns true if the grade is not "F".
}

function studentMsg(totalScores, studentScore) { // Defines a function to generate a message based on the student's performance.
    let classAverage = getAverage(totalScores); // Calculates the class average using 'getAverage'.
    let studentGrade = getGrade(studentScore); // Determines the student's grade using 'getGrade'.
    let passGrade = hasPassingGrade(studentScore); // Checks if the student has passed using 'hasPassingGrade'.

    if (passGrade === true) { // If the student passed,
        return "Class average: " + classAverage + ". Your grade: " + studentGrade + ". You passed the course."; // Returns a message indicating passing.
    } else { // If the student failed,
        return "Class average: " + classAverage + ". Your grade: " + studentGrade + ". You failed the course."; // Returns a message indicating failure.
    }
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37)); // Logs the generated message for the student with score 37.
