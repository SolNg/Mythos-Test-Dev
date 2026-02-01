
import { Lorebook } from "../services/ai/lorebook/types";

// LSR Table Preset v2.0.15 Data
export const LSR_PRESET: Lorebook = {
  "entries": {
    "0": {
      "key": [],
      "keysecondary": [],
      "comment": "===Hướng dẫn (Giữ ở trạng thái tắt)===",
      "content": "**Một preset bảng tăng cường trí nhớ tương đối nhẹ...**",
      "constant": true,
      "disable": true, // Disabled by default per instructions
      "order": 2000,
      "uid": 0
    },
    "1": {
      "key": [],
      "keysecondary": [],
      "comment": "Xử lý tham số",
      "content": "<%_ //Logic xử lý tham số phức tạp... _%>",
      "constant": true,
      "disable": false,
      "order": 2000,
      "uid": 1
    },
    "2": {
      "key": [],
      "keysecondary": [],
      "comment": "Tham số cấu hình",
      "content": "Set defaults...",
      "constant": true,
      "disable": false,
      "order": 2000,
      "uid": 2
    },
    "4": {
      "key": [],
      "keysecondary": [],
      "comment": "Prompt của bảng",
      "content": "<memory_table_guide>\nBảng trí nhớ định dạng CSV được lưu trong <table_stored> chứa dữ liệu...\n<table_format>\n...\n</table_format>\n</memory_table_guide>\n<table_stored>\nBảng trí nhớ hiện đang được lưu trữ mà phản hồi của bạn cần dựa vào:\n{{tableData}}\n</table_stored>",
      "constant": true,
      "disable": false,
      "order": 1000,
      "uid": 4
    },
    "6": {
      "key": [],
      "keysecondary": [],
      "comment": "Nhấn mạnh sau cùng",
      "content": "<table_rule>\n# Lưu ý về thao tác bảng\n## Cấu trúc bảng\n#0 Thông tin Hiện tại|0:Thời gian ({{getvar::tableConfigDateFormat}})|1:Địa điểm\n#1 Thông tin Nhân vật|0:Tên nhân vật|1:Giới tính|2:Tuổi|3:Thân phận|4:Đặc điểm cơ thể|5:Phong cách thời trang|6:Tính cách|7:Sở thích|8:Mục tiêu dài hạn|9:Mối quan hệ|10:Thái độ với <user>|11:Quan hệ giữa các nhân vật|12:Vai trò bối cảnh|13:Ghi chú quan trọng\n#2 Thông tin Tình dục|0:Tên nhân vật|1:Bộ phận nhạy cảm|2:Lần đầu (Y/N/Chi tiết)|3:Kỹ năng thành thạo|4:Chi tiết bộ phận tư mật|5:Đối tượng gần đây|6:Ghi chú\n#3 Lịch trình|0:Tóm tắt|1:Nội dung tổng thể|2:Tiến độ hiện tại|3:Người thực hiện|4:Người ủy thác|5:Phần thưởng|6:Địa điểm|7:Thời gian bắt đầu|8:Thời gian kết thúc/Hạn chót|9:Ghi chú\n#4 Năng lực|0:Tên năng lực|1:Người sở hữu|2:Cách dùng/Hiệu quả|3:Hạn chế|4:Ghi chú\n#5 Kho đồ (Inventory)|0:Tên vật phẩm|1:Người sở hữu|2:Vị trí hiện tại|3:Số lượng|4:Hình thái/Bề ngoài|5:Công dụng|6:Hạn chế|7:Ghi chú\n#6 Tổ chức|0:Tên tổ chức|1:Cấu trúc thành viên|2:Đặc điểm thành viên|3:Mục đích|4:Ghi chú\n#7 Địa điểm|0:Tên địa điểm|1:Vị trí/Tọa độ|2:Cấu trúc không gian|3:Ghi chú\n#8 Tổng kết Lớn (Major Summary)|0:Phạm vi thời gian|1:Nội dung\n#9 Lịch sử Sự kiện|0:Thời gian|1:Địa điểm|2:Diễn biến sự kiện\n\n<format_request>\nBạn phải dựa vào các yêu cầu liên quan và nội dung của <table_stored>, hoàn thành <tableThink>, <tableEdit>...\n</format_request>",
      "constant": true,
      "disable": false,
      "order": 1000,
      "uid": 6
    }
  }
};
