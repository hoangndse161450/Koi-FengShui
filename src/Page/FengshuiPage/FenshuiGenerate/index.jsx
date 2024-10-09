import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FengshuiGenerate = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `https://localhost:7275/api/FengShui/Reckoi?birthday=${encodeURIComponent(birthdate)}&gender=${encodeURIComponent(gender)}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setResult(data); 
        console.log('Dữ liệu nhận được từ API:', data);

        navigate('/fengshui/pond/result', { state: { 
          recQuantity: data.data.recQuantity, 
          variety: data.data.variety 
        }}); 
      } else {
        console.error('Network response was not ok', response.status); 
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4" style={{backgroundImage: "url('/path/to/night-sky-boat-image.jpg')"}}>
      <h1 className="text-4xl font-bold mb-4">TRA CỨU HỒ CÁ PHONG THỦY</h1>
      <p className="max-w-2xl mb-8">
        Mỗi con người sinh ra đều có vận mệnh khác nhau. Để chọn lựa được giống cá và hướng
        hồ phù hợp hãy điền thông tin vào bảng dưới đây, Fengshui Koi sẽ giúp bạn giải mã.
        Fengshui Koi sẽ sử dụng ngày sinh theo <span className="text-pink-500">Dương lịch</span> để tra cứu mệnh cho bạn.
      </p>

      <form className="bg-white bg-opacity-10 p-8 rounded-lg w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
          

        <div className="flex flex-col items-center mb-4">
          <label htmlFor="calendar" className="block text-left mb-2">Chọn lịch<span className="text-red-500">*</span></label>
          <select id="calendar" required className="w-full p-2 rounded bg-white text-black text-center">
            <option value="solar">Lịch dương</option>
          </select>
        </div>

        <button type="submit" className="bg-fuchsia-500 text-white border-none py-3 px-8 rounded-full cursor-pointer text-lg mt-4 hover:bg-fuchsia-600 transition-colors">
          Giải mã
        </button>
      </form>
    </div>
  );
};

export default FengshuiGenerate;
