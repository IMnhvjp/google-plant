'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Tag, Typography, Pagination, Input, Button, List } from "antd";
import { config } from "../../config/config";
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

const SearchContent = ({ initialQuery }: { initialQuery: string }) => {
  const [query, setQuery] = useState(initialQuery);
  const [pageNum, setPageNum] = useState<number>(1);
  const [dataPlant, setDataPlant] = useState<PlantResponse[]>([])
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
    catch(err) {
      console.error("Error fetching data")
      return null
    }
  }

  const dataQuery = useQuery({
    queryKey: ['search', pageNum, query],
    queryFn: () => fetchData(pageNum),
  });

  if (dataQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(50vh)]">
        <LoadingOutlined className="text-6xl" />
      </div>
    )
  }

  const handlePageChange = async (page: number, pageSize: number) => {
    setPageNum(page);
    queryClient.invalidateQueries({ queryKey: ['search'] })
  }

  const handleSearch = async () => {
    if (query.trim() !== "") {
      setPageNum(1);
      queryClient.invalidateQueries({ queryKey: ['search'] })
    }
  };

  const handleNavigateToDetail = (id: string) => {
    router.push(`/search/${id}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex w-full max-w-3xl border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:shadow-md">
        <Input
          type="text"
          placeholder="Tìm kiếm thực vật..."
          className="flex-grow px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={handleSearch}
        />
        
        <button
          className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none shadow-sm "
          onClick={handleSearch}
        >
          <span className="text-xl"><SearchOutlined /></span>
        </button>
      </div>

      {dataPlant.length > 0 && (
        <div className="text-indigo-500 mt-4 mb-4">
          Đã tìm thấy {dataPlant[0].totalResults} kết quả!
        </div>
      )}

      <List
        bordered
        dataSource={dataPlant}
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
              <Text type="secondary" className="text-sm">
                Ngành: {item.plant.division_description} - Lớp: {item.plant._class_description} - Bộ: {item.plant.order_description} - Họ: {item.plant.family_description} - Chi: {item.plant.genus_description}
              </Text>
            </div>
          </List.Item>
        )}
      />

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
  );
}

export default SearchContent;