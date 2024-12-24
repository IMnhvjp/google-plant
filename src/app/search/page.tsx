'use client'
import { Suspense, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Typography, Pagination, Input, Card, Tag } from "antd";
import {config} from "../../config/config";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons"
import Description from "../components/description"

interface Plant {
  url: string;
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
  other_info: string;
}

interface OtherInfo {
  [key: string]: string | string[];  
}


interface PlantResponse {
  id: string;
  score: number;
  totalResults: number;
  plant: Plant;
}

const Search = () => {
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('query'));
  const [pageNum, setPageNum] = useState<number>(1);
  const [dataPlant, setDataPlant] = useState<PlantResponse[]>([])
  const [isExpanded, setIsExpanded] = useState(false);
  // const [totalPage, setTotalPage] = useState(0)
  // const router = useRouter();

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          className="px-6 py-3" style={{color:"blue"}}
          onClick={handleSearch}
        >
          <span className="text-xl"><SearchOutlined /></span>
        </button>
      </div>
      {/* Hien thi ket qua */}
      <div className="mt-6">
          {dataPlant.map((data: { plant: Plant }, index: number) => {
            let otherInfo :OtherInfo = {} ;
            try {
              otherInfo = data.plant.other_info ? JSON.parse(data.plant.other_info) : {};
              console.log(otherInfo)
            } catch (e) {
              console.error("Lỗi khi phân tích cú pháp JSON:", e);
            }

            return (
              <Card
                key={index}
                title={<span className="text-lg font-bold" style={{ color: "darkorange" }}>{data.plant.scientific_name || ""}</span>}
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

                {data.plant.other_names && data.plant.other_names[0] && (
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

                {/* {data.plant.description && (
                  <div>
                    <Typography.Title level={5} className="mb-2">
                      Mô tả:
                    </Typography.Title>
                    <p>{(data.plant.description.length > 1100) ? data.plant.description.slice(0, 1100) + "..." : data.plant.description}</p>
                  </div>
                )} */}
                <Description data={data.plant.description}/>

                {Object.keys(otherInfo).length > 0 && (
                  <div>
                    <Typography.Title level={5} className="mb-2 mt-4">
                      Thông tin khác:
                    </Typography.Title>
                    <ul style={{listStyleType: "disc",paddingLeft: "20px"}}>
                    {Object.keys(otherInfo).map((key) => (
                      <li key={key}>
                        <strong>{key}:</strong> 
                        {Array.isArray(otherInfo[key]) ? otherInfo[key].join(", ") : otherInfo[key]}
                      </li>
                    ))}

                    </ul>
                  </div>
                )}
                {data.plant.url && 
                  (<div className='mt-4'>
                    <strong>Link:</strong>
                    <a
                      href={data.plant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700 ml-2 inline"
                    >
                      {data.plant.url}
                    </a>
                  </div>)}
              </Card>
            );
          })}
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