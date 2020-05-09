import _ from 'lodash';
// const array: number[] = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const array: number[] = _.shuffle([0, 1, 2, 3, 4]);
console.log('---', array, '---');

function insertSort(array: number[]) {
  // time complexity: o(n^2)
  // space complexity: o(n)
  const result: number[] = [];
  result.push(array[0]);
  for (let index = 1; index < array.length; index++) {
    let isInsert = false;
    for (let i = 0; i < result.length; i++) {
      if (array[index] < result[i]) {
        result.splice(i, 0, array[index]);
        isInsert = true;
        break;
      }
    }
    if (!isInsert) result.push(array[index]);
  }
  return result;
}

function insertSort2(array: number[]) {
  // time complexity: o(n^2)
  // space complexity: o(1)
  for (let i = 1; i < array.length; i++) {
    let cur = array[i];
    let insertionIndex = i - 1;
    while (insertionIndex >= 0 && array[insertionIndex] > cur) {
      array[insertionIndex + 1] = array[insertionIndex];
      insertionIndex--;
    }
    array[insertionIndex + 1] = cur;
  }
}

function quickSort(input: number[]): number[] {
  if (input.length <= 1) return input;
  const pivot = input[input.length - 1];
  const left = input.filter((e) => e < pivot);
  const right = input.filter((e) => e > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

function swap(array: number[], a: number, b: number): void {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function quickSort2(input: number[], left: number, right: number): void {
  if (left >= right) return;

  const pivot = input[right];
  let leftIndex = left;
  let rightIndex = right - 1;
  while (true) {
    while (leftIndex < right && input[leftIndex] <= pivot) leftIndex++;
    while (rightIndex >= left && input[rightIndex] > pivot) rightIndex--;
    if (leftIndex > rightIndex) break;
    swap(input, leftIndex, rightIndex);
  }
  swap(input, leftIndex, right);
  const partionIndex = leftIndex;

  quickSort2(input, left, partionIndex - 1);
  quickSort2(input, partionIndex + 1, right);
}

function sort(arr1: number[], arr2: number[]): number[] {
  const array1 = arr1.slice();
  const array2 = arr2.slice();
  const output: number[] = [];
  while (array1.length > 0 && array2.length > 0) {
    if (array1[0] < array2[0]) {
      output.push(array1[0]);
      array1.shift();
    } else {
      output.push(array2[0]);
      array2.shift();
    }
  }
  output.push(...array1, ...array2);
  return output;
}

function mergeSort(array: number[]): number[] {
  if (array.length <= 1) return array;
  const start = 0;
  const mid = Math.floor(array.length / 2);
  const end = array.length;
  return sort(mergeSort(array.slice(start, mid)), mergeSort(array.slice(mid, end)));
}

function mergeSort2(array: number[]): void {}

console.log(mergeSort(array));
