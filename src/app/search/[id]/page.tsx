'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Tag, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons"
import {config} from "../../../config/config";

type PlantDataType = {
  scientific_name: string;
  english_name: string | null;
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
};


const PlantDetail = () => {

  const path = usePathname();
  const [plantData, setPlantData] = useState<PlantDataType>();
  const [plantId, setPlantId] = useState(String(path.split("/")[2]))


  const detail = useQuery({
    queryKey: ['detail'],
    queryFn: async () => {
        try {
          console.log(plantId)
          const res = await fetch(`${config.apiUrl}/${plantId}`, {
            method: "GET"
          })
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          else {
            const data = await res.json();
            setPlantData(data);
            return data;
          }
        } catch (error) {
          console.log('loi server');
          return null;
        }
    }
  })

  return (
    detail?.data ? (
      <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
        <Card
          title={
            <Typography.Title level={3} className="text-green-700">
              {detail?.data.scientific_name}
            </Typography.Title>
          }
          bordered={true}
          className="w-full max-w-3xl shadow-lg"
        >
          <div className="mb-4">
            <Typography.Title level={5}>Tên tiếng Việt:</Typography.Title>
            {detail?.data.vietnamese_name.map((name: string, index: number) => (
              <Tag color="green" key={index}>
                {name}
              </Tag>
            ))}
          </div>

          <div className="mb-4">
            <Typography.Title level={5}>Phân loại:</Typography.Title>
            <Typography.Paragraph>
              <strong>Ngành:</strong> {detail?.data.division} - {detail?.data.division_description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Lớp:</strong> {detail?.data._class} - {detail?.data._class_description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Bộ:</strong> {detail?.data.order} - {detail?.data.order_description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Họ:</strong> {detail?.data.family} - {detail?.data.family_description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Chi:</strong> {detail?.data.genus} - {detail?.data.genus_description}
            </Typography.Paragraph>
          </div>

          <div>
            <Typography.Title level={5}>Mô tả:</Typography.Title>
            <Typography.Paragraph>{detail?.data.description}</Typography.Paragraph>
          </div>
        </Card>
      </div>
    )
    : <div className="flex justify-center items-center h-[calc(50vh)]">
        <LoadingOutlined className="text-6xl" />
      </div>);

}

export default PlantDetail
