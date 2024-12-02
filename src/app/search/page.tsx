'use client'
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Typography, Pagination, Input, List } from "antd";
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

  const handleNavigateToDetail = (id: string) => {
    router.push(`/search/${id}`)
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
        
        <button
          className="px-6 py-3"
          onClick={handleSearch}
        >
          <span className="text-xl"><SearchOutlined /></span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
      </h1>

      {/* Danh sách kết quả tìm kiếm */}
      <List
        bordered
        dataSource={dataPlant}
        renderItem={(item: PlantResponse) => (
          <List.Item className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
            <div>
              <Title
                level={4}
                className="mb-2 cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleNavigateToDetail(item.id)}
              >
                {item.plant.scientific_name} {item.plant.vietnamese_name[0] ? `- ${item.plant.vietnamese_name[0]}` : ""}
              </Title>
              {/* Mô tả */}
              <Text type="secondary" className="text-sm">
                Ngành: {item.plant.division_description} - Lớp: {item.plant._class_description} - Bộ: {item.plant.order_description} - Họ: {item.plant.family_description} - Chi: {item.plant.genus_description}
              </Text>
            </div>
          </List.Item>
        )}
      />

      {/* Phân trang */}
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