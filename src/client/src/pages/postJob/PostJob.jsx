import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./postJob.scss";
import ReactQuill from "react-quill";
import Select from "../../components/select/Select";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { makeRequest } from "../../axios";

import { typeWorks, educationJob, experienceJob, sexData } from "../../config/data";

export default function PostJob() {
  const { currentCompany } = useAuth();
  const [fields, setFields] = useState();
  const [provinces, setProvinces] = useState();

  const [selectedOptionProvince, setSelectedOptionProvince] = useState();
  const [selectedOptionFields, setSelectedOptionFields] = useState();

  const [request, setRequest] = useState("");
  const [desc, setDesc] = useState("");
  const [other, setOther] = useState("");

  const [sex, setSex] = useState("cả hai");
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [salaryDiscuss, setSalaryDiscuss] = useState(false);
  const [typeWork, setTypeWork] = useState(typeWorks[0].name);
  const [education, setEducation] = useState(educationJob[0].name);
  const [experience, setExperience] = useState(experienceJob[0].name);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    idField: "",
    idProvince: "",
    nameJob: "",
    request: "",
    desc: "",
    other: "",
    salaryMin: "",
    salaryMax: "",
    typeWork: "",
    education: "",
    sex: "",
    experience: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!selectedOptionFields || !selectedOptionProvince)
      return toast.error("Chưa chọn ngành nghề và địa chỉ.");
    if (!sex || !typeWork || !education) return toast.error("Chọn các mục trong yêu cầu chung.");
    if (!request || !desc) return toast.error("Mô tả và yêu cầu không được rỗng.");

    if (salaryMax < salaryMin)
      return toast.error("Tiền lương tối đa không nhỏ hơn tiền lương tối thiểu.");

    try {
      inputs.idField = selectedOptionFields.fId;
      inputs.idProvince = selectedOptionProvince.pId;
      inputs.sex = sex;
      inputs.desc = desc;
      inputs.request = request;
      inputs.other = other;
      inputs.typeWork = typeWork;
      inputs.education = education;
      inputs.experience = experience;
      if (salaryDiscuss === true) {
        inputs.salaryMin = 0;
        inputs.salaryMax = 0;
      } else {
        inputs.salaryMin = salaryMin;
        inputs.salaryMax = salaryMax;
      }
      await makeRequest.post("/job", inputs);
      toast.success("Đăng bài thành công!");
      navigate(`/nha-tuyen-dung/${currentCompany.id}`);
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  useEffect(() => {
    const getFields = async () => {
      try {
        const res = await makeRequest("/fields");
        setFields(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFields();
  }, []);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await makeRequest("/provinces");
        setProvinces(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (!currentCompany) return navigate("/nha-tuyen-dung/dang-nhap");
  }, [currentCompany]);

  return (
    <div className="postJob">
      <div className="container">
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-angle-left"></i>
          <span>Quay lại</span>
        </button>
        <div className="postJob__wrapper">
          <div className="postJob__wrapper__header">
            <h2>Đăng bài tuyển dụng</h2>
          </div>
          <div className="postJob__wrapper__body">
            {/* thông tin */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">Thông tin tuyển dụng</h2>
              <div className="postJob__wrapper__body__form__content">
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Chức danh tuyển dụng</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <input
                      onChange={handleChange}
                      name="nameJob"
                      type="text"
                      placeholder="Chức danh"
                    />
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Loại ngành nghề</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <Select
                      options={fields && fields}
                      selectedOption={selectedOptionFields}
                      setSelectedOption={setSelectedOptionFields}
                    />
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Địa chỉ làm việc</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <Select
                      options={provinces && provinces}
                      selectedOption={selectedOptionProvince}
                      setSelectedOption={setSelectedOptionProvince}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* yêu cầu chung */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">Yêu cầu chung</h2>
              <div className="postJob__wrapper__body__form__content">
                <div className="postJob__wrapper__body__form__content__item  postJob__wrapper__body__form__content__item__sex">
                  <h6>Giới tính</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    {sexData?.map((item, i) => (
                      <div
                        key={i}
                        className="postJob__wrapper__body__form__content__item__input__child"
                      >
                        <input
                          onChange={(e) => setSex(e.target.value)}
                          defaultChecked={item.value === "Cả hai"}
                          name={item.name}
                          value={item.value}
                          type="radio"
                          id={`sex-${item.value}`}
                        />
                        <label htmlFor={`sex-${item.value}`}>{item.value}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item postJob__wrapper__body__form__content__item__salary">
                  <h6>Mức lương trên tháng (từ 1 đến 50 triệu)</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__scale__input">
                    <input
                      type="number"
                      onChange={(e) =>
                        parseInt(e.target.value) < 1 || parseInt(e.target.value) > 50
                          ? setSalaryMin(1)
                          : setSalaryMin(parseInt(e.target.value))
                      }
                      name="salaryMin"
                      value={salaryMin}
                      placeholder="Tối thiểu"
                      min={1}
                      max={50}
                    />
                    <input
                      type="number"
                      onChange={(e) =>
                        parseInt(e.target.value) < 1 || parseInt(e.target.value) > 50
                          ? setSalaryMax(50)
                          : setSalaryMax(parseInt(e.target.value))
                      }
                      name="salaryMax"
                      value={salaryMax}
                      placeholder="Tối đa"
                      min={1}
                      max={50}
                    />
                    <div className="postJob__wrapper__body__form__content__item__input__child">
                      <input
                        type="checkbox"
                        name=""
                        id="salaryDiscuss"
                        onChange={(e) => setSalaryDiscuss(e.target.checked)}
                      />
                      <label htmlFor="salaryDiscuss">Thảo thuận</label>
                    </div>
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item  postJob__wrapper__body__form__content__item__typeWork">
                  <h6>Hình thức làm việc</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__typeWork__input">
                    {typeWorks.map((item, i) => (
                      <div
                        key={i}
                        className="postJob__wrapper__body__form__content__item__input__child"
                      >
                        <input
                          className="typeWork__input"
                          name={`typeWork`}
                          id={`typeWork${item.id}`}
                          type="radio"
                          value={item.name}
                          onChange={(e) => setTypeWork(e.target.value)}
                        />
                        <label htmlFor={`typeWork${item.id}`}>{item.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item postJob__wrapper__body__form__content__item__education">
                  <h6>Bằng cấp</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__education__input">
                    {educationJob?.map((item, i) => (
                      <div
                        key={i}
                        className="postJob__wrapper__body__form__content__item__input__child "
                      >
                        <input
                          className="education__input"
                          name={`education`}
                          id={`education${item.id}`}
                          type="radio"
                          value={item.name}
                          onChange={(e) => setEducation(e.target.value)}
                        />
                        <label htmlFor={`education${item.id}`}>{item.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item postJob__wrapper__body__form__content__item__experience">
                  <h6>Kinh nghiệm</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__experience__input">
                    {experienceJob.map((item, i) => (
                      <div
                        key={i}
                        className="postJob__wrapper__body__form__content__item__input__child "
                      >
                        <input
                          className="experienceJob__input"
                          name={`experienceJob`}
                          id={`experienceJob${item.id}`}
                          type="radio"
                          value={item.name}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <label htmlFor={`experienceJob${item.id}`}>{item.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* mô tả */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">Mô tả công việc</h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" value={desc} onChange={setDesc} />
              </div>
            </div>
            {/* yêu cầu */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">Yêu cầu công việc</h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" value={request} onChange={setRequest} />
              </div>
            </div>
            {/* khác */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">Thông tin khác</h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" value={other} onChange={setOther} />
              </div>
            </div>
          </div>
          <div className="postJob__wrapper__bottom">
            <button onClick={handleSubmit}>Đăng bài</button>
          </div>
        </div>
      </div>
    </div>
  );
}
