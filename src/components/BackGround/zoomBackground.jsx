import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const ZoomBackground = ({ backgroundImages = [], duration = 8, isLoading = true }) => {
  const [isZoomingIn, setIsZoomingIn] = useState(true); // Kiểm soát trạng thái zoom in/out
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Chỉ số hình ảnh hiện tại
  const [filter, setFilter] = useState('blur(0px)'); // Trạng thái làm mờ ảnh

  useEffect(() => {
    setIsZoomingIn(false);
  }, [duration, isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isZoomingIn) {
        setIsZoomingIn(false); // Bắt đầu zoom out
        setFilter('blur(16px)'); // Làm mờ khi zoom out
      } else {
        // Đợi zoom out xong mới đổi ảnh
        if (!isLoading) { // Kiểm tra isLoading
          const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
          setCurrentImageIndex(nextIndex); // Đổi ảnh
          decreaseFilter();
        }
      }
    }, isZoomingIn ? duration * 950 : 2000); // Zoom in dùng duration, zoom out cố định 2 giây

    // Tải trước hình ảnh tiếp theo
    const preloadImage = new Image();
    preloadImage.src = backgroundImages[(currentImageIndex + 1) % backgroundImages.length];

    return () => clearInterval(timer);

  }, [isZoomingIn, currentImageIndex, backgroundImages, duration, isLoading]);

  const variants = {
    zoomIn: {
      scale: 2.5,
      transition: {
        duration: duration, // Zoom in mất `duration` giây
        ease: 'easeInOut',
      },
    },
    zoomOut: {
      scale: 1,
      transition: {
        duration: 2, // Zoom out mất 2 giây
        ease: 'easeOut',
      },
    },
  };

  // Giảm dần filter từ 16px về 0px
  const decreaseFilter = () => {
    let blurValue = 16;
    const interval = setInterval(() => {
      if (blurValue > 0) {
        blurValue -= 1; // Giảm giá trị làm mờ
        setFilter(`blur(${blurValue}px)`); // Cập nhật filter
      } else {
        clearInterval(interval);
        setIsZoomingIn(true); // Bắt đầu zoom in
      }
    }, 50); // Thay đổi mỗi 50ms
  };

  return (
    <>
       <div className="absolute inset-0 bg-center bg-cover" style={{zIndex : 1, transition: 'opacity 0.5s ease-in-out', opacity: isLoading ? 1 : 0 }}>
        <img src={"/images/hoi_an.webp"} style={{filter: 'blur(32px)'}} alt="background" className="w-full h-full object-cover transition-all duration-100 ease-in-out" />
      </div>
      {!isLoading && (
        <motion.div
          className="absolute inset-0 bg-center bg-cover transition-all duration-100 ease-in-out"
          style={{
            backgroundImage: backgroundImages.length > 0 ? `url(${backgroundImages[currentImageIndex]})` : 'none',
            filter: filter,
            backgroundPosition: 'center 100%',
            transition: 'background-image 1s ease-in-out',
          }}
          animate={isZoomingIn ? 'zoomIn' : 'zoomOut'}
          variants={variants}
        />
      )}
    </>
  );
};

export default ZoomBackground;