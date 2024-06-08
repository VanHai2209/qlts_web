import { request } from "@/libs/request";
import { IDepartment } from "@/libs/types/category";
import { useQuery } from "@tanstack/react-query";

interface Props {
  initialData: IDepartment[];
}

export const useGetDepartment = ({ initialData }: Props) => {
  return useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
    initialData: initialData,
  });
};
