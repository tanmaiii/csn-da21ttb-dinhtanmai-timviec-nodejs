import { useState } from "react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "./introUser.scss";
import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function IntroUser({ intro }) {
  const [edit, setEdit] = useState(false);
  const [valueIntro, setValueIntro] = useState(intro);
  const { currentUser } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const putIntro = async () => {
    try {
      await makeRequest.put("user/updateIntro", { intro: valueIntro });
      toast.success("Cập nhật giới thiệu thầnh công");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const mutation = useMutation(
    () => {
      return putIntro();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmitSave = () => {
    mutation.mutate();
    setEdit(false);
  };

  return (
    <div className="introUser">
      <div className="introUser__wrapper">
        <div className="introUser__wrapper__header">
          <h4>Giới thiệu </h4>
          {currentUser?.id == id && (
            <div className="introUser__wrapper__header__edit">
              {!edit ? (
                <button className="btn-edit" onClick={() => setEdit(true)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <>
                  <button className="btn-save" onClick={() => handleSubmitSave()}>
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
        <div className="introUser__wrapper__body">
          {!edit ? (
            <div
              className="introUser__wrapper__body__content"
              dangerouslySetInnerHTML={{ __html: intro }}
            ></div>
          ) : (
            <div className="introUser__wrapper__body__edit">
             <ReactQuill theme="snow" value={valueIntro} onChange={setValueIntro} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
