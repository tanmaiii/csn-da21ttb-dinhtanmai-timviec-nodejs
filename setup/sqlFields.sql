SELECT * FROM job.fields;

INSERT INTO job.fields (name, typeField) 

VALUES( 'Biên phiên dịch / Thông dịch viên', 'Bộ phân hổ trợ'),
( 'Nhân sự', 'Bộ phân hổ trợ'),
( 'Pháp lý / Luật', 'Bộ phân hổ trợ'),
( 'Thư ký / Hành Chính', 'Bộ phân hổ trợ'),
( 'An ninh / Bảo vệ', 'Dịch vụ'),
( 'Bán lẻ / Bán sỉ', 'Dịch vụ'),
( 'Chăm sóc sức khỏe / Y tế', 'Dịch vụ'),
( 'Dịch vụ khách hàng', 'Dịch vụ'),
( 'Giáo dục / Đào tạo / Thư viện', 'Dịch vụ'),
( 'Phi chính phủ / Phi lợi nhuận', 'Dịch vụ');

INSERT INTO job.fields (name, typeField) 
VALUES
( 'Bảo hiểm', 'Dịch vụ tài chính'),
( 'Kế toán / Kiểm toán', 'Dịch vụ tài chính'),
( 'Ngân hàng / Chứng khoán', 'Dịch vụ tài chính'),
( 'Tài chính / Đầu tư', 'Dịch vụ tài chính'),

( 'Bán hàng / Kinh doanh', 'Dịch vụ khách hàng'),
( 'Hàng gia dụng', 'Dịch vụ khách hàng'),
( 'Quảng cáo / Đối ngoại', 'Dịch vụ khách hàng'),
( 'Thời trang', 'Dịch vụ khách hàng'),
( 'Tiếp thị', 'Dịch vụ khách hàng'),
( 'Tư vấn', 'Dịch vụ khách hàng');

INSERT INTO job.fields (name, typeField) 
VALUES
( 'Quảng lý chất lượng', 'Hổ trợ sản xuất'),
( 'Vận chuyển / Giao hàng / Kho bãi', 'Hổ trợ sản xuất'),
( 'Vật tư / Thu mua', 'Hổ trợ sản xuất'),
( 'Xuất nhập khẩu / Ngoại thương', 'Hổ trợ sản xuất'),
( 'CNTT - Phần mềm', 'Công nghệ thông tin'),
( 'CNTT - Phần cứng / Mạng', 'Công nghệ thông tin'),
( 'Du lịch', 'Khách sạn / Du lịch'),
( 'Khách sạn', 'Khách sạn / Du lịch'),
( 'Nhà hàng / Dịch vụ ăn uống', 'Khách sạn / Du lịch');

INSERT INTO job.fields (name, typeField) 
VALUES
( 'Bảo trì / Sửa chữa', 'Kỹ thuật'),
( 'Điên lạnh / Nhiệt lạnh', 'Kỹ thuật'),
( 'Dược / Sinh học', 'Kỹ thuật'),
( 'Điện / Điện tử', 'Kỹ thuật'),
( 'Kỹ thuật ứng dụng / Cơ khí', 'Kỹ thuật'),
( 'Môi trường / Xử lý chất thải', 'Kỹ thuật'),
( 'An toàn lao động', 'Sản xuất'),
( 'Dầu khí / Khoáng sản', 'Sản xuất'),
( 'Dệt may / Da giày', 'Sản xuất'),
( 'Đồ gỗ', 'Sản xuất'),
( 'Hóa chất / Sinh hóa / Thực phẩm', 'Sản xuất'),
( 'Nông nghiệp / Lâm nghiệp', 'Sản xuất'),
( 'Ô tô', 'Sản xuất'),
( 'Sản xuất / Vận hành sản xuất', 'Sản xuất'),
( 'Thủy hải sản', 'Sản xuất');

INSERT INTO job.fields (name, typeField) 
VALUES
( 'Bất động sản', 'Xây dựng / Bất động sản'),
( 'Kiến trúc', 'Xây dựng / Bất động sản'),
( 'Nội thất / Ngoại thất', 'Xây dựng / Bất động sản'),
( 'Xây dựng', 'Xây dựng / Bất động sản'),
( 'Báo chí / Biên tập viên / Xuất bản', 'Truyền thông'),
( 'Nghệ thuật / Thiết kế', 'Truyền thông'),
( 'Viễn thông', 'Truyền thông'),
( 'Lao động phổ thông', 'Theo đối tượng'),
( 'Mới tốt nghiệp / Thực tập', 'Theo đối tượng'),
( 'Người nước ngoài', 'Theo đối tượng'),
( 'Quản lý điều hành', 'Theo đối tượng'),
( 'Khác', 'Khác');


DELETE FROM fields;