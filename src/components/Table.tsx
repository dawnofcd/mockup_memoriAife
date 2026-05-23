import React from "react";

interface Column<T> {
  key: string;
  label: string;
  mono?: boolean;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  emptyText = "Không có dữ liệu",
}: {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
}) {
  return (
    <table className="tbl">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ textAlign: col.align || "left" }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center", padding: "32px 14px", color: "var(--ink-3)" }}>
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={col.mono ? "mono" : ""}
                  style={{ textAlign: col.align || "left" }}
                >
                  {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
