import { throwStatement } from '@babel/types';
import React from 'react';
//connect with css file
import './SortingVisualizer.css';
//import the custom merge sort we wrote in SortingAlgorithms Folder SortingAlgorithms.js file
import * as SortingAlgorithms  from '../SortingAlgorithms/SortingAlgorithms.js'

//!!! change this val for the speed of the animation.
const ANIMATION_SPEED_MS = 3;
// change this val for the num of bars (val) in the array
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// this is the change color of the array bars.
const SECONDARY_COLOR = 'red';


//Export (default) class in ReactJS 
//https://stackoverflow.com/questions/34840708/export-default-class-in-reactjs
//https://2ality.com/2014/09/es6-modules-final.html
export default class SortingVisualizer extends React.Component{
    // contreuctor for a react compinent is called before it is mounted

    //constructor() use for two purpose initializing local state by assigning an object to
    // this.state

    //second, binding event handler methods to an instance.

    //https://reactjs.org/docs/react-component.html#render
    constructor(props){

        // when implement the constructor for a react.component call
        //super(props)
        super(props);
        this.state = {
            // our main array
            array: [],
        };
    }
    // when the app loads when we refresh the page, when the component loads we call the
    // reset array methods
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromIntervals(5,730));
        }
        this.setState({array});
    }

    mergeSort(){
        // for every animation we have two val is comparing and two val for swaping 
        const animations = SortingAlgorithms.mergeSort(this.state.array);
        

       

        // loop through animations 
        for(let i = 0;  i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            

            // every 3 index passed we have a new start of a new animation 
            const isColorChange = i % 3 !== 2;


            if(isColorChange){
                // if we at the first of the triplet
                // means we are comparing value we want to change the color to red
                // if we are at the second of the triplet in out newAnimation we change
                // the color of the same two comparison back to turquoise

                // for the third one we do swap;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() =>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {
                setTimeout(() =>{
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;



                    // const tempHeight = barOneStyle.height;
                    // barOneStyle.height = barTwoStyle.height;
                    // barTwoStyle.height = tempHeight;
                }, i * ANIMATION_SPEED_MS);
            }





            


            // const {comparison,swap} = animations[i];



            // delay 10 msec times the index i 
            // setTimeout(() =>{




                // const arrayBars = document.getElementsByClassName('array-bar');

                // // have the two comparison bar change to red 
                // arrayBars[comparison[1]].style.backgroundColor = 'red';
                // arrayBars[comparison[0]].style.backgroundColor = 'red';
                // setTimeout(()=>{
                    // arrayBars[comparison[1]].style.backgroundColor = 'turquoise';
                    // arrayBars[comparison[0]].style.backgroundColor = 'turquoise';
                // }, (i + 1)* 10);


            // }, i * 10);

        }












        // // use for testing, this will have the sorted result from the build in function
        // const java_ScriptSortedArray = this.state.array
        //     .slice()
        //     // need to pass in a sorting function, the default one is not sorting from low to high 
        //     .sort((a,b) => a - b);
        // // this is the custom merge sort we defined in SortingAlgorithms.js
        // const custom_SortedArray =SortingAlgorithms.mergeSort(this.state.array);

        // // print out the result see if they are equal
        // console.log(java_ScriptSortedArray);
        // console.log(custom_SortedArray);
        // console.log(arraysAreEqual(java_ScriptSortedArray,custom_SortedArray))


    }
    quickSort(){}
    heapSort(){}
    bubbleSort(){}

    testSortingAlgorithms(){
        //create 100 array each time 
        for(let i = 0; i < 100; i++){
            const array = [];
            // get random array length
            const length = randomIntFromIntervals(1,1000);
            // add random int in the array
            for(let i = 0; i < length; i++){
                array.push(randomIntFromIntervals(-1000,1000));
            }

            const java_ScriptSortedArray = array
                                            .slice()
                                            .sort((a,b) => a -b);
            const custom_SortedArray = SortingAlgorithms.mergeSort(array.slice());
            console.log(arraysAreEqual(java_ScriptSortedArray,custom_SortedArray));

        }

    }


    // render HTML in a web page

    //http://www.hackingwithreact.com/read/1/13/rendering-an-array-of-data-with-map-and-jsx
    render(){
        const {array} = this.state;
        return (
            <div className="array-container">
            {array.map((value,idx)=>(
                <div className="array-bar" key={idx} 

                // for each value in array we put it as array-bar's height in pixels
                style={{backgroundColor: PRIMARY_COLOR,height: `${value}px`,}}></div>
                
                
                //below is the button of generate new array
                //The onclick event occurs when the user clicks on an element.
                //https://www.w3schools.com/jsref/event_onclick.asp

                // use the arrow function in react to keep this context
            ))}
            
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        );
    }

}

//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromIntervals(min,max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// using to check if our custom merge sort, if the result is the same the build in one.

function arraysAreEqual(arrayOne, arrayTwo){
    if(arrayOne.length !== arrayTwo.length){
        return false;
    }
    for(let i = 0; i < arrayOne.length; i++){
        if(arrayOne[i] !== arrayTwo[i]){
            return false;
        }
    }
    return true;
}

