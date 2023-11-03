import React, { useState } from "react";
import "./introCompany.scss";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

export default function IntroCompany({ intro, companyId }) {
  const [edit, setEdit] = useState(false);
  const { currentCompany } = useAuth();
  const { id } = useParams();

  return (
    <div className="introComspany">
      <div className="introCompany__wrapper">
        <div className="introCompany__wrapper__header">
          <h4>Về công ty</h4>
          {currentCompany?.id === companyId && (
            <div className="introCompany__wrapper__header__edit">
              {!edit ? (
                <button className="btn-edit" onClick={() => setEdit(true)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <>
                  <button className="btn-save" onClick={() => setEdit(false)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Lưu</span>
                  </button>
                  <button className="btn-cancel" onClick={() => setEdit(false)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Hủy</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="introCompany__wrapper__body">
          {!edit ? (
            <div className="introCompany__wrapper__body__content">{intro}</div>
          ) : (
            <div className="introCompany__wrapper__body__edit">
              <ReactQuill theme="snow" defaultValue={intro} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
