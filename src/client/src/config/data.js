export const typeWorks = [
  { id: 1, name: "Nhân viên chính thức" },
  { id: 2, name: "Bán thời gian" },
  { id: 3, name: "Tự do" },
  { id: 4, name: "Thực tập" },
];

export const educationJob = [
  {
    id: 1,
    name: "Không yêu cầu",
    value: "Không yêu cầu",
  },
  {
    id: 2,
    name: "Đại học",
    value: "Đại học",
  },
  {
    id: 3,
    name: "Cao đẳng",
    value: "Cao đẳng",
  },
  {
    id: 4,
    name: "Trung cấp",
    value: "Trung cấp",
  },
  {
    id: 5,
    name: "Trung học",
    value: "Trung học",
  },
];

export const experienceJob = [
  {
    id: 1,
    name: "Không yêu cầu",
  },
  {
    id: 2,
    name: "1 năm",
  },
  {
    id: 3,
    name: "1 - 2 năm",
  },
  {
    id: 4,
    name: "2 - 5 năm",
  },
  {
    id: 5,
    name: "5 - 10 năm",
  },
  {
    id: 6,
    name: "Trên 10 năm",
  },
];

export const scale = [
  {
    value: "10",
    label: "ít hơn 10 nhân viên",
    name: "ít hơn 10",
  },
  {
    value: "10-20",
    label: "10 - 20 nhân viên",
    name: "10 - 20",
  },
  {
    value: "20-100",
    label: "20 - 100 nhân viên",
    name: "20 - 100",
  },
  {
    value: "100-500",
    label: "100 - 500 nhân viên",
    name: "100 - 500",
  },
  {
    value: "500-1000",
    label: "500 - 1000 nhân viên",
    name: "500 - 1000",
  },
  {
    value: "1000-5000",
    label: "1000 - 5000 nhân viên",
    name: "1000 - 5000",
  },
  {
    value: "5000",
    label: "nhiều hơn 5000 nhân viên",
    name: "nhiều hơn 5000",
  },
];

export const statusUser = [
  {
    id: 1,
    icon: <i className="fa-regular fa-envelope"></i>,
    value: "Đã gửi hồ sơ",
    label: "Đã gửi hồ sơ",
    name: "Đã gửi hồ sơ",
  },
  {
    id: 2,
    icon: <i className="fa-regular fa-eye"></i>,
    value: "Đã xem hồ sơ",
    label: "Đã xem hồ sơ",
    name: "Đã xem hồ sơ",
  },
  {
    id: 3,
    icon: <i className="fa-solid fa-clipboard-question"></i>,
    value: "Phỏng vấn",
    label: "Phỏng vấn",
    name: "Phỏng vấn",
  },
  {
    id: 4,
    icon: <i className="fa-regular fa-circle-xmark"></i>,
    value: "Từ chối",
    label: "Từ chối",
    name: "Từ chối",
  },
  {
    id: 5,
    icon: <i className="fa-regular fa-circle-check"></i>,
    value: "Chấp nhận",
    label: "Chấp nhận",
    name: "Chấp nhận",
  },
];

export const statusCompany = [
  {
    id: 1,
    icon: <i className="fa-regular fa-eye-slash"></i>,
    value: "Chưa xem",
    label: "Chưa xem",
    name: "Chưa xem",
  },
  {
    id: 2,
    icon: <i className="fa-regular fa-eye"></i>,
    value: "Đã xem",
    label: "Đã xem",
    name: "Đã xem",
  },
  {
    id: 3,
    icon: <i className="fa-solid fa-clipboard-question"></i>,
    value: "Phỏng vấn",
    label: "Phỏng vấn",
    name: "Phỏng vấn",
  },
  {
    id: 4,
    icon: <i className="fa-regular fa-circle-xmark"></i>,
    value: "Từ chối",
    label: "Từ chối",
    name: "Từ chối",
  },
  {
    id: 5,
    icon: <i className="fa-regular fa-circle-check"></i>,
    value: "Chấp nhận",
    label: "Chấp nhận",
    name: "Chấp nhận",
  },
];

export const sexData = [
  { id: 1, name: "sex", value: "Nam" },
  { id: 2, name: "sex", value: "Nữ" },
  { id: 3, name: "sex", value: "Cả hai" },
];

export const categories = [
  {
    link: "?field[]=Dịch vụ khách hàng",
    text: "Dịch vụ khách hàng",
    icon: "/icon/service.png",
  },
  {
    link: "?field[]=Giáo dục / Đào tạo / Thư viện",
    text: "Giáo dục / Đào tạo / Thư viện",
    icon: "/icon/teacher.png",
  },
  {
    link: "?field[]=Bảo hiểm",
    text: "Bảo hiểm",
    icon: "/icon/insurance.png",
  },
  {
    link: "?field[]=Kế toán / Kiểm toán",
    text: "Kế toán / Kiểm toán",
    icon: "/icon/accounts.png",
  },
  {
    link: "?field[]=Ngân hàng / Chứng khoán",
    text: "Ngân hàng / Chứng khoán",
    icon: "/icon/stock-market.png",
  },
  {
    link: "?field[]=Tài chính / Đầu tư",
    text: "Tài chính / Đầu tư",
    icon: "/icon/investment.png",
  },
  {
    link: "?field[]=Bán hàng / Kinh doanh",
    text: "Bán hàng / Kinh doanh",
    icon: "/icon/sell.png",
  },
  {
    link: "?field[]=Hàng gia dụng",
    text: "Hàng gia dụng",
    icon: "/icon/detergent.png",
  },
  {
    link: "?field[]=Quảng cáo / Đối ngoại",
    text: "Quảng cáo / Đối ngoại",
    icon: "/icon/bullhorn.png",
  },
  {
    link: "?field[]=Thời trang",
    text: "Thời trang",
    icon: "/icon/fashion.png",
  },
  {
    link: "?field[]=Tiếp thị",
    text: "Tiếp thị",
    icon: "/icon/seo.png",
  },
  {
    link: "?field[]=Tư vấn",
    text: "Tư vấn",
    icon: "/icon/center.png",
  },
  {
    link: "?field[]=Quản lý chất lượng",
    text: "Quản lý chất lượng",
    icon: "/icon/management.png",
  },
  {
    link: "?field[]=Vận chuyển / Giao hàng / Kho bãi",
    text: "Vận chuyển / Giao hàng / Kho bãi",
    icon: "/icon/truck.png",
  },
  {
    link: "?field[]=Xuất nhập khẩu / Ngoại thương",
    text: "Xuất nhập khẩu / Ngoại thương",
    icon: "/icon/export.png",
  },
  {
    link: "?field[]=CNTT - Phần mềm",
    text: "CNTT - Phần mềm",
    icon: "/icon/code.png",
  },
  {
    link: "?field[]=Chăm sóc sức khỏe / Y tế",
    text: "Chăm sóc sức khỏe / Y tế",
    icon: "/icon/healthcare.png",
  },
];
