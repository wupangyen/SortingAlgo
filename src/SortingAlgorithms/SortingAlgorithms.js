// https://www.youtube.com/watch?v=TzeBrDU-JaY
// export const mergeSort = array => {
//     // === is equal to == in java 
//     //base case if the array length is 1 we return array, we don't need to perform merge sort.
    
//     if(array.length === 1) return array;
//     //get mid point
//     const middleIdx = Math.floor(array.length /2);
//     //get first half
//     // index 0 to mid point
//     // recursive call left half
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     //get second half
//     // index mid point to end of array;

//     // recursive call right half
//     const secondHalf = mergeSort(array.slice(middleIdx))
//     // created a sorted array to store the output
//     const sortedArray = []

//     let i = 0;
//     let j = 0;
//     // loop through first half and second half
//     while(i < firstHalf.length && j < secondHalf.length){
//         if(firstHalf[i] < secondHalf[j]){
//             sortedArray.push(firstHalf[i++]);
//         }
//         // this is the case when secondHalf < firstHalf
//         else{
//             sortedArray.push(secondHalf[j++])
//         }
//     }

//     // the case when first Half reached length when comparing, we need to check the elements that is still in
//     // second half

//     while(i < firstHalf.length) {
//         sortedArray.push(firstHalf[i++]);
//     }
//     while(j < secondHalf.length) {
//         sortedArray.push(secondHalf[j++]);
//     }
//     return sortedArray;


// };



export function mergeSort(array) {
    const animations = [];
    //edge case
    if (array.length <= 1) return array;
    // auxiliary array is a copy of the original array
    //The slice() method returns a shallow copy of a portion of an 
    //array into a new array object selected from start to end (end not included)
    const auxiliaryArray = array.slice();
    // call merge sort helper
    // takes in 5 parameter 
    /*
    1. main Array
    2.start index
    3. end index
    4. auxiliary array
    5. animation
    */
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
){
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    //first half
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    //second half
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}   

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
){  
    // k is start index 
    let k = startIdx;
    // start index 
    let i = startIdx;
    // mid index
    let j = middleIdx + 1;

    // while both first half and second half didn't reach the end
    while (i <= middleIdx && j <= endIdx) {
        // store the start and end of the val that need to be swap
        // {} is declaring and object in javascript , is an object-key-value pairs
        // [] is array 

        // const animation = {};
        
        /* 
        !!!These are the values that we're comparing; 
        we push them once to change their color.
        */
        animations.push([i, j]);
        /*
        !!! These are the values that we're comparing 
        we push them second time to revert their color 
        */
        animations.push([i, j]);


        // this is the two integer we want to color
        // adding comparison property
        // animation.comparison = [i,j]; // start and mid 

        // the case when start is less than mid 
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // when we want to over ride value at index
            // adding swap property to animation object

            /*
            !!! we overwrite the value at index k in the original
            array with the value at index i in the auxiliaryArray 
            */
            animations.push([k, auxiliaryArray[i]]);// k is the start index of auxiliaryArray i is start 
            mainArray[k++] = auxiliaryArray[i++];
        }
        // the case when mid is < start 
        else{
            /*
            !!! we overwrite the value at index k in the original array with the value at index j in the
            auxiliary array
            */
            animations.push ([k,auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
        

    }
    // when second half reaches the end first half didn't yet
    while(i <= middleIdx){

        // animations.push({
        //     comparison:[i,i],
        //     swap:[k,auxiliaryArray[i]],
        // });

        /*
        !!! these are the values that we're comparing; we push them once to change their color 
        */
        animations.push([i,i]);
       /*
       !!! These are the values that we're comparing; we push them a second time 
       to revert their color
       */
       animations.push([i,i]);
       /*
       !!! we over write the value at index k in the original array with the value at index i
       in the auxiliary array;

       */
       animations.push([k,auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];

    }
    // vice versa 
    while(j <= endIdx){
        // animations.push({
        //     comparison:[j,j],
        //     swap:[k,auxiliaryArray[j]],
        // });



        /*
        These are the values that we're comparing we push them once to change their color
        */
        animations.push([j,j]);
       /*
       !!! these are the val we are comparing; we push them a second time to revert their color.
       */
       animations.push([j,j]);
      /*
      !!! we overwrite the value at index k in the original array with the val at index j in the auxiliary 
      array

      */
      animations.push([k,auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];

    }


}