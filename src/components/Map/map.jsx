import React, { useState } from "react";
import { PiFlagBannerFoldFill } from "react-icons/pi";

const Map = ({ modelCountry }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null); // State để lưu quốc gia được hover

    const paths = [
        { from: { top: 72, left: 60 }, to: { top: 65, left: 70 } }, // Vietnam -> Thailand
        { from: { top: 65, left: 70 }, to: { top: 58, left: 56 } }, // Thailand -> China
        { from: { top: 58, left: 56 }, to: { top: 43, left: 37 } }, // China -> Indonesia
        { from: { top: 43, left: 37 }, to: { top: 30, left: 30 } }, // Indonesia -> India
        { from: { top: 30, left: 30 }, to: { top: 20, left: 46 } },  // India -> Nepal
    ];

    const countries = [
        { name: "Vietnam", top: 72, left: 60, icon: '/images/country-icons/vietnam.png' },
        { name: "Thailand", top: 65, left: 70, icon: '/images/country-icons/thailand.png' },
        { name: "China", top: 58, left: 56, icon: '/images/country-icons/china.png' },
        { name: "Indonesia", top: 43, left: 37, icon: '/images/country-icons/indonesia.png' },
        { name: "India", top: 30, left: 30, icon: '/images/country-icons/india.png' },
        { name: "Nepal", top: 20, left: 46, icon: '/images/country-icons/nepal.png' },
    ];

    const renderDots = (from, to) => {
        const dots = [];
        const numDots = 10; // Số lượng dấu chấm
        const deltaTop = (to.top - from.top) / numDots;
        const deltaLeft = (to.left - from.left) / numDots;

        for (let i = 1; i < numDots; i++) {
            const dotTop = from.top + deltaTop * i;
            const dotLeft = from.left + deltaLeft * i;

            dots.push(
                <div
                    key={`dot-${from.top}-${from.left}-${i}`}
                    style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#f6dc9a",
                        borderRadius: "50%",
                        position: "absolute",
                        top: `${dotTop}%`,
                        left: `${dotLeft}%`,
                        transform: "translate(-50%, -50%)", // Căn chỉnh chính xác
                    }}
                />
            );
        }
        return dots;
    };

    return (
        <>
            <div className="map-container w-10/12" style={{ position: "relative" }}>
                <img src={'/images/map.png'} alt="map" style={{ width: '100%' }} />

                {countries.map((country, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            position: "absolute", 
                            top: `${country.top}%`, 
                            left: `${country.left}%`, 
                            transform: "translate(-50%, -50%)" // Căn chỉnh icon từ giữa
                        }} 
                        className="z-10"
                    >
                        {/* Icon quốc gia */}
                        <img
                            src={country.icon}
                            alt={country.name}
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                            onMouseOver={() => setHoveredCountry(country.name)} // Hiển thị tên khi hover
                            onMouseLeave={() => setHoveredCountry(null)} // Ẩn tên khi rời chuột
                        />
                        {country.name === modelCountry && (
                            <PiFlagBannerFoldFill
                                style={{
                                    position: "absolute",
                                    left: '50%',
                                    transform: "translate(-50%, -150%)",
                                    color: 'cyan',
                                    fontSize: '32px',
                                }}
                            />
                        )}
                    </div>
                ))}

                {hoveredCountry && (
                    <div
                        style={{
                            position: "absolute",
                            top: `calc(${countries.find(c => c.name === hoveredCountry).top}%)`,
                            left: `calc(${countries.find(c => c.name === hoveredCountry).left}%)`,
                            backgroundColor: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            fontSize: "12px",
                            fontWeight: "bold",
                            pointerEvents: "none",
                            transform: "translate(-50%, -150%)",
                            zIndex: 100,
                        }}
                    >
                        {hoveredCountry}
                    </div>
                )}

                {paths.map((path, index) => {
                    const fromCenter = { 
                        top: path.from.top, 
                        left: path.from.left 
                    }; // Dùng đúng tọa độ icon
                    const toCenter = { 
                        top: path.to.top, 
                        left: path.to.left 
                    }; // Dùng đúng tọa độ icon
                    return (
                        <React.Fragment key={index}>
                            {renderDots(fromCenter, toCenter)}
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default Map;