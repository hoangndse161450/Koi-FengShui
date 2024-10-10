
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPointResult = () => {
  const location = useLocation(); 
  const { koiPoint, totalPoint, element, direction } = location.state || { koiPoint: [], totalPoint: 0, element: [], direction:"" };

  const elementColorsP = {
    "Hỏa": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-HOA.jpg", 
    "Thủy": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THUY.jpg", 
    "Mộc": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-MOC.jpg", 
    "Kim": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-KIM.jpg", 
    "Thổ": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THO.jpg" 
  };
  const elementColorsC = {
    "Hỏa": "red-500", 
    "Thủy": "blue-500", 
    "Mộc": "green-500", 
    "Kim": "gray-300", 
    "Thổ": "yellow-500" 
  };

  const elementColorsT = {
    "Hỏa": "bg-red-600", 
    "Thủy": "bg-blue-600", 
    "Mộc": "bg-green-600", 
    "Kim": "bg-gray-300", 
    "Thổ": "bg-yellow-600" 
  };

  const totalKoiPoint = koiPoint.reduce((acc, koi) => acc + koi.patternPoint, 0);
  const progressWidth = (totalKoiPoint / (koiPoint.length * 10)) * 100; 

  // Tính toán các loại màu sắc dựa trên giá trị
  const sortedColors = element.elementColors ? element.elementColors.sort((a, b) => b.values - a.values) : []
  const maxValue = sortedColors.length > 0 ? sortedColors[0].values : 0
  const minValue = sortedColors.length > 0 ? sortedColors[sortedColors.length - 1].values : 0

  const t_sinh = sortedColors.filter(color => color.values === maxValue)
  const hoa_hop = sortedColors.filter(color => color.values < maxValue && color.values > 0)
  const che_khac = sortedColors.filter(color => color.values < 0 && color.values >= -2)
  const bi_khac = sortedColors.filter(color => color.values < -2)

  return (
    <>
    <NavBar/>
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">MỨC ĐỘ TƯƠNG THÍCH</h1>
      
      <div className="mb-6 flex items-center">
        <p className="font-semibold mr-2">Mệnh của bạn là: 
          <span className={`text-${elementColorsC[element.element1] || 'text-gray-600'}`}> {element.element1 || 'Chưa xác định'}</span>
        </p>
        <div className="w-8 h-8 rounded-full">
          <img src={elementColorsP[element.element1] || 'default_image_url'} alt={element.element1 || 'Mệnh không xác định'} />
        </div>
      </div>
      <p className="mt-2">{element.description || 'Chưa có mô tả'}</p>  
      
      <div className="relative mb-6">
        <div className="h-4 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full ${elementColorsT[element.element1] || 'blue-500'}`} 
            style={{ width: `${progressWidth}%` }} 
          ></div>
        </div>
        <div className="absolute left-0 top-0 h-full flex justify-between w-full px-2 text-xs">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10</span>
        </div>
      </div>
      
      <p className="mb-6">Hướng đặt bể cá hiện tại của bạn là: <span className="font-semibold">{direction}</span></p>
      
      <div className="flex flex-wrap mb-6">
        <div className="w-2/3 pr-4">
          <div className="grid grid-cols-2 gap-4">
            {koiPoint.map((koi, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-[100px] h-[170px] flex-shrink-0">
                    <img 
                      src={koi.imageUrl || 'default_image_url'} 
                      alt={koi.patternName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{koi.patternName}</h2>
                      <p className="text-gray-600">
                        {koi.patternColors.map((color, colorIndex) => (
                          <span key={colorIndex}>
                            {color.colorName || 'Màu không xác định'} 
                            {colorIndex < koi.patternColors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    <p className="text-lg">Điểm: <span className="font-semibold">{koi.patternPoint.toFixed(1)} / 10</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-1/3 pl-4">
          <div className="bg-gray-100 p-4 rounded-lg h-full">
            <p className="text-xl font-semibold mb-2">Tổng điểm: {totalPoint.toFixed(1)} / 10</p>
            
          </div>
        </div>
      </div>

       {/* Table element colors */}
       <div className="mb-6">
        <h2 className="text-lg font-semibold">Màu sắc của mệnh:</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold">Tương sinh</h3>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className={`${elementColorsT[element.element1]  || 'gray-200'} text-white`}>
                <tr>
                  <th className="border border-gray-300 p-2">Màu</th>
                  <th className="border border-gray-300 p-2">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {t_sinh.map(color => (
                  <tr key={color.elementColorId} >
                    <td className="border border-gray-300 p-2">{color.color.name}</td>
                    <td className="border border-gray-300 p-2">{color.values || 'Chưa có điểm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold">Hòa Hợp</h3>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className={`${elementColorsT[element.element1]  || 'gray-200'} text-white`}>
                <tr>
                  <th className="border border-gray-300 p-2">Màu</th>
                  <th className="border border-gray-300 p-2">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {hoa_hop.map(color => (
                  <tr key={color.elementColorId} >
                    <td className="border border-gray-300 p-2">{color.color.name}</td>
                    <td className="border border-gray-300 p-2">{color.values || 'Chưa có điểm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold">Chế Khắc</h3>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className={`${elementColorsT[element.element1]  || 'gray-200'} text-white`}>
                <tr>
                  <th className="border border-gray-300 p-2">Màu</th>
                  <th className="border border-gray-300 p-2">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {che_khac.map(color => (
                  <tr key={color.elementColorId} >
                    <td className="border border-gray-300 p-2">{color.color.name}</td>
                    <td className="border border-gray-300 p-2">{color.values || 'Chưa có điểm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold">Bị Khắc</h3>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className={`${elementColorsT[element.element1]  || 'gray-200'} text-white`}>
                <tr>
                  <th className="border border-gray-300 p-2">Màu</th>
                  <th className="border border-gray-300 p-2">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {bi_khac.map(color => (
                  <tr key={color.elementColorId} >
                    <td className="border border-gray-300 p-2">{color.color.name}</td>
                    <td className="border border-gray-300 p-2">{color.values || 'Chưa có điểm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default FengshuiPointResult;
