import React from "react";
import "./DataGrid.css";
import { DataGridProps } from "./DataGridTypes";

const DataGrid: React.FC<DataGridProps> = ({ data, dataProperties, loading, error }) => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const TableHeaders = () => (
        <thead>
            <tr>
                {dataProperties.map((prop, index) => (
                    <th key={index}>{prop.toUpperCase()}</th>
                ))}
            </tr>
        </thead>
    );

    const TableRows = () => (
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {dataProperties.map((prop, idx) => (
                        <td key={idx}>{item[prop]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className="data-grid">
            <h3>Hoc Example with Grid Data Table</h3>
            <table>
                {TableHeaders()}
                {TableRows()}
            </table>
        </div>
    );
};

export default DataGrid;
