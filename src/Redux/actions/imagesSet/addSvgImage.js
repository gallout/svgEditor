export const ADD_SVG_IMAGE = 'ADD_SVG_IMAGE';

// The function, addSVGImage, is an 'action creator'
// The return value is an 'action'
// Создает объект круг
export const addSvgImage = (xStart, yStart, shiftKey, path) => (dispatch) => {
    const obj = {
        id: Date.now(), // id объекта
        type: "svg", // тип объекта
        bg:
          "rgb(" + [255,255,255] + ")", // цвет объекта
        stroke: "black", // цвет рамки
        strokeWidth: "0.5", // ширина рамки
        xStart, 
        yStart, 
        xEnd: xStart, // изначально равно xStart, затем изменяется после ресайза
        yEnd: yStart, // изначально равно yStart, затем изменяется после ресайза
        locked: shiftKey, // необходим для увеличения объекта, если зажат Shift
        path: path
      };

    dispatch({
        type: ADD_SVG_IMAGE,
        obj: obj,
    })
}