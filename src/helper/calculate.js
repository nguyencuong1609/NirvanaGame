// import { SIMULATE_SPEED } from "../utils/constants";

export const calculateNirCapacity = (level, speed, road, appContant) => {
    const BASE_NIR = 1;
    const BASE_TIME_CAPACITY = 2;
    const timeCapacity = appContant.levelConfig[level - 1] || 2;
    const speedBonus = 1 + appContant.speedConfig[speed - 1];
    const roadBonus = 1 + appContant.roadConfig[road - 1]?.bonus;

    return (
        (BASE_NIR / BASE_TIME_CAPACITY) * timeCapacity * speedBonus * roadBonus
    );
};

export const calculateTimeDifferenceInSeconds = (lastClaimedDate) => {
    const now = new Date();
    const lastDate = lastClaimedDate ? new Date(lastClaimedDate) : now;
    return Math.floor((now - lastDate) / 1000);
};

export const calculateValue = (nirCapacity, timeDiffInSeconds , level) => {
    //SIMULATE FORMULA
    // return Math.min(
    //     ((SIMULATE_SPEED * +nirCapacity) / 7200) * timeDiffInSeconds,
    //     +nirCapacity
    // );

    //REAL FORMULA
    return Math.min(
        ((+nirCapacity) / (3600 * level)) * timeDiffInSeconds,
        +nirCapacity
    );
};