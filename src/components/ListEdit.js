import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../App";
import { getStringDate } from "../util/date";

const ListEdit = () => {
  const [date] = useState(getStringDate(new Date()));
  const { onCreate } = useContext(DispatchContext);
  const contentRef = useRef();
  const [content, setContent] = useState("");

  const contentSubmit = () => {
    if (content.length < 1) {
      alert("1글자 이상 입력해 주세요!");
      contentRef.current.focus();
      return;
    }
    onCreate(content, date);

    alert("저장성공");
    setContent("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      contentSubmit();
    }
  };

  return (
    <div className="ListPlus">
      <input
        ref={contentRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘 할 일을 입력해주세요!"
        onKeyPress={onKeyPress}
      />
      <button onClick={contentSubmit}>추가하기</button>
    </div>
  );
};
export default React.memo(ListEdit);
