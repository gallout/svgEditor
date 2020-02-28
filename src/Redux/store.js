import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers/combinedReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import brush from '../images/brush.svg'

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

// createStore takes in 3 parameters: 1. Reducer 2. preloadedState 3. Enhancer.
// In this case: 
// 1. Is the allReducer defined above
// 2. Are the intial values of the state within the redux store
// 3. Allows the store to be viewed within the Redux Tools Extension, a recommended tool when working with Redux.
// https://redux.js.org/api/createstore
export const store = createStore(
    reducers,
    {
    svgEditor: {
        tool: null, // инструмент, выбранный пользователем
        objMoveId: null, // ID объекта, который необходимо передвинуть
        rectObject: null, // ID квадрата
        circObject: null, // ID эллипса
        svgObject: null,
        dragStart: null, // объект с координатами по х и у, с которых необходимо начать перемещение объекта
        objects: [], //список svg-объектов,
        currentIndex: null, // поле класса ImagesSet
        imgUrls: [
          { name : "Бочка", src : brush, svgPath: blob  },
          /*
          { name : "Линии", src : 'https://source.unsplash.com/lVmR1YaBGG4/800x600', svgPath: blob  },
          { name : "Круги", src : 'https://source.unsplash.com/5KvPQc1Uklk/800x600' },
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
    }},
    composeWithDevTools(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

//store.subscribe(() => {console.log('subscribe', store.getState())} )


