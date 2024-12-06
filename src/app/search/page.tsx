'use client'
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Typography, Pagination, Input, List, Card, Tag } from "antd";
import {config} from "../../config/config";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons"

interface Plant {
  scientific_name: string;
  english_name: string;
  vietnamese_name: string[];
  other_names: string[];
  division: string;
  division_description: string;
  _class: string;
  _class_description: string;
  order: string;
  order_description: string;
  family: string;
  family_description: string;
  genus: string;
  genus_description: string;
  description: string;
}

interface PlantResponse {
  id: string;
  score: number;
  totalResults: number;
  plant: Plant;
}

const { Title, Text } = Typography;

const Search = () => {
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('query'));
  const [pageNum, setPageNum] = useState<number>(1);
  const [dataPlant, setDataPlant] = useState<PlantResponse[]>([])
  // const [totalPage, setTotalPage] = useState(0)
  const router = useRouter();

  const queryClient = useQueryClient()

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/search_string/${page}?query=${query}`, {
        method: "GET",
      });
      const res = await response.json()
      setDataPlant(res)
      return res;
    }
    catch(e) {
      console.error("Error fetching data", e)
      return null
    }
  }

  const dataQuery = useQuery({
    queryKey: ['search'],
    queryFn: () => fetchData(pageNum),
  });


  if (dataQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(50vh)]">
        <LoadingOutlined className="text-6xl" />
      </div>
  )}

  const handlePageChange = async (page: number) => {
      await setPageNum(page);
      console.log(page)
      queryClient.invalidateQueries({ queryKey: ['search'] })
  }

  const handleSearch = async () => {
    if (query?.trim() !== "") {
      // router.push(`/search_string/1?query=${query}`)
      await setPageNum(1);
      await setQuery(query)
      queryClient.invalidateQueries({ queryKey: ['search'] })
    }
  };

  // const handleNavigateToDetail = (id: string) => {
  //   router.push(`/search/${id}`)
  // }

  const phan_loai = async () => {
    
  }

  return (
    <>
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex w-full max-w-3xl border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:shadow-md">
        {/* Input tìm kiếm */}
        <Input
          type="text"
          placeholder="Tìm kiếm thực vật..."
          className="flex-grow px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
          value={query || ''}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={handleSearch}
        />
      </div>
      {/* Hien thi ket qua */}
      <div className="mt-6">
        {dataPlant.map((data: { plant: Plant }, index: number) => (
          <Card
            key={index}
            title={<span className="text-lg font-bold">{data.plant.scientific_name}</span>}
            bordered={true}
            className="mb-6 shadow-md"
          >
            {data.plant.vietnamese_name && (
              <div className="mb-4">
                <Typography.Title level={5} className="mb-2">
                  Tên tiếng Việt:
                </Typography.Title>
                {data.plant.vietnamese_name.map((name: string, index: number) => (
                  <Tag color="green" key={index}>
                    {name}
                  </Tag>
                ))}
              </div>
            )}

            {data.plant.other_names[0] && (
              <div className="mb-4">
                <Typography.Title level={5} className="mb-2">
                  Tên khác:
                </Typography.Title>
                {data.plant.other_names.map((name: string, index: number) => (
                  <Tag color="volcano" key={index}>
                    {name}
                  </Tag>
                ))}
              </div>
            )}

            {data.plant.division && (
              <div className="mb-4">
                <Typography.Title level={5} className="mb-2">
                  Phân loại:
                </Typography.Title>
                <div>
                  <p>
                    <strong>Ngành:</strong> {data.plant.division} - {data.plant.division_description}
                  </p>
                  <p>
                    <strong>Lớp:</strong> {data.plant._class} - {data.plant._class_description}
                  </p>
                  <p>
                    <strong>Bộ:</strong> {data.plant.order} - {data.plant.order_description}
                  </p>
                  <p>
                    <strong>Họ:</strong> {data.plant.family} - {data.plant.family_description}
                  </p>
                  <p>
                    <strong>Chi:</strong> {data.plant.genus} - {data.plant.genus_description}
                  </p>
                </div>
              </div>
            )}

            {data.plant.description && (
              <div>
                <Typography.Title level={5} className="mb-2">
                  Mô tả:
                </Typography.Title>
                <p>{data.plant.description}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          total={dataPlant[0]?.totalResults || 0}
          pageSize={10}
          current={pageNum}
          onChange={handlePageChange}
          className="flex justify-center"
        />
      </div>
    </div>
    </>
  );

}

const SearchWrapper = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default SearchWrapper