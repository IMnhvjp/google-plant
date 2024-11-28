'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Tag, Typography } from "antd";
import Image from "next/image";

const plantData = {
  "scientific_name": "Acacia auriculiformis",
  "english_name": null,
  "vietnamese_name": [
      "Keo bông vàng",
      "Keo lá tràm"
  ],
  "other_names": [],
  "division": "Magnoliophyta",
  "division_description": "Thực vật có hoa; Mộc lan; Hạt kín",
  "_class": "Magnoliopsida",
  "_class_description": "Hai lá mầm",
  "order": "Fabales",
  "order_description": "Đậu",
  "family": "Mimosaceae",
  "family_description": "Trinh nữ",
  "genus": "Acacia",
  "genus_description": "Keo, Sống rắn, Sóng rắng",
  "description": "Cây gỗ lớn, thường xanh, cao 5 - 25 m. Tán lớn, màu xanh thẫm; thân tròn thẳng; vỏ màu xám đen. Cuống dạng lá (diệp thể) có dạng như lá đơn, hình lưỡi hái, dài 7 - 17 cm, rộng 1,5 - 2,7 cm, dày, cứng, không lông; gân 6 - 8, hình cung song song.\nCụm hoa hình bông mọc ở nách lá; mỗi bông dài 4 - 8 cm, mang nhiều hoa nhỏ màu vàng. Hoa có 5 lá đài nhỏ hợp nhau ở gốc thành dạng chuông; 5 cánh hoa dài gấp đôi lá đài, nhiều nhị và bầu chứa nhiều noãn. Quả dẹt, mỏng, dài 7 - 8 cm, rộng 1,2 - 1,4 cm, có một cánh thấp dọc theo chỗ nối giữa 2 mảnh vỏ; hạt 5 - 7, màu nâu.\nCó nguồn gốc ở Ôxtrâylia, được nhập trồng ở nhiều tỉnh miền Nam của Việt Nam, từ Quảng Nam, Kon Tum, Gia Lai vào tới Kiên Giang.\nCây mọc nhanh, chịu hạn, ưa sáng, mọc được trên nhiều loại đất như đất pha cát ven biển, đất ba dan vàng đỏ, đất bồi tụ, đất phù sa cổ. Thích hợp với vùng có mùa khô 6 tháng và lượng mưa 1000 tới 2000 mm.\nRa hoa kết quả rải rác từ tháng 7 tới tháng 10, có thể là từ tháng 5 năm này đến tháng 3 năm sau tùy theo điều kiện tự nhiên của từng địa phương.\nCây được trồng dọc đường đi, công viên ở các thị xã, thành phố. Cũng đã được đưa vào trồng thành rừng có kết quả; được trồng làm cây che bóng và trồng ở ranh giới vườn ươm để tránh gió.\nCây cho gỗ lớn, thân dài và thẳng, gỗ màu vàng trắng có vân không rõ, dùng làm nhà cửa, đóng hòm, làm thùng xe…\nCũng dùng làm thuốc. Chống vài siêu khuẩn. Lá hạ hoạt thần kinh (Phạm Hoàng Hộ, 1999)."
}


const Search = () => {

//   const SearchMutaion = useMutation( {
//     mutationFn: async () => {

//     },
//     onSuccess: () => {

//     },
//     onError: () => {

//     }
//   })

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <Card
        title={
          <Typography.Title level={3} className="text-green-700">
            {plantData.scientific_name}
          </Typography.Title>
        }
        bordered={true}
        className="w-full max-w-3xl shadow-lg"
      >
        <div className="mb-4">
          <Typography.Title level={5}>Tên tiếng Việt:</Typography.Title>
          {plantData.vietnamese_name.map((name, index) => (
            <Tag color="green" key={index}>
              {name}
            </Tag>
          ))}
        </div>

        <div className="mb-4">
          <Typography.Title level={5}>Phân loại:</Typography.Title>
          <Typography.Paragraph>
            <strong>Ngành:</strong> {plantData.division} - {plantData.division_description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Lớp:</strong> {plantData._class} - {plantData._class_description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Bộ:</strong> {plantData.order} - {plantData.order_description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Họ:</strong> {plantData.family} - {plantData.family_description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Chi:</strong> {plantData.genus} - {plantData.genus_description}
          </Typography.Paragraph>
        </div>

        <div>
          <Typography.Title level={5}>Mô tả:</Typography.Title>
          <Typography.Paragraph>{plantData.description}</Typography.Paragraph>
        </div>
      </Card>
    </div>
  );

}

export default Search
