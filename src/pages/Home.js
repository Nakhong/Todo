import React, { useState } from "react";
import MyHeader from "../components/MyHeader";
import ListEdit from "../components/ListEdit";
import Lists from "../components/Lists";

const Home = () => {
  const [curDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${
    curDate.getMonth() + 1
  }월 ${curDate.getDate()}일`;

  return (
    <div className="Home">
      <MyHeader headText={headText} />
      <ListEdit />
      <Lists />
      <button
        className="godiary"
        onClick={() =>
          (window.location.href = "https://hhn-react-diary1.firebaseapp.com/")
        }
      >
        일기장으로
      </button>
    </div>
  );
};

export default React.memo(Home);
