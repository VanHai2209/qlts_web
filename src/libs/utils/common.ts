export const notEmptyMessage = (fieldName: string) => {
  return `${fieldName} không được để trống`;
};

export const maxLengthMessage = (fieldName: string, maxLength = 255) => {
  return `${fieldName} không được để trống và không được quá ${maxLength} ký tự`;
};
