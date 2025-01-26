// SECTION: FUNCTION DEFINITIONS

// Function definition for 'getAverage' to calculate the average score from an array of scores.
// - Takes a single parameter 'scores', which is an array of numerical scores.
function getAverage(scores) {
    let sum = 0;
    // Initializes a variable 'sum' to store the cumulative total of all scores in the array.
    // - This variable will be updated as each score is processed in the loop.

    for (const score of scores) {
        // Begins a loop that iterates over each individual score in the 'scores' array.
        // - 'score' represents the current score being processed in the iteration.

        sum += score;
        // Adds the current score (represented by 'score') to the 'sum' variable.
        // - This line updates the total sum with the value of the current score during each iteration.
    }

    return sum / scores.length;
    // Divides the total 'sum' of all scores by the number of elements in the 'scores' array.
    // - Returns the calculated average to the caller of the function.
}

// Function definition for 'getGrade' to determine the grade corresponding to a given score.
// - Takes a single parameter 'score', which is a numerical value representing a student's score.
function getGrade(score) {
    if (score === 100) {
        // Checks if the given score is exactly 100.
        // - This condition is used to identify a perfect score.

        return "A++";
        // If the score is 100, returns the grade "A++", indicating a perfect score.
    } else if (score >= 90) {
        // Checks if the score is greater than or equal to 90 but less than 100.
        // - This condition is used to assign an "A" grade for high scores.

        return "A";
        // If the condition is true, returns the grade "A".
    } else if (score >= 80) {
        // Checks if the score is greater than or equal to 80 but less than 90.
        // - This condition is used to assign a "B" grade for above-average scores.

        return "B";
        // If the condition is true, returns the grade "B".
    } else if (score >= 70) {
        // Checks if the score is greater than or equal to 70 but less than 80.
        // - This condition is used to assign a "C" grade for average scores.

        return "C";
        // If the condition is true, returns the grade "C".
    } else if (score >= 60) {
        // Checks if the score is greater than or equal to 60 but less than 70.
        // - This condition is used to assign a "D" grade for below-average scores.

        return "D";
        // If the condition is true, returns the grade "D".
    } else {
        // Executes this block if none of the previous conditions are met, meaning the score is below 60.
        // - This condition is used to assign an "F" grade for failing scores.

        return "F";
        // Returns the grade "F" for scores below 60.
    }
}

// Function definition for 'hasPassingGrade' to check if a given score corresponds to a passing grade.
// - Takes a single parameter 'score', which is a numerical value representing a student's score.
function hasPassingGrade(score) {
    return getGrade(score) !== "F";
    // Calls the 'getGrade' function with the given score and checks if the returned grade is not "F".
    // - If the grade is not "F", the function returns true (indicating a passing grade).
    // - If the grade is "F", the function returns false (indicating a failing grade).
}

// Function definition for 'studentMsg' to generate a personalized message about the student's performance.
// - Takes two arguments: 'totalScores', an array of all student scores, and 'studentScore', the score of the specific student.
function studentMsg(totalScores, studentScore) {
    let classAverage = getAverage(totalScores);
    // Calls the 'getAverage' function with the 'totalScores' array to calculate the average score of the class.
    // - Stores the resulting average score in the variable 'classAverage'.

    let studentGrade = getGrade(studentScore);
    // Calls the 'getGrade' function with the student's score to determine their grade.
    // - Stores the resulting grade in the variable 'studentGrade'.

    let passGrade = hasPassingGrade(studentScore);
    // Calls the 'hasPassingGrade' function with the student's score to check if they passed.
    // - Stores the result (true or false) in the variable 'passGrade'.

    if (passGrade === true) {
        // Checks if 'passGrade' is true, meaning the student passed the course.
        // - Executes the following block if the student has a passing grade.

        return "Class average: " + classAverage + ". Your grade: " + studentGrade + ". You passed the course.";
        // If the student passed, constructs and returns a message containing:
        // 1. The class average score.
        // 2. The student's grade.
        // 3. A statement indicating that the student passed the course.
    } else {
        // Executes this block if 'passGrade' is false, meaning the student failed the course.
        // - Constructs and returns a message indicating the student's failure.

        return "Class average: " + classAverage + ". Your grade: " + studentGrade + ". You failed the course.";
        // Constructs and returns a message containing:
        // 1. The class average score.
        // 2. The student's grade.
        // 3. A statement indicating that the student failed the course.
    }
}

// SECTION: FUNCTION CALLS AND OUTPUT

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
// Calls the 'studentMsg' function with the class scores array and the specific student's score (37).
// - Logs the personalized message generated by the 'studentMsg' function to the console.