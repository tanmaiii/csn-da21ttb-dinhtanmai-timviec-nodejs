import React, { useState } from "react";
import "./introCompany.scss";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { makeRequest } from "../../../axios";

import { useMutation, useQueryClient } from "react-query";

export default function IntroCompany({ intro }) {
  const [edit, setEdit] = useState(false);
  const [valueIntro, setValueIntro] = useState(intro);
  const { currentCompany } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.put("company/updateIntro", { intro: valueIntro });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["company"]);
      },
    }
  );

  const handleSubmitSave = () => {
    mutation.mutate();
    setEdit(false);
  };

  return (
    <div className="introComspany">
      <div className="introCompany__wrapper">
        <div className="introCompany__wrapper__header">
          <h4>Về công ty</h4>
          {currentCompany?.id == id && (
            <div className="introCompany__wrapper__header__edit">
              {!edit ? (
                <button className="btn-edit" onClick={() => setEdit(true)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <>
                  <button
                    className="btn-save"
                    onClick={() => handleSubmitSave()}
                  >
                    <span>Lưu</span>
                  </button>
                  <button className="btn-cancel" onClick={() => setEdit(false)}>
                    <span>Hủy</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="introCompany__wrapper__body">
          {!edit ? (
            <div
              className="introCompany__wrapper__body__content"
              dangerouslySetInnerHTML={{ __html: intro || "Không có" }}
            ></div>
          ) : (
            <div className="introCompany__wrapper__body__edit">
              <ReactQuill
                theme="snow"
                value={valueIntro}
                onChange={setValueIntro}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
