"use strict";

// In this exercise, you will develop a function named decode(message_file). This function should read an encoded message from a .txt file and return its decoded version as a string.

// Note that you can write your code using any language and IDE you want (Python is preferred if possible, but not mandatory).

// Your function must be able to process an input file with the following format:

// 3 love
// 6 computers
// 2 dogs
// 4 cats
// 1 I
// 5 you
// In this file, each line contains a number followed by a word. The task is to decode a hidden message based on the arrangement of these numbers into a "pyramid" structure. The numbers are placed into the pyramid in ascending order, with each line of the pyramid having one more number than the line above it. The smallest number is 1, and the numbers increase consecutively, like so:

//   1
//  2 3
// 4 5 6
// The key to decoding the message is to use the words corresponding to the numbers at the end of each pyramid line (in this example, 1, 3, and 6). You should ignore all the other words. So for the example input file above, the message words are:

// 1: I
// 3: love
// 6: computers
// and your function should return the string "I love computers".

d const sortData = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j][0] > arr[j + 1][0]) {
        // If the condition is true then swap them
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr.map((el) => el[1]);
};

const decode = function (messageFile) {
  let decodedArr = [];
  //Removes escapes chracters and blank spaces from the string and make new array with nested array of
  //number and their related word.
  let dataArr = messageFile
    .split(/\r\n/)
    .filter((el) => el != "")
    .map((el) => {
      const arr = el.split(" ");
      return [+arr[0], arr[1]];
    });
  //Sort the data in ascending order and remove the integers.
  dataArr = sortData(dataArr);

  for (let i = 0; i < dataArr.length; i++) {
    //Break from the loop if element on i position is not available.
    if (!dataArr[i]) break;

    //Push the current i element in the decodedStrArr
    decodedArr.push(dataArr[i]);

    //Slice removes elements until i+1 position(position starts from 1)from the dataArr and again stores it in the dataArr.
    dataArr = dataArr.slice(i + 1);
  }

  // joins athe array into single string using blank space.
  let decodedString = decodedArr.join(" ");

  //return the decodedString.
  return decodedString;
};

const upload = document.querySelector("#upload"); //Selects the input element with id=upload from DOM
const output = document.querySelector("#output"); //Select the paragrapgh element from the DOM to display output.
const fileReader = new FileReader(); //Create a fileReader object using JavaScript FileReader API.

// Listen to change the change event on upload element and pass the uploaded file to fileReader object, which also pass it to
// the readAsText function to read the file as a text file.
upload.addEventListener("change", () => {
  fileReader.readAsText(upload.files[0]);
});

//Listen to the load even on fileReader to detect file loading, then call the decode function and pass the  file content
//as string argument. The return value from decode function is displayed as string on the webpage.
fileReader.addEventListener("load", () => {
  output.insertAdjacentText("afterbegin", decode(fileReader.result));
});
