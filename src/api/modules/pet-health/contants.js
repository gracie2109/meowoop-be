// tổng quan sức khỏe
export const PET_HEALTH_OVERALL_KEY = {
  HEALTHY: 0,
  NEED_ATTENTION: 1,
  CRITICAL: 2,
};

export const PET_HEALTH_OVERALL_DATA = [
  {
    key: PET_HEALTH_OVERALL_KEY.HEALTHY,
    label: "Khỏe mạnh",
  },
  {
    key: PET_HEALTH_OVERALL_KEY.NEED_ATTENTION,
    label: "Cần chú ý",
  },
  {
    key: PET_HEALTH_OVERALL_KEY.HEALTHY,
    label: "Nghiêm trọng",
  },
];

// kiểu khám
export const EXAMINATION_TYPE_KEY = {
  VACCINATION: "vaccination",
  EXAMINATION: "examination",
  TREATMENT: "treatment",
  SURGERY: "surgery",
  MEASUREMENT: "measurement",
  MEDICATION: "medication",
  LAB_TEST: "lab_test",
  FOLLOW_UP: "follow_up",
  EMERGENCY: "emergency",
  NUTRITION: "nutrition",
  DEWORMING: "deworming",
  GROOMING: "grooming",
  OTHER: "other",
};

export const EXAMINATION_TYPE_DATA = [
  {
    key: EXAMINATION_TYPE_KEY.VACCINATION,
    label: "Tiêm chủng",
  },
  {
    key: EXAMINATION_TYPE_KEY.EXAMINATION,
    label: "Khám tổng quát / khám định kỳ",
  },
  {
    key: EXAMINATION_TYPE_KEY.TREATMENT,
    label: "Điều trị bệnh",
  },
  {
    key: EXAMINATION_TYPE_KEY.SURGERY,
    label: "Phẫu thuật",
  },
  {
    key: EXAMINATION_TYPE_KEY.MEASUREMENT,
    label: "Đo chỉ số (cân nặng, nhiệt độ...)",
  },
  {
    key: EXAMINATION_TYPE_KEY.MEDICATION,
    label: "Cấp thuốc",
  },

  {
    key: EXAMINATION_TYPE_KEY.LAB_TEST,
    label: "Xét nghiệm / chẩn đoán hình ảnh",
  },
  {
    key: EXAMINATION_TYPE_KEY.FOLLOW_UP,
    label: "Tái khám",
  },
  {
    key: EXAMINATION_TYPE_KEY.EMERGENCY,
    label: "Cấp cứu",
  },
  {
    key: EXAMINATION_TYPE_KEY.NUTRITION,
    label: "Tư vấn dinh dưỡng",
  },
  {
    key: EXAMINATION_TYPE_KEY.DEWORMING,
    label: "Tẩy giun / diệt ve",
  },
  {
    key: EXAMINATION_TYPE_KEY.GROOMING,
    label: "Chăm sóc - làm đẹp",
  },
  {
    key: EXAMINATION_TYPE_KEY.OTHER,
    label: "Khác",
  },
];

export const APPOIMENT_REASON_CODE = [
  {
    code: "ROUTINE",
    system: "http://terminology.hl7.org/CodeSystem/v2-0276",
    display: {
      en: "Routine appointment",
      vi: "Lịch hẹn định kỳ",
    },
    definition: {
      en: "Routine appointment - default if not valued",
      vi: "Cuộc hẹn định kỳ - mặc định nếu không được chỉ định",
    },
  },
  {
    code: "WALKIN",
    system: "http://terminology.hl7.org/CodeSystem/v2-0276",
    display: {
      en: "Walk-in visit",
      vi: "Lượt khám không hẹn trước",
    },
    definition: {
      en: "A previously unscheduled walk-in visit",
      vi: "Một lượt khám không có lịch hẹn trước đó",
    },
  },
  {
    code: "CHECKUP",
    system: "http://terminology.hl7.org/CodeSystem/v2-0276",
    display: {
      en: "Routine check-up",
      vi: "Khám định kỳ",
    },
    definition: {
      en: "A routine check-up, such as an annual physical",
      vi: "Khám sức khỏe định kỳ, ví dụ như khám tổng quát hàng năm",
    },
  },
  {
    code: "FOLLOWUP",
    system: "http://terminology.hl7.org/CodeSystem/v2-0276",
    display: {
      en: "Follow-up visit",
      vi: "Tái khám",
    },
    definition: {
      en: "A follow up visit from a previous appointment",
      vi: "Lịch khám tái khám từ một cuộc hẹn trước đó",
    },
  },
  {
    code: "EMERGENCY",
    system: "http://terminology.hl7.org/CodeSystem/v2-0276",
    display: {
      en: "Emergency appointment",
      vi: "Lịch hẹn khẩn cấp",
    },
    definition: {
      en: "Emergency appointment",
      vi: "Cuộc hẹn khẩn cấp",
    },
  },
];

export const APPOIMENT_PRIORITY = [
  {
    code: "A",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "ASAP", vi: "Càng sớm càng tốt" },
    definition: {
      en: "As soon as possible, next highest priority after stat.",
      vi: "Càng sớm càng tốt, chỉ sau mức ưu tiên 'stat'.",
    },
  },
  {
    code: "CR",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "callback results", vi: "gọi lại khi có kết quả" },
    definition: {
      en: "Filler should contact the placer as soon as results are available, even for preliminary results.",
      vi: "Bên thực hiện nên liên hệ với bên đặt dịch vụ ngay khi có kết quả, kể cả là kết quả sơ bộ.",
    },
  },
  {
    code: "EL",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "elective", vi: "tự chọn" },
    definition: {
      en: "Beneficial to the patient but not essential for survival.",
      vi: "Có lợi cho bệnh nhân nhưng không thiết yếu để sống sót.",
    },
  },
  {
    code: "EM",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "emergency", vi: "khẩn cấp" },
    definition: {
      en: "An unforeseen combination of circumstances or the resulting state that calls for immediate action.",
      vi: "Trường hợp bất ngờ hoặc trạng thái cần hành động ngay lập tức.",
    },
  },
  {
    code: "P",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "preop", vi: "trước phẫu thuật" },
    definition: {
      en: "Used to indicate that a service is to be performed prior to a scheduled surgery.",
      vi: "Chỉ định dịch vụ thực hiện trước một ca phẫu thuật đã lên lịch.",
    },
  },
  {
    code: "PRN",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "as needed", vi: "khi cần" },
    definition: {
      en: "An 'as needed' order should be accompanied by a description of what constitutes a need.",
      vi: "Lệnh 'khi cần' nên kèm theo mô tả cụ thể khi nào là cần thiết.",
    },
  },
  {
    code: "R",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "routine", vi: "định kỳ" },
    definition: {
      en: "Routine service, do at usual work hours.",
      vi: "Dịch vụ thông thường, thực hiện trong giờ làm việc tiêu chuẩn.",
    },
  },
  {
    code: "RR",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "rush reporting", vi: "báo cáo gấp" },
    definition: {
      en: "A report should be prepared and sent as quickly as possible.",
      vi: "Báo cáo cần được chuẩn bị và gửi càng nhanh càng tốt.",
    },
  },
  {
    code: "S",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "stat", vi: "ngay lập tức" },
    definition: {
      en: "With highest priority (e.g., emergency).",
      vi: "Ưu tiên cao nhất (ví dụ: tình huống khẩn cấp).",
    },
  },
  {
    code: "T",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "timing critical", vi: "thời gian rất quan trọng" },
    definition: {
      en: "It is critical to come as close as possible to the requested time.",
      vi: "Cần thực hiện gần nhất với thời điểm được yêu cầu (ví dụ: đo nồng độ kháng sinh).",
    },
  },
  {
    code: "UD",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "use as directed", vi: "dùng theo chỉ định" },
    definition: {
      en: "Drug to be used as directed by the prescriber.",
      vi: "Thuốc được sử dụng theo hướng dẫn của người kê đơn.",
    },
  },
  {
    code: "UR",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "urgent", vi: "khẩn trương" },
    definition: {
      en: "Calls for prompt action.",
      vi: "Yêu cầu hành động nhanh chóng.",
    },
  },
  {
    code: "CS",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: { en: "callback for scheduling", vi: "gọi lại để đặt lịch" },
    definition: {
      en: "Filler should contact the placer to schedule the service.",
      vi: "Bên thực hiện nên gọi lại cho bên đặt để sắp xếp lịch dịch vụ.",
    },
  },
  {
    code: "CSP",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: {
      en: "callback placer for scheduling",
      vi: "gọi bên đặt để lên lịch",
    }, 
    definition: {
      en: "Filler should contact the placer to schedule the service.",
      vi: "Bên thực hiện nên gọi bên đặt để hẹn lịch dịch vụ.",
    },
  },
  {
    code: "CSR",
    system: "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    display: {
      en: "contact recipient for scheduling",
      vi: "liên hệ người nhận để lên lịch",
    },
    definition: {
      en: "Filler should contact the service recipient to schedule the service.",
      vi: "Bên thực hiện nên liên hệ với người nhận dịch vụ để sắp lịch.",
    },
  },
];
export const DEFAULT_PRIORITY = "CS";
