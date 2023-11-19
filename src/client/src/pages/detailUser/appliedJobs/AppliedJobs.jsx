import { useEffect, useState } from "react";
//import jobs from "../../../config/jobs";
import "./appliedJobs.scss";
import { makeRequest, apiImage } from "../../../axios";
import Pagination from "../../../components/pagination/Pagination";
import img from "../../../assets/images/avatarCpn.png";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 2;

  const getJobs = async () => {
    try {
      const res = await makeRequest.get(
        `/apply?limit=${limit}&page=${paginate}`
      );
      setJobs(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
    } catch (error) {}
  };

  console.log(jobs);

  useEffect(() => {
    getJobs();
  }, [paginate]);

  return (
    <div className="appliedJobs">
      <div className="appliedJobs__wrapper">
        {jobs?.map((job, i) => (
          <div key={i} className="appliedJobs__wrapper__item">
            <div className="col pc-9 t-9 m-7">
              <div className="appliedJobs__wrapper__item__left ">
                <div className="appliedJobs__wrapper__item__left__header">
                  <img
                    src={job?.avatarPic ? apiImage + job?.avatarPic : img}
                    alt=""
                  />
                  <div className="text">
                    <Link to={`/viec-lam/${job?.id}`}>
                      <h4 className="nameJob">{job?.nameJob}</h4>
                    </Link>
                    <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
                      <h6 className="nameCompany">{job?.nameCompany}</h6>
                    </Link>
                  </div>
                </div>
                <div className="appliedJobs__wrapper__item__left__body">
                  <div className="appliedJobs__wrapper__item__left__body__inportant">
                    <div className="wage">
                      <i className="fa-solid fa-dollar-sign"></i>
                      <span>
                        {job?.salaryMax === 0 && job?.salaryMin === 0
                          ? "Thảo thuận"
                          : `${job?.salaryMin} - ${job?.salaryMax} triệu`}
                      </span>
                    </div>
                    <div className="typeWork">
                      <span>{job?.typeWork}</span>
                    </div>
                    <div className="province">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{job?.province}</span>
                    </div>
                  </div>
                </div>
                <div className="appliedJobs__wrapper__item__left__bottom">
                  <div className="createdAt">
                    <span>Ứng tuyển {moment(job?.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col pc-3 t-3 m-4">
              <div className="appliedJobs__wrapper__item__right">
                <span>Trạng thái</span>
                <button>{job?.status}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPage={totalPage}
        limit={limit}
        paginate={paginate}
        setPaginate={setPaginate}
      />
    </div>
  );
}
