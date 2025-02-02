export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-blue-500">Đang tải dữ liệu...</p>
      </div>
    );
  }
  