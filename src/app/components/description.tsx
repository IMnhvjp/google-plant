import { useState } from "react";
import { Typography} from "antd";

const Description = ({ data }: { data: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const dataDisplayed = !isExpanded ? data.slice(0, 1100) + '... ' : data;

    return (
        <div>
            <Typography.Title level={5} className="mb-2">
            Mô tả:
            </Typography.Title>
            <p>
                {dataDisplayed}
                {data.length > 1100 && !isExpanded && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
                    >
                        Xem thêm
                    </button>
                )}
                {isExpanded && (
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
                    >
                        Thu gọn
                    </button>
                )}
            </p>
        </div>
    )
}

export default Description