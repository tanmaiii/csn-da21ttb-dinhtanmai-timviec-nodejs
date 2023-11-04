import { useState } from "react";
import ReactQuill from "react-quill";
import "./introUser.scss";

export default function IntroUser({ intro }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="introUser">
      <div className="introUser__wrapper">
        <div className="introUser__wrapper__header">
          <h4>Giới thiệu </h4>
          <div className="introUser__wrapper__header__edit">
            {!edit ? (
              <button className="btn-edit" onClick={() => setEdit(true)}>
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Chỉnh sửa</span>
              </button>
            ) : (
              <>
                <button className="btn-save" onClick={() => setEdit(false)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Lưu</span>
                </button>
                <button className="btn-cancel" onClick={() => setEdit(false)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Hủy</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="introUser__wrapper__body">
          {!edit ? (
            <div className="introUser__wrapper__body__content">{intro}</div>
          ) : (
            <div className="introUser__wrapper__body__edit">
              <ReactQuill theme="snow" defaultValue={intro} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
