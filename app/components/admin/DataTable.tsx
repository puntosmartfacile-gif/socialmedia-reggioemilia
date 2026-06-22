import { ReactNode } from "react";

interface DataTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (item: T) => string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "Nessun elemento disponibile.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2C2C2C]/8 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#2C2C2C]/8 text-sm">
          <thead className="bg-[#FAFAF7]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#2C2C2C]/48 ${column.className ?? ""}`}
                >
                  <div className="inline-flex items-center gap-1">
                    <span>{column.header}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-[#2C2C2C]/28"
                    >
                      <path d="M8 10l4-4 4 4" />
                      <path d="M16 14l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C2C]/6">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-[#2C2C2C]/55"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={rowKey(item)}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAF7]/65"}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 align-top text-[#2C2C2C] ${column.className ?? ""}`}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}