import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "./applyJob.scss";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import ReactQuill from "react-quill";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

export default function ApplyJob({ job }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userApply, setUserApply] = useState();
  const [letter, setLetter] = useState();
  const [file, setFile] = useState(null);
  const [onDage, setOnDage] = useState(false);
  const inputCvRef = useRef();

  const [inputs, setInputs] = useState({
    idJob: "",
    name: "",
    email: "",
    phone: "",
    letter: "",
    cv: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getUser = async () => {
    try {
      const res = await makeRequest.get("/user/find/" + currentUser?.id);
      setInputs({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        linkCv: res?.data?.linkCv,
      });
    } catch (error) {}
  };

  const {} = useQuery(["user"], () => {
    return getUser();
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const postApply = async () => {
    if (!inputs?.name || !inputs?.email || !inputs?.phone)
      return toast.error("Các trường không được rỗng.");
    if (!job) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const postCv = await makeRequest.post("/uploadFile", formData);

      inputs.idJob = job?.id;
      inputs.cv = postCv.data;
      inputs.letter = letter;
      await makeRequest.post("/apply", inputs);
      navigate(`/viec-lam/${job?.id}`);
      toast.success("Ứng tuyển thành công");
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const mutationApply = useMutation(
    () => {
      return postApply();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["apply"]);
      },
    }
  );

  const getUserApply = async () => {
    try {
      const res = await makeRequest.get("/apply/user?idJob=" + job?.id);
      setUserApply(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["apply"], () => {
    return getUserApply();
  });

  const handleChangeInputFile = (e) => {
    const file = e.target.files[0];
    const fileType = e.target.files[0].type;
    if (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile(file);
    } else {
      toast.error("File tải lên phải được định dạng là pdf, doc, docx.");
    }
  };

  const handleClickDeleteFile = () => {
    console.log(inputCvRef.current.files[0]);
    inputCvRef.current.value = "";
    setFile(null);
  };

  useEffect(() => {
    if (!currentUser) return navigate("/dang-nhap/nguoi-dung");
  }, []);

  return (
    <div className="applyJob">
      <div className="applyJob__header">
        <h4>{job && job?.nameJob}</h4>
      </div>
      <div className="applyJob__body">
        <div className="applyJob__body__item">
          <i class="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder=" "
            value={inputs?.name}
            id="name"
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="name">Tên hiển thị với nhà tuyển dụng</label>
        </div>
        <div className="applyJob__body__item">
          <i class="fa-solid fa-envelope"></i>
          <input
            type="email"
            placeholder=" "
            value={inputs?.email}
            id="email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="email">Email hiển thị với nhà tuyển dụng</label>
        </div>
        <div className="applyJob__body__item">
          <i class="fa-solid fa-phone"></i>
          <input
            type="number"
            placeholder=" "
            id="phone"
            name="phone"
            value={inputs?.phone}
            onChange={handleChange}
          />
          <label htmlFor="phone">Số điện thoại hiển thị với nhà tuyển dụng</label>
        </div>
        {/* <div className="applyJob__body__item">
          <i class="fa-solid fa-address-card"></i>
          <input
            type="text"
            placeholder=" "
            id="linkCv"
            name="linkCv"
            value={inputs?.linkCv}
            onChange={handleChange}
          />
          <label htmlFor="linkCv">Cv của bạn</label>
        </div> */}
        <div className="applyJob__body__item__cv">
          <div className="header">
            <i class="fa-solid fa-file"></i>
            <h4>Tải CV lên</h4>
          </div>
          <div className={`box`}>
            <label htmlFor="file_cv">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>Tải CV từ máy tính lên, chọn hoặc kéo thả.</span>
              <input
                type="file"
                id="file_cv"
                ref={inputCvRef}
                onChange={(e) => handleChangeInputFile(e)}
              />
            </label>
            {file && (
              <div className="file">
                <div className="file__name">
                  <i class="fa-regular fa-file-lines"></i>
                  <span>{file?.name}</span>
                </div>
                <button className="btn_delete" onClick={() => handleClickDeleteFile()}>
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            )}
            <button className="btn_submit">
              <label htmlFor="file_cv">Chọn CV</label>
            </button>
          </div>
        </div>
        <div className="applyJob__body__item__letter">
          <label htmlFor="">Thư xin việc</label>
          <div className="applyJob__body__item__letter__input">
            <ReactQuill value={letter} onChange={setLetter} />
          </div>
        </div>
      </div>
      <div className="applyJob__bottom">
        {userApply?.includes(currentUser?.id) ? (
          <div className="applyJob__bottom__applied">
            <i class="fa-regular fa-circle-check"></i>
            <span>Bạn đã ứng tuyển</span>
          </div>
        ) : (
          <button className="applyJob__bottom__button" onClick={() => mutationApply.mutate()}>
            Nộp đơn ngay
          </button>
        )}
      </div>
    </div>
  );
}
