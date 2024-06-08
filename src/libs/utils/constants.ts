export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum STATUS_ASSET {
  USED = "Được sử dụng",
  READY_TO_USE = "Sẵn sàng sử dụng",
  MAINTENANCE = "Bảo trì",
  LIQUIDATION = "Thanh lý",
}

export enum STATUS_DEPARTMENT {
  USED = "Được sử dụng",
  READY_TO_USE = "Sẵn sàng sử dụng",
  MAINTENANCE = "Bảo trì",
  HIRING = "Đang thuê",
}

export const STATUS_DEPARTMENT_OBJ = {
  USED: "Được sử dụng",
  READY_TO_USE: "Sẵn sàng sử dụng",
  HIRING: "Đang thuê",
  MAINTENANCE: "Bảo trì",
};

export enum CONDITION_ASSET {
  GOOD = "Tốt",
  BAD = "Xuống cấp",
  BROKEN = "Hư hỏng",
}

export const STATUS_ASSET_OBJ = {
  USED: "Được sử dụng",
  READY_TO_USE: "Sẵn sàng sử dụng",
  MAINTENANCE: "Bảo trì",
  LIQUIDATION: "Thanh lý",
};

export const STATUS = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

export const COLOR_STATUS = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
};
