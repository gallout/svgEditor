import React from "react";
import classNames from "classnames";
import taplogo from "../images/tap.svg";
import ImagesSet from "../components/ImagesSet"
import brush from '../images/brush.svg'

let defaultTextArea = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 483.334 483.334" style="enable-background:new 0 0 483.334 483.334;" xml:space="preserve">
<g id="XMLID_1367_">
<g id="XMLID_1365_">
 <polygon style="fill:#FFFFFF;" points="322.223,388.043 380.809,373.397 417.425,344.104 446.718,285.518 432.071,256.225 
   270.96,256.225 270.96,73.144 263.637,65.821 227.02,80.467 190.404,124.407 190.404,292.841 234.344,358.75 		"/>
</g>
<g id="XMLID_1366_">
 <path style="fill:#EDEDED;" d="M270.961,258.347c-21.176,6.302-36.618,25.918-36.618,49.14c0,28.312,22.951,51.263,51.263,51.263
   h124.495l-58.586-58.586H248.99"/>
</g>
<g id="XMLID_1311_">
 <polygon style="fill:#F39200;" points="190.404,146.376 14.647,146.376 0,124.407 190.404,124.407 		"/>
</g>
<g id="XMLID_1279_">
 <path style="fill:#575756;" d="M483.334,344.104H284.859c-19.81,0-35.869-16.059-35.869-35.869v-22.717h197.727L483.334,344.104z"
   />
</g>
<g id="XMLID_1181_">
 <path style="fill:#F9B233;" d="M189.027,358.75h-18.964c-85.834,0-155.416-69.582-155.416-155.416v-56.957h175.758v210.996
   C190.404,358.134,189.788,358.75,189.027,358.75z"/>
</g>
<g id="XMLID_1315_">
 <polygon style="fill:#F39200;" points="14.647,148.105 43.94,146.376 43.94,292.841 14.647,237.522 		"/>
</g>
<g id="XMLID_857_">
 <rect x="388.132" y="307.311" style="fill:#1D1D1B;" width="80.556" height="15"/>
</g>
<g id="XMLID_858_">
 <rect x="373.485" y="278.018" style="fill:#1D1D1B;" width="80.556" height="15"/>
</g>
<g id="XMLID_768_">
 <rect x="219.697" y="109.583" style="fill:#1D1D1B;" width="14.646" height="15"/>
</g>
<path style="fill:#1D1D1B;" d="M292.794,336.332c-20.018,0-36.304-16.286-36.304-36.304c0-20.018,16.286-36.304,36.304-36.304
 h146.601v-15H292.794c-4.975,0-9.782,0.726-14.334,2.053V73.321h21.793v-15h-11.188l9.168-9.168l-10.607-10.605l-9.167,9.167
 V36.528h-15v22.116c-34.941,2.961-64.124,26.416-75.471,58.262H0v15h184.103c-0.412,2.479-0.727,4.99-0.926,7.534H7.147v65.522
 c0,88.934,72.354,161.287,161.288,161.287c16.249,0,29.47-13.22,29.47-29.47v-17.716c23.009,45.336,70.093,76.478,124.318,76.478
 c38.57,0,75.492-16.08,101.795-44.211h59.316v-15h-190.54V336.332z M182.904,336.78c0,7.979-6.491,14.47-14.47,14.47
 c-80.664,0-146.288-65.624-146.288-146.287V154.44h160.758V336.78z M322.223,380.543c-68.549,0-124.318-55.769-124.318-124.318
 v-14.646V153.7v-7.323c0-37.75,28.784-68.904,65.556-72.673v184.272c-13.268,9.283-21.97,24.667-21.97,42.053
 c0,28.289,23.015,51.304,51.304,51.304h109.463C379.984,370.055,351.641,380.543,322.223,380.543z"/>
<g id="XMLID_771_">
 <polygon style="fill:#1D1D1B;" points="51.439,197.639 36.439,197.639 36.439,168.169 73.232,168.169 73.232,183.169 
   51.439,183.169 		"/>
</g>
<polygon style="fill:#1D1D1B;" points="322.399,431.806 322.399,402.689 307.399,402.689 307.399,431.806 285.606,431.806 
 285.606,446.806 337.962,446.806 337.962,431.806 	"/>
</g>
</svg>`; 

let blob = `
CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0c
DovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCnZpZXdCb3g9IjAgMCA0ODMuMzM0IDQ4My4zMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3
VuZDpuZXcgMCAwIDQ4My4zMzQgNDgzLjMzNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBpZD0iWE1MSURfMTM2N18iPgo8ZyBpZD0iWE1MSURfMTM2NV8iPgo
gPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMzIyLjIyMywzODguMDQzIDM4MC44MDksMzczLjM5NyA0MTcuNDI1LDM0NC4xMDQgNDQ2Ljcx
OCwyODUuNTE4IDQzMi4wNzEsMjU2LjIyNSAKICAgMjcwLjk2LDI1Ni4yMjUgMjcwLjk2LDczLjE0NCAyNjMuNjM3LDY1LjgyMSAyMjcuMDIsODAuNDY3IDE5MC40M
DQsMTI0LjQwNyAxOTAuNDA0LDI5Mi44NDEgMjM0LjM0NCwzNTguNzUgCQkiLz4KPC9nPgo8ZyBpZD0iWE1MSURfMTM2Nl8iPgogPHBhdGggc3R5bGU9ImZpbGw6I0
VERURFRDsiIGQ9Ik0yNzAuOTYxLDI1OC4zNDdjLTIxLjE3Niw2LjMwMi0zNi42MTgsMjUuOTE4LTM2LjYxOCw0OS4xNGMwLDI4LjMxMiwyMi45NTEsNTEuMjYzLDU
xLjI2Myw1MS4yNjMKICAgaDEyNC40OTVsLTU4LjU4Ni01OC41ODZIMjQ4Ljk5Ii8+CjwvZz4KPGcgaWQ9IlhNTElEXzEzMTFfIj4KIDxwb2x5Z29uIHN0eWxlPSJm
aWxsOiNGMzkyMDA7IiBwb2ludHM9IjE5MC40MDQsMTQ2LjM3NiAxNC42NDcsMTQ2LjM3NiAwLDEyNC40MDcgMTkwLjQwNCwxMjQuNDA3IAkJIi8+CjwvZz4KPGcga
WQ9IlhNTElEXzEyNzlfIj4KIDxwYXRoIHN0eWxlPSJmaWxsOiM1NzU3NTY7IiBkPSJNNDgzLjMzNCwzNDQuMTA0SDI4NC44NTljLTE5LjgxLDAtMzUuODY5LTE2Lj
A1OS0zNS44NjktMzUuODY5di0yMi43MTdoMTk3LjcyN0w0ODMuMzM0LDM0NC4xMDR6IgogICAvPgo8L2c+CjxnIGlkPSJYTUxJRF8xMTgxXyI+CiA8cGF0aCBzdHl
sZT0iZmlsbDojRjlCMjMzOyIgZD0iTTE4OS4wMjcsMzU4Ljc1aC0xOC45NjRjLTg1LjgzNCwwLTE1NS40MTYtNjkuNTgyLTE1NS40MTYtMTU1LjQxNnYtNTYuOTU3
aDE3NS43NTh2MjEwLjk5NgogICBDMTkwLjQwNCwzNTguMTM0LDE4OS43ODgsMzU4Ljc1LDE4OS4wMjcsMzU4Ljc1eiIvPgo8L2c+CjxnIGlkPSJYTUxJRF8xMzE1X
yI+CiA8cG9seWdvbiBzdHlsZT0iZmlsbDojRjM5MjAwOyIgcG9pbnRzPSIxNC42NDcsMTQ4LjEwNSA0My45NCwxNDYuMzc2IDQzLjk0LDI5Mi44NDEgMTQuNjQ3LD
IzNy41MjIgCQkiLz4KPC9nPgo8ZyBpZD0iWE1MSURfODU3XyI+CiA8cmVjdCB4PSIzODguMTMyIiB5PSIzMDcuMzExIiBzdHlsZT0iZmlsbDojMUQxRDFCOyIgd2l
kdGg9IjgwLjU1NiIgaGVpZ2h0PSIxNSIvPgo8L2c+CjxnIGlkPSJYTUxJRF84NThfIj4KIDxyZWN0IHg9IjM3My40ODUiIHk9IjI3OC4wMTgiIHN0eWxlPSJmaWxs
OiMxRDFEMUI7IiB3aWR0aD0iODAuNTU2IiBoZWlnaHQ9IjE1Ii8+CjwvZz4KPGcgaWQ9IlhNTElEXzc2OF8iPgogPHJlY3QgeD0iMjE5LjY5NyIgeT0iMTA5LjU4M
yIgc3R5bGU9ImZpbGw6IzFEMUQxQjsiIHdpZHRoPSIxNC42NDYiIGhlaWdodD0iMTUiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojMUQxRDFCOyIgZD0iTTI5Mi
43OTQsMzM2LjMzMmMtMjAuMDE4LDAtMzYuMzA0LTE2LjI4Ni0zNi4zMDQtMzYuMzA0YzAtMjAuMDE4LDE2LjI4Ni0zNi4zMDQsMzYuMzA0LTM2LjMwNAogaDE0Ni4
2MDF2LTE1SDI5Mi43OTRjLTQuOTc1LDAtOS43ODIsMC43MjYtMTQuMzM0LDIuMDUzVjczLjMyMWgyMS43OTN2LTE1aC0xMS4xODhsOS4xNjgtOS4xNjhsLTEwLjYw
Ny0xMC42MDVsLTkuMTY3LDkuMTY3CiBWMzYuNTI4aC0xNXYyMi4xMTZjLTM0Ljk0MSwyLjk2MS02NC4xMjQsMjYuNDE2LTc1LjQ3MSw1OC4yNjJIMHYxNWgxODQuM
TAzYy0wLjQxMiwyLjQ3OS0wLjcyNyw0Ljk5LTAuOTI2LDcuNTM0SDcuMTQ3djY1LjUyMgogYzAsODguOTM0LDcyLjM1NCwxNjEuMjg3LDE2MS4yODgsMTYxLjI4N2
MxNi4yNDksMCwyOS40Ny0xMy4yMiwyOS40Ny0yOS40N3YtMTcuNzE2YzIzLjAwOSw0NS4zMzYsNzAuMDkzLDc2LjQ3OCwxMjQuMzE4LDc2LjQ3OAogYzM4LjU3LDA
sNzUuNDkyLTE2LjA4LDEwMS43OTUtNDQuMjExaDU5LjMxNnYtMTVoLTE5MC41NFYzMzYuMzMyeiBNMTgyLjkwNCwzMzYuNzhjMCw3Ljk3OS02LjQ5MSwxNC40Ny0x
NC40NywxNC40NwogYy04MC42NjQsMC0xNDYuMjg4LTY1LjYyNC0xNDYuMjg4LTE0Ni4yODdWMTU0LjQ0aDE2MC43NThWMzM2Ljc4eiBNMzIyLjIyMywzODAuNTQzY
y02OC41NDksMC0xMjQuMzE4LTU1Ljc2OS0xMjQuMzE4LTEyNC4zMTgKIHYtMTQuNjQ2VjE1My43di03LjMyM2MwLTM3Ljc1LDI4Ljc4NC02OC45MDQsNjUuNTU2LT
cyLjY3M3YxODQuMjcyYy0xMy4yNjgsOS4yODMtMjEuOTcsMjQuNjY3LTIxLjk3LDQyLjA1MwogYzAsMjguMjg5LDIzLjAxNSw1MS4zMDQsNTEuMzA0LDUxLjMwNGg
xMDkuNDYzQzM3OS45ODQsMzcwLjA1NSwzNTEuNjQxLDM4MC41NDMsMzIyLjIyMywzODAuNTQzeiIvPgo8ZyBpZD0iWE1MSURfNzcxXyI+CiA8cG9seWdvbiBzdHls
ZT0iZmlsbDojMUQxRDFCOyIgcG9pbnRzPSI1MS40MzksMTk3LjYzOSAzNi40MzksMTk3LjYzOSAzNi40MzksMTY4LjE2OSA3My4yMzIsMTY4LjE2OSA3My4yMzIsM
TgzLjE2OSAKICAgNTEuNDM5LDE4My4xNjkgCQkiLz4KPC9nPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojMUQxRDFCOyIgcG9pbnRzPSIzMjIuMzk5LDQzMS44MDYgMz
IyLjM5OSw0MDIuNjg5IDMwNy4zOTksNDAyLjY4OSAzMDcuMzk5LDQzMS44MDYgMjg1LjYwNiw0MzEuODA2IAogMjg1LjYwNiw0NDYuODA2IDMzNy45NjIsNDQ2Ljg
wNiAzMzcuOTYyLDQzMS44MDYgCSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjxn
Pgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPg==`

class Editor extends React.Component {
  svgRef = React.createRef(); // ссылка на svg-элемент

  state = {
    tool: null, // инструмент, выбранный пользователем
    objMoveId: null, // ID объекта, который необходимо передвинуть
    rectObject: null, // ID квадрата
    circObject: null, // ID эллипса
    dragStart: null, // объект с координатами по х и у, с которых необходимо начать перемещение объекта
    objects: [], //список svg-объектов,
    imgUrls: [
      { name : "Бочка", src : brush, svgPath: blob  },
     // { name : "Линии", /*src : 'https://source.unsplash.com/lVmR1YaBGG4/800x600',*/ svgPath: blob  },
     /* { name : "Круги", src : 'https://source.unsplash.com/5KvPQc1Uklk/800x600' },
      { name : "Гант", src : 'https://source.unsplash.com/GtYFwFrFbMA/800x600' },
      { name : "Крест", src : 'https://source.unsplash.com/Igct8iZucFI/800x600' },
      { name : "Лок", src : 'https://source.unsplash.com/M01DfkOqz7I/800x600' },
      { name : "Софт", src : 'https://source.unsplash.com/MoI_cHNcSK8/800x600' },
      { name : "Шторм", src : 'https://source.unsplash.com/M0WbGFRTXqU/800x600' },
      { name : "Семантика", src : 'https://source.unsplash.com/s48nn4NtlZ4/800x600' },
      { name : "Рис", src : 'https://source.unsplash.com/E4944K_4SvI/800x600' },
      { name : "Спорт", src : 'https://source.unsplash.com/F5Dxy9i8bxc/800x600' },
      { name : "Вов", src : 'https://source.unsplash.com/iPum7Ket2jo/800x600' }, */                
  ]
  };

  // Вызывается после монтирования объекта в DOM-дерево
  componentDidMount() {
    try {
      this.setState(JSON.parse(localStorage.getItem("canvas"))); // Получение элементов из localStorage
    } catch (err) {
      console.warn("Failed to restore state", err);
    }
  }

  // Вызывается после обновления объекта в DOM-дерево
  componentDidUpdate() {
    localStorage.setItem("canvas", JSON.stringify(this.state)); // Обновление localStorage
  }

  // Метод для получения относительного расположения объекта на странице
  getCoords({ clientX, clientY }) {
    const { top, left } = this.svgRef.current.getBoundingClientRect(); // Возвращает объект координат элемента
    return { x: clientX - left, y: clientY - top };
  }

  // Метод для записи инструмента, выбранного пользователем
  handleSelectTool(tool) {
    this.setState({ tool });
  }
  
  // Метод запоминающий состояние объекта при перемещении
  handleMouseDownObj(obj, e) {
    const { tool } = this.state;
    if (tool === "drag") {
      this.setState({
        objMoveId: obj.id,
        dragStart: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }

  // Метод возврата состояния объекта после перемещения
  handleMouseUpObj(obj, e) {
    this.setState({ objMoveId: null });
  }

  // Метод создания объекта с уникальным ID
  handleMouseDown(e) {
    const { shiftKey } = e;
    const { x: xStart, y: yStart } = this.getCoords(e);

    if (this.state.tool === "rect") {
      this.setState(s => {
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
        return {
          objects: [...s.objects, obj],
          rectObject: obj.id
        };
      });
    }

    if (this.state.tool === "circ") {
      this.setState(s => {
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
        return {
          objects: [...s.objects, obj],
          circObject: obj.id
        };
      });
    }
  }

  // Метод для обнуления свойств у state после отпускания кнопки мыши
  handleMouseUp(e) {
    this.setState({
      objMoveId: null,
      rectObject: null,
      circObject: null
    });
  }

  // Метод, срабатываемый при движении мышки
  handleMouseMove(e) {
    const { rectObject, circObject, objMoveId, dragStart } = this.state;
    if (rectObject) {
      this.findObjByIdAndSet_xEnd_And_yEnd(rectObject, e);
    }
  
    if (circObject) {
      this.findObjByIdAndSet_xEnd_And_yEnd(circObject, e);
    }
  
    if (objMoveId && dragStart) {
      this.findObjAndTransformOnPage(objMoveId, dragStart, e);
    }
  }
  
  // Метод поиска объекта в списке объектов по Id и установка конечных значений по x и у
  findObjByIdAndSet_xEnd_And_yEnd(objId, e) {
      const index = this.state.objects.findIndex(o => o.id === objId);
      const { x: xEnd, y: yEnd } = this.getCoords(e);
      const obj = {
        ...this.state.objects[index],
        xEnd,
        yEnd,
        locked: e.shiftKey
      };

      this.setState({
        objects: [
          ...this.state.objects.slice(0, index), //spread syntax, return new array
          obj,
          ...this.state.objects.slice(index + 1)
        ]
      });
  }

  // Метод перемещения объекта
  findObjAndTransformOnPage(objMoveId, dragStart, e) {
    const index = this.state.objects.findIndex(o => o.id === objMoveId);
    const { x: xDragStart, y: yDragStart } = dragStart;
    const { clientX: xDragEnd, clientY: yDragEnd } = e;
    const xDelta = xDragEnd - xDragStart;
    const yDelta = yDragEnd - yDragStart;
    const obj = this.state.objects[index];
    this.setState({
      dragStart: {
        x: xDragEnd,
        y: yDragEnd
      },
      objects: [
        ...this.state.objects.slice(0, index),
        {
          ...obj,
          xStart: obj.xStart + xDelta,
          xEnd: obj.xEnd + xDelta,
          yStart: obj.yStart + yDelta,
          yEnd: obj.yEnd + yDelta
        },
        ...this.state.objects.slice(index + 1)
      ]
    });
  }

  // Метод подсчета высоты и ширины рисуемого объекта. Необходим в том случае когда рисуем объект справа налево
  countWidthAndHeight(obj) {
    let x, y, w, h;

    if (obj.xStart < obj.xEnd) {
      x = obj.xStart;
      w = obj.xEnd - obj.xStart;
    } else {
      x = obj.xEnd;
      w = obj.xStart - obj.xEnd;
    }

    if (obj.yStart < obj.yEnd) {
      y = obj.yStart;
      h = obj.yEnd - obj.yStart;
    } else {
      y = obj.yEnd;
      h = obj.yStart - obj.yEnd;
    }
    return [x, y, w, h]
  }

  // Метод для рисования эллипса
  renderCirc(obj) {
    let [x,y,w,h] = this.countWidthAndHeight(obj);

    const r = Math.min(h / 2, w / 2);
    const rx = obj.locked ? r : w / 2;
    const ry = obj.locked ? r : h / 2;

    return (
      <ellipse
        key={obj.id}
        cx={x + rx}
        cy={y + ry}
        rx={rx}
        ry={ry}
        fill={obj.bg}
        stroke={obj.stroke}
        strokeWidth={obj.strokeWidth}
        onMouseDown={this.handleMouseDownObj.bind(this, obj)}
        onMouseUp={this.handleMouseUpObj.bind(this, obj)}
      />
    );
  }

  // Метод для рисования прямоугольника
  renderRect(obj) {
    let [x,y,w,h] = this.countWidthAndHeight(obj);

    const size = Math.min(w, h);

    return (
      <rect
        key={obj.id}
        x={x}
        y={y}
        width={obj.locked ? size : w}
        height={obj.locked ? size : h}
        fill={obj.bg}
        stroke={obj.stroke}
        strokeWidth={obj.strokeWidth}
        onMouseDown={this.handleMouseDownObj.bind(this, obj)}
        onMouseUp={this.handleMouseUpObj.bind(this, obj)}
      />
    );
  }

  // Метод для изменения размеров выбранного объекта
  resizeSvgElem() {
  }

  // Метод для очистки рабочей Svg-области и для очистки LocalStorage от всех объектов
  eraseElems() {
    let svgBlock = this.svgRef.current;
    svgBlock.innerHTML = "";
    localStorage.removeItem("canvas");
  }

  render() {
    const { objects, tool, imgUrls } = this.state;
    return (
      <div className="flexBlock">
      <div className="canvas">
        <div className="toolbar">
          {[
            ["drag", "Переместить"],
            ["rect", "Прямоугольник"],
            ["circ", "Круг"],
          ].map(t => (
            <button
              key={t[0]}
              onClick={this.handleSelectTool.bind(this, t[0])}
              className={classNames({ active: tool === t[0] })}
            >
              {t[1]} 
            </button>
          ))}
        <button
          onClick={() => {
            this.eraseElems(); 
          }} > Очистить
        </button> 
        <button
          onClick={() => {
            this.resizeSvgElem();
          }} > Изменить размер
        </button> 
        </div>

        <svg
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
          className={`tool--${tool}`}
          id="svgEditPanel"
          ref={this.svgRef}
        >
          {objects.map(o => {
            if (o.type === "rect") {
              return this.renderRect(o);
            }

            if (o.type === "circ") {
              return this.renderCirc(o);
            }

            return null;
          })}
        </svg>
      </div>
      <div className="marginBlock">
        <ImagesSet  imgUrls={imgUrls} /> 
      </div>
      </div>
    );
  }
}

export default Editor;
