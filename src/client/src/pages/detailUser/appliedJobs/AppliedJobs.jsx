import { useEffect, useState } from "react";
import "./appliedJobs.scss";
import { makeRequest, apiImage } from "../../../axios";
import Pagination from "../../../components/pagination/Pagination";
import img from "../../../assets/images/avatarCpn.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { statusUser } from "../../../config/data.js";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import Loader from "../../../components/loader/Loader";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../context/authContext.js";
import Modal from "../../../components/modal/Modal.jsx";
import { toast } from "sonner";
export default function AppliedJobs() {
  const [jobs, setJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const limit = 3;
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const getJobApply = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(`/apply?limit=${limit}&page=${paginate}`);
      setJobs(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const {} = useQuery(["applies", paginate], () => {
    return getJobApply();
  });

  useEffect(() => {
    if (parseInt(currentUser?.id) !== parseInt(id)) return navigate("/dang-nhap/nguoi-dung");
  }, []);

  return (
    <div className="appliedJobs">
      <div className="appliedJobs__wrapper">
        {loading ? (
          <Loader />
        ) : jobs?.length > 0 ? (
          jobs?.map((job, i) => <AppliedItem job={job} i={i} />)
        ) : (
          <NotFoundData />
        )}
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

function AppliedItem({ job, i }) {
  const [statusId, setStatusId] = useState();
  const [openModalRecall, setOpenModalRecall] = useState(false);
  const queryClient = useQueryClient();

  const getStatus = async () => {
    try {
      const res = await makeRequest.get(`apply/status?id=${job?.id}`);
      setStatusId(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["apply", job.id], () => {
    return getStatus();
  });

  const handleClickRecall = async () => {
    try {
      await makeRequest.delete(`apply?idJob=${job?.idJob}`);
      toast.success("Xóa đơn ứng tuyển thành công.");
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setOpenModalRecall(false);
  };

  const mutationRecall = useMutation(
    () => {
      return handleClickRecall();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applies"]);
      },
    }
  );

  const handleSubmitRecall = () => {
    setOpenModalRecall(false);
    mutationRecall.mutate();
  };

  return (
    <div key={i} className="appliedJobs__wrapper__item">
      <div className="col pc-9 t-9 m-12">
        <div className="appliedJobs__wrapper__item__left ">
          <div className="appliedJobs__wrapper__item__left__header">
            <img
              src={job?.avatarPic ? apiImage + job?.avatarPic : img}
              onError={(e) => (e.target.src = img)}
              alt=""
            />
            <div className="text">
              <Link to={`/viec-lam/${job?.idJob}`}>
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
      <div className="col pc-3 t-3 m-12">
        <div className="appliedJobs__wrapper__item__right">
          {/* / <span className="header">Trạng thái</span> */}
          <div className="button">
            {statusId === 1 && (
              <button className="button__recall" onClick={() => setOpenModalRecall(true)}>
                <i className="fa-solid fa-rotate-right"></i>
                <span>Hủy ứng tuyển</span>
              </button>
            )}
            {statusUser.map(
              (status) =>
                status.id === parseInt(statusId) &&
                statusId !== 1 && (
                  <div className={`status status-${statusId}`}>
                    {status?.icon}
                    <span className={statusId}>{status?.name}</span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      {
        <Modal
          title={"Xóa bài tuyển dụng"}
          openModal={openModalRecall}
          setOpenModal={setOpenModalRecall}
        >
          <div className="modal__sure">
            <h2>Bạn có chắc chắn muốn huỷ ứng tuyển việc làm này không ?</h2>
            <div className="modal__sure__footer">
              <button className="btn-cancel" onClick={() => setOpenModalRecall(false)}>
                Hủy
              </button>
              <button className="btn-submit" onClick={() => handleSubmitRecall()}>
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
}
