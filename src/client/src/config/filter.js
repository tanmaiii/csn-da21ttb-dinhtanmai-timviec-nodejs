const filter = [
    {
        displayName: 'Loại công việc',
        name: 'type',
        icon: <i class="fa-solid fa-briefcase"></i>,
        list: [
            {
                displayName: 'Toàn thời gian',
                id: 'toan_thoi_gian'
            },
            {
                displayName: 'Bán thời gian',
                id: 'ban_thoi_gian'
            },
            {
                displayName: 'Từ xa',
                id: 'tu_xa'
            },
        ]
    },
    {
        displayName: 'Cấp bậc',
        name: 'rank',
        icon: <i class="fa-solid fa-layer-group"></i>,
        list: [
            {
                displayName: 'Thực tập',
                id:'thuc_tap'
            },
            {
                displayName: 'Nhân viên',
                id:'nhan_vien'
            },
            {
                displayName: 'Trưởng phòng / Quản lý',
                id:'truong_phong&quan_ly'
            },
            {
                displayName: 'Giám đốc',
                id:'giam_doc'
            },
        ]
    },
    {
        displayName: 'Học vấn',
        name: 'academic',
        icon: <i class="fa-solid fa-graduation-cap"></i>,
        list: [
            {
                displayName: 'Sinh viên',
                id: 'sinh_vien'
            },
            {
                displayName: 'Đại học',
                id: 'dai_hoc'
            },
            {
                displayName: 'Cao đẳng',
                id: 'cao_dang'
            },
            {
                displayName: 'Thạc sĩ',
                id: 'thac_si'
            },
            {
                displayName: 'Tiến sĩ',
                id: 'tien_si'
            },
        ]
    },
]

export default filter