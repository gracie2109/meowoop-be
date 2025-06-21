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
