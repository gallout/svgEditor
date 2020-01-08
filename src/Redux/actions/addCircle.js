export const ADD_CIRC = 'ADD_CIRC';

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export const addCircle = (xStart, yStart, shiftKey) => (dispatch) => {
    const obj = {
        id: Date.now(), // id объекта
        type: "circ", // тип объекта
        bg:
          "rgb(" + [255,255,255] + ")", // цвет объекта
        stroke: "black", // цвет рамки
        strokeWidth: "0.5", // ширина рамки
        xStart, 
        yStart, 
        xEnd: xStart, // изначально равно xStart, затем изменяется после ресайза
        yEnd: yStart, // изначально равно yStart, затем изменяется после ресайза
        locked: shiftKey // необходим для увеличения объекта, если зажат Shift
      };

    dispatch({
        type: ADD_CIRC,
        obj: obj,
    })
}