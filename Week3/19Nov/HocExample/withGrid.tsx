import React, { useState, useEffect } from "react";

export interface WithGridProps {
    url: string;
    dataProperties: string[];
}

export interface GridProps {
    data: any[];
    loading: boolean;
    error: string | null;
    dataProperties: string[];
}

export const withGrid = <T extends object>(
    WrappedComponent: React.ComponentType<T & GridProps>
): React.FC<T & WithGridProps> => {
    const HOC: React.FC<T & WithGridProps> = ({ url, dataProperties, ...props }) => {
        const [data, setData] = useState<any[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    const result = await response.json();
                    setData(result);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [url]);

        return (
            <WrappedComponent
                {...(props as T)}
                data={data}
                loading={loading}
                error={error}
                dataProperties={dataProperties}
            />
        );
    };

    return HOC;
};
