'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Tag, Typography, Pagination, Input, Button, List } from "antd";
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
  
  const [query, setQuery] = useState(String(useSearchParams().get('query')))
  const [pageNum, setPageNum] = useState<number>(1);
  // const [data, setData] = useState<PlantResponse[]>([])
  // const [totalPage, setTotalPage] = useState(0)
  const router = useRouter();

  const queryClient = useQueryClient()

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/search_string/${page}?query=${query}`, {
        method: "GET",
      });
      return response.json();
    }
    catch(err) {
      console.error("Error fetching data")
      return null
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', pageNum],
    queryFn: () => fetchData(pageNum),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(50vh)]">
        <LoadingOutlined className="text-6xl" />
      </div>
  )}

  const handlePageChange = (page: number, pageSize: number) => {
    if (pageNum !== page) {
      setPageNum(page);
    }
  }

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?query=${query}`)
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
          value={query}
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
        dataSource={data}
        renderItem={(item: any) => (
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
          total={data[0]?.totalResults || 0}
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

export default Search