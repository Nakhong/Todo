import { useContext } from "react";
import { stateContext } from "../App";

import ListItem from "./ListItem";
const Lists = () => {
  const list = useContext(stateContext);

  const allClear = () => {
    if (window.confirm("모든 할 일을 삭제하시겠습니까?")) {
      console.log(localStorage + "삭제");
      localStorage.clear();
      window.location.replace("/");
    }
  };

  return (
    <div className="Lists">
      {list.length !== 0 ? (
        <div>
          <h3>오늘 할일</h3>
          <div>
            {list.map((it) => (
              <ListItem key={it.id} {...it} />
            ))}
          </div>
          <button className="allClear" onClick={allClear}>
            모든 할일 삭제하기
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <img src={process.env.PUBLIC_URL + `assets/doit.png.jpg`} alt="ToDo" />
    </div>
  );
};
Lists.defaultProps = {
  list: [],
};

export default Lists;
