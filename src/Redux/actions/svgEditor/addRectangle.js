export const ADD_RECT = 'ADD_RECT';

// The function, addRectangle, is an 'action creator'
// The return value is an 'action'
// Создает объект квадрат
export const addRectangle = (xStart, yStart, shiftKey) => (dispatch) => {
    const obj = {
        id: Date.now(), // id объекта
        type: "rect", // тип объекта
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
        type: ADD_RECT,
        obj: obj,
    })
}