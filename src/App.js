import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { getStringDate } from "./util/date";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [...state, newItem];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "CHECK": {
      newState = state.map((it) => it);
      break;
    }
    case "CLEAR": {
      newState = [];
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};

export const stateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(1);
  const [newDay] = useState(getStringDate(new Date()));
  useEffect(() => {
    const localData = localStorage.getItem("todo");
    if (localData) {
      const List = JSON.parse(localData);
      if (List.length >= 1) {
        if (List[0].date !== newDay) {
          localStorage.clear();
          dispatch({ typd: "CLEAR", data: List });
          window.location.replace("/");
        }
        dataId.current = parseInt(List[List.length - 1].id) + 1;
        dispatch({ type: "INIT", data: List });
      }
    }
  }, []);

  const onCreate = useCallback((content, date) => {
    dispatch({
      type: "CREATE",
      data: { content, id: dataId.current, date: getStringDate(new Date()) },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onCheck = useCallback(() => {
    dispatch({ type: "CHECK" });
  }, []);

  return (
    <stateContext.Provider value={data}>
      <DispatchContext.Provider value={{ onCreate, onRemove, onCheck }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
