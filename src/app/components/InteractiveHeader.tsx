"use client";

export default function InteractiveHeader() {
  const handleClickBanner = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-6">
        <h1 className="text-lg font-semibold cursor-pointer" onClick={handleClickBanner}>
          Plant Search
        </h1>
      </div>
    </header>
  );
}
